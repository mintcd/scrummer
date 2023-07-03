import { useState, useEffect, useRef } from "react";
import { Scrollspy, initTE } from "tw-elements";
import questions from '@models/questions'
import introParagraph from '@components/scrumUI/intro'
import Image from 'next/image'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

import { Radar } from 'react-chartjs-2';




export default function UI() {
  useEffect(() => {
    initTE({ Scrollspy });
    ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
  }, [])

  const maxArea = 59.44103

  // Hooks
  const quizRef = useRef(null);
  const [activeSpyee, setActiveSpyee] = useState('');
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(() =>
    Array(5).fill().map(() => Array(5).fill(false))
  );
  const [finished, setFinished] = useState(false)

  const getArea = () => {
    const points = result.map((answer) => answer.filter((option) => option === true).length)

    const percent = Math.ceil(points
      .map((value, index) => [value, points[(index + 1) % points.length]])
      .map(pair => pair[0] * pair[1] / 2 * Math.sin(1.25663))
      .reduce((a, b) => a + b, 0) / maxArea * 100);
    return percent
  }

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
          fontSize: 100
        },
      },
    },
  };

  function handleStart() {
    setStarted(true);
    setTimeout(() => {
      if (quizRef.current) {
        quizRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500); // Adjust the timeout duration if needed
  }

  function handleChange(questionIndex, optionIndex) {
    let newResult = [...result]
    newResult[questionIndex][optionIndex] = !newResult[questionIndex][optionIndex]
    setResult(newResult)
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl py-8 text-center font-bold tracking-tight text-gray-900 sm:text-5xl">
          SCRUM VALUES QUIZ
        </h1>
        <div>
          <Image
            src="/assets/images/scrumpillars.svg"
            alt="scrum pillars"
            width={500}
            height={0}
          // className="mr-3 h-6 sm:h-9"
          />
        </div>
        <div>
          <p className="text-justify text-lg mt-6 leading-8 text-gray-600">
            Welcome to a self-evaluation quiz designed to assess your familiarity with Scrum. The quiz will gauge your understanding of Scrum by measuring the number of exemplary behaviors you exhibit corresponding to each Scrum value.
            <br /><br />
            Key Aspects:
            <ul className="list-disc ml-4">
              <li>
                Scrum: An empirical framework for iterative software development.              </li>
              <li>
                Three pillars of Scrum: Transparency, Inspection, and Adaptation.              </li>
              <li>
                Specific values in Scrum: Courage, Focus, Commitment, Respect, and Openness.   </li>
            </ul>
            <br />

            New to Scrum? Take it easy! This metric can help assess your ability to collaborate effectively in general.
            If you're looking for a comprehensive understanding of Scrum, please refer <a href="https://scrumguides.org/" target="_blank" className="text-sm font-semibold leading-6 text-gray-900">
              Scrum guide <span aria-hidden="true">→</span>
            </a>

          </p>
          <div className="mt-5 flex items-center justify-center gap-x-6">
            <button
              className="my-4 h-10 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleStart}
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
      {started &&
        <div className="grid grid-cols-5 py-8">
          <div className="col-span-5 sm:col-span-3">
            <div id="scrollspy1" className="sticky-top pl-3 text-sm overflow-x-auto" ref={quizRef}>
              <ul data-te-nav-list-ref className="flex space-x-4 sm:space-y-4 justify-center">
                {questions.map((question, index) => (
                  <li className="px-1 py-1 text-left" key={index} style={{ marginTop: 0 }}>
                    <a
                      data-te-nav-link-ref
                      data-te-nav-link-active
                      className="bg-transparent px-[5px] text-neutral-600 shadow-none dark:text-neutral-200"
                      href={`#${question.key}`}
                    >
                      {question.key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              data-te-spy="scroll"
              data-te-target="#scrollspy1"
              data-te-offset="200"
              className="relative snap-y h-80 overflow-auto px-3"
            >
              {questions.map((question, questionIndex) => (
                <div id={question.key} className="snap-start" key={question.key}>
                  <h1 className="py-4 text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-2xl">
                    {question.key}
                  </h1>
                  {question.value.map((option, optionIndex) => (
                    <span className="py-2" key={`${questionIndex}${optionIndex}`}>
                      <label
                        htmlFor={`${questionIndex}${optionIndex}-checkbox`}
                        className="flex items-center mb-4 cursor-pointer"
                      >
                        <input
                          id={`${questionIndex}${optionIndex}-checkbox`}
                          type="checkbox"
                          className={`w-4 h-4 text-gray-100 bg-transparent border-2 ${result[questionIndex][optionIndex] ? 'border-orange-400' : 'border-orange-300'
                            } accent-orange-400 rounded checked:bg-orange-400`}
                          checked={result[questionIndex][optionIndex] === true}
                          onChange={() => handleChange(questionIndex, optionIndex)}
                        />
                        <span className="ml-2 text-justify text-sm font-medium text-gray-900 dark:text-gray-300">
                          {option}
                        </span>
                      </label>
                    </span>

                  ))}

                </div>
              ))}
            </div>
          </div>
          <div className="col-span-5 sm:col-span-2">
            <Radar data={data} options={options} />
            <div className="text-gray-600 text-sm"> Occupied area: {getArea()}%  </div>
            <div className="text-gray-600 text-sm"> Have you seen "achieving more from more achieved" is more valueable? </div>
          </div>
        </div>}
    </div>
  )
}