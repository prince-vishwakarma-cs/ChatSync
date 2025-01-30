import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "../../libs/features";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  ArcElement,
  Legend
);

// Modern UI-friendly chart options
const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  devicePixelRatio: window.devicePixelRatio || 1,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#4A4A4A",
        font: {
          family: "'Roboto', sans-serif",
          size: 14,
          weight: "bold",
        },
      },
    },
    tooltip: {
      backgroundColor: "#1e1e1e",
      bodyColor: "#ffffff",
      titleColor: "#ffffff",
      titleFont: {
        family: "'Roboto', sans-serif",
        size: 16,
        weight: "bold",
      },
      bodyFont: {
        family: "'Roboto', sans-serif",
        size: 14,
      },
      padding: 10,
      displayColors: false,
      borderColor: "#666666",
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#9e9e9e",
        font: {
          family: "'Roboto', sans-serif",
          size: 12,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: "#e5e5e5",
        borderDash: [5, 5],
      },
      ticks: {
        color: "#9e9e9e",
        font: {
          family: "'Roboto', sans-serif",
          size: 12,
        },
      },
    },
  },
};

const labels = getLast7Days();

export const LineChart = (value =[]) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Messages",
        data: value,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointRadius: 4,
        tension: 0.4,  // Smoother curve
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={data} options={lineChartOptions} />
    </div>
  );
};

export const DoughnutChart = () => {
  const data = {
    labels: ["Total Chats", "Group Chats"],
    datasets: [
      {
        label: "Total vs Group Chats",
        data: [65, 35], // Example data for total chats vs group chats
        backgroundColor: ["#36a2eb", "#ffce56"], // More modern colors
        borderWidth: 5, // Spacing between segments
        hoverBorderWidth: 7, // Add thickness on hover
        hoverOffset: 15, // Increase hover size
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Thicker doughnut
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333", // Legend text color
          font: {
            size: 14,
            weight: 'bold'
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#f7f7f7',
        titleColor: '#000',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="chart-container">
      <Doughnut data={data} options={doughnutOptions} />
    </div>
  );
};

