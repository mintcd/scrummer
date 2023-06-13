import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import questions from '../../models/questions';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Graph({ answers }) {

  const getAnswerNumbers = answers.map((answer) =>
    answer.filter((option) => option === true).length)
  const data = {
    labels: questions.map((question) => question.value),
    datasets: [
      {
        label: "Scrum values visualization",
        // scale: 1,
        data: getAnswerNumbers,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        scaleStep: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="graph-container">
      {console.log("Graph", answers)}
      <Radar data={data} options={options} />
    </div>
  );
};