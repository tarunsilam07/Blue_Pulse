const nodemailer = require("nodemailer");
const SensorData = require("../models/SensorData");
const User = require("../models/user");

let lastAlert = {
  temperature: null,
  oxygen: null,
  pH: null,
  conductivity: null,
  nitrate: null,
};

const transport = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_API_KEY,
  },
});

async function checkThresholds() {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });

    if (!latestData) {
      console.error("No sensor data available.");
      return;
    }

    const THRESHOLDS = {
      temperature: 25,     // °C
      oxygen: 5,           // mg/L
      pH: 8.5,             // upper safe limit
      conductivity: 500,   // µS/cm
      nitrate: 10,         // mg/L
    };

    const users = await User.find({}, "email userName");

    for (const [key, threshold] of Object.entries(THRESHOLDS)) {
      const isBreached =
        key === "pH"
          ? latestData[key] < 6.5 || latestData[key] > threshold
          : latestData[key] > threshold;

      if (isBreached && latestData[key] !== lastAlert[key]) {
        for (const user of users) {
          const mailOptions = {
            from: "bluepulse.team6@gmail.com",
            to: user.email,
            subject: `${key.charAt(0).toUpperCase() + key.slice(1)} Alert from BluePulse`,
            html: `
              <!DOCTYPE html>
              <html lang="en">
              <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { font-family: Arial, sans-serif; background-color: #f3f4f6; color: #333; }
                .container { max-width: 600px; margin: 30px auto; background-color: #fff; border-radius: 8px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden; }
                .header { background-color: #d32f2f; color: #fff; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .alert-box { background-color: #ffe5e5; border-left: 5px solid #d32f2f; padding: 15px; border-radius: 4px; }
                .details-box { background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; border-radius: 4px; }
                .footer { background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 14px; color: #777; }
              </style></head>
              <body>
                <div class="container">
                  <div class="header"><h2>🚨 ${capitalize(key)} Alert Notification</h2></div>
                  <div class="content">
                    <p>Hello ${user.userName},</p>
                    <p>An alert has been triggered due to a breach in the ${key} threshold.</p>
                    <div class="alert-box">
                      <p><strong>${capitalize(key)} Alert:</strong> Critical Level Reached</p>
                    </div>
                    <div class="details-box">
                      <p><strong>📍 Location:</strong> ACOE</p>
                      <p><strong>⚠️ Threshold:</strong> ${thresholdText(key, threshold)}</p>
                      <p><strong>🔴 Current ${capitalize(key)}:</strong> ${latestData[key]} ${getUnit(key)}</p>
                    </div>
                    <p>Please log in to your monitoring dashboard for more details.</p>
                  </div>
                  <div class="footer"><p>This is an automated message from BluePulse. Please do not reply.</p></div>
                </div>
              </body></html>
            `,
          };

          try {
            await transport.sendMail(mailOptions);
            console.log(`✅ Alert email sent to ${user.userName} at ${user.email}`);
          } catch (emailError) {
            console.error("❌ Failed to send email:", emailError);
          }
        }

        lastAlert[key] = latestData[key];
      }
    }
  } catch (error) {
    console.error("❌ Error checking thresholds or sending email:", error);
  }
}

function getUnit(parameter) {
  switch (parameter) {
    case "temperature":
      return "°C";
    case "oxygen":
    case "nitrate":
      return "mg/L";
    case "pH":
      return "pH";
    case "conductivity":
      return "µS/cm";
    default:
      return "";
  }
}

function thresholdText(parameter, threshold) {
  if (parameter === "pH") return `6.5 - ${threshold} pH`;
  return `> ${threshold} ${getUnit(parameter)}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = checkThresholds;
