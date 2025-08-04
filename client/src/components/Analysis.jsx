import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import Navbar from './NavBar';
import Footer from './Footer';
import DangerAlert from './DangerAlert';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Filler);

const Analysis = () => {
  const [sensorData, setSensorData] = useState({
    temperature: [],
    pH: [],
    oxygen: [],
    conductivity: [],
    nitrate: [],
    timestamps: [],
  });
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/sensor-data/recent`);
        const data = await response.json();
        const formattedData = formatSensorData(data);
        setSensorData(formattedData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData();
    const socket = io('http://localhost:3000');

    socket.on('newData', (data) => {
      setSensorData((prevData) => {
        const updatedData = {
          temperature: [...prevData.temperature, data.temperature],
          pH: [...prevData.pH, data.pH],
          oxygen: [...prevData.oxygen, data.oxygen],
          conductivity: [...prevData.conductivity, data.conductivity],
          nitrate: [...prevData.nitrate, data.nitrate],
          timestamps: [...prevData.timestamps, new Date(data.timestamp).toLocaleString()],
        };

        return updatedData;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatSensorData = (data) => {
    const temperature = [];
    const pH = [];
    const oxygen = [];
    const conductivity = [];
    const nitrate = [];
    const timestamps = [];

    data.forEach((entry) => {
      temperature.push(entry.temperature);
      pH.push(entry.pH);
      oxygen.push(entry.oxygen);
      conductivity.push(entry.conductivity);
      nitrate.push(entry.nitrate);
      timestamps.push(new Date(entry.timestamp).toLocaleString());
    });

    return { temperature, pH, oxygen, conductivity, nitrate, timestamps };
  };

  const createChartData = (label, data) => ({
    labels: sensorData.timestamps,
    datasets: [
      {
        label,
        data,
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="grid grid-cols-2 gap-4 p-8 mt-16">
        <div className="w-full">
          <h2 className="text-lg font-bold text-center mb-4">Temperature</h2>
          <Line
            data={createChartData('Temperature', sensorData.temperature)}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Temperature: ${context.raw}°C at ${sensorData.timestamps[context.dataIndex]}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold text-center mb-4">pH Levels</h2>
          <Line
            data={createChartData('pH', sensorData.pH)}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `pH: ${context.raw} at ${sensorData.timestamps[context.dataIndex]}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold text-center mb-4">Oxygen Levels</h2>
          <Line
            data={createChartData('oxygen', sensorData.oxygen)}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Oxygen: ${context.raw}% at ${sensorData.timestamps[context.dataIndex]}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold text-center mb-4">Conductivity</h2>
          <Line
            data={createChartData('Conductivity', sensorData.conductivity)}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Conductivity: ${context.raw} µS/cm at ${sensorData.timestamps[context.dataIndex]}`,
                  },
                },
              },
            }}
          />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-bold text-center mb-4">Nitrate Levels</h2>
          <Line
            data={createChartData('Nitrate', sensorData.nitrate)}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `Nitrate: ${context.raw} mg/L at ${sensorData.timestamps[context.dataIndex]}`,
                  },
                },
              },
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analysis;
