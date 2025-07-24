import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ProgressDashboard({ progressData }) {
  const data = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
    datasets: [
      {
        label: "Palabras correctas",
        data: progressData || [3, 5, 7, 9],
        backgroundColor: "#60a5fa",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };
  return (
    <div className="p-4 bg-white rounded shadow mb-4" aria-label="Panel de progreso">
      <h2 className="font-bold mb-2 flex items-center"><span role="img" aria-label="chart">📈</span> Progreso del Habla</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ProgressDashboard;
