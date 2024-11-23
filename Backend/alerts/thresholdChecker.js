const SensorData = require("../models/SensorData");
const User = require("../models/user");
const SibApiV3Sdk = require("sib-api-v3-sdk");


const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = "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";

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
let lastAlert = null;

async function checkThresholds() {
  try {
    const latestData = await SensorData.findOne().sort({ timestamp: -1 });

    if (!latestData) {
      console.error("No sensor data available.");
      return;
    }

    const TEMPERATURE_THRESHOLD = 30;

    if (latestData.temperature > TEMPERATURE_THRESHOLD && latestData.temperature !== lastAlert) {
      const users = await User.find({}, "email userName");
      const CURRENT_TEMPERATURE = latestData.temperature;
      
      for (const user of users) {
        const sendSmtpEmail = {
          to: [{ email: user.email, name: user.userName }],
          sender: { email: "bluepulse.team6@gmail.com", name: "BluePulse Alerts" },
          subject: "Temperature Alert from BluePulse",
          htmlContent: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f4f6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #d32f2f;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .header h2 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
        }
        .alert-box {
            background-color: #ffe5e5;
            border-left: 5px solid #d32f2f;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }
        .alert-box p {
            margin: 5px 0;
            font-size: 18px;
            font-weight: bold;
        }
        .details-box {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .details-box p {
            margin: 5px 0;
            font-size: 16px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 14px;
            color: #777;
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🚨 Temperature Alert Notification</h2>
        </div>
        <div class="content">
            <p>Hello ${user.userName},</p>
            <p>An alert has been triggered due to a breach in the temperature threshold. Please review the details below and take any necessary action.</p>

            <div class="alert-box">
                <p><strong>Temperature Alert:</strong> Critical Level Reached</p>
            </div>

            <div class="details-box">
                <p><strong>📍 Location:</strong> ACOE</p>
                <p><strong>🌡️ Threshold:</strong> ${TEMPERATURE_THRESHOLD}°C</p>
                <p><strong>🔴 Current Temperature:</strong> ${CURRENT_TEMPERATURE}°C</p>
            </div>

            <p>For more details, please log in to your monitoring system dashboard.</p>
        </div>
        <div class="footer">
            <p>This is an automated message from BluePulse. Please do not reply.</p>
        </div>
    </div>
</body>
</html>

          `
        };

        console.log("Sending email with body content"); 

        try {
          await apiInstance.sendTransacEmail(sendSmtpEmail);
          console.log(`Alert email sent to ${user.userName} at ${user.email}`);
        } catch (emailError) {
          console.error("Failed to send email:", emailError);
        }
      }

      lastAlert = latestData.temperature;
    }
  } catch (error) {
    console.error("Error checking thresholds or sending email:", error);
  }
}

module.exports = checkThresholds;
