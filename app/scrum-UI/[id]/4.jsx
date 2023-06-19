import { useState, useEffect } from "react";
import { Scrollspy, initTE } from "tw-elements";
import questions from '@models/questions'
import introParagraph from '@components/scrumUI/intro'
import Image from 'next/image'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
import { Radar } from 'react-chartjs-2';




export default function UI() {
  useEffect(() => {
    initTE({ Scrollspy });
  }, [])

  // Hooks
  const [activeSpyee, setActiveSpyee] = useState('');
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(() =>
    Array(5).fill().map(() => Array(5).fill(false))
  );
  const [finished, setFinished] = useState(false)

  const data = {
    labels: questions.map((question) => question.key),
    datasets: [
      {
        label: "See how you area gets larger",
        data: result.map(each => each.reduce((count, value) => count + (value === true ? 1 : 0), 0)),
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        borderColor: 'rgba(255, 165, 0, 1)',
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
    <div className="w-[20rem] h-[20rem]">
      <Radar data={data} options={options} />
    </div>
  )
}