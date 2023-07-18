'use client'
// Functionalities
import { useState } from 'react'

// Elements
import Image from 'next/image'
import introParagraph from '@components/scrumUI/intro'
import questions from '@models/questions'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
import { Radar } from 'react-chartjs-2';


export default function UI() {
  // Hooks
  const [questionDone, setQuestionDone] = useState([false, false, false, false, false])
  const [quizStarted, setQuizStarted] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [result, setResult] = useState(
    [1, 2, 3, 4, 5].reduce((obj, value) => (
      { ...obj, [value]: [false, false, false, false, false] }
    ), {}));
  const [finished, setFinished] = useState(false)

  // Components data
  const data = {
    labels: questions.map((question) => question.key),
    datasets: [
      {
        label: "See how you area gets larger",
        data: Object.values(result).map(subArray => subArray.reduce((count, value) => count + (value === true ? 1 : 0), 0)),
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

  // Handlers
  function handleTakeQuiz() {
    setQuizStarted(true)
  }

  function handleChange(index) {
    let newResult = { ...result }
    newResult[questionNumber][index] = !newResult[questionNumber][index]
    setResult(newResult)
  }


  function handleFinish() {
    setFinished(true)
  }


  function handleReset() {
    setFinished(false)
    setQuestionNumber(1)
    setResult([1, 2, 3, 4, 5].reduce((obj, value) => (
      { ...obj, [value]: [false, false, false, false, false] }
    ), {}))
    setQuestionDone([false, false, false, false, false])
  }

  function handlePaginate(value) {

    if (questionNumber != value) {
      const newQuestionDone = [...questionDone];
      newQuestionDone[questionNumber - 1] = true;
      setQuestionDone(newQuestionDone);
    }
    setQuestionNumber(value);
  }

  return (
    <div className="bg-white flex flex-col items-center justify-between border-t border-gray-200 px-4 sm:px-6">
      {!quizStarted ?
        <div>
          <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scrum Development Progress
          </h1>
          <div className='grid items-center grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <Image
                src="/assets/images/scrumpillars.svg"
                alt="scrum pillars"
                width={500}
                height={0}
              />
            </div>
            <div>
              {introParagraph}
              <div className="mt-5 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleTakeQuiz}
                >
                  Take Quiz
                </button>
                <a href="https://scrumguides.org/" target="_blank" className="text-sm font-semibold leading-6 text-gray-900">
                  Explore <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

          </div>
        </div>
        : // Quiz started
        <div>
          <h1 className="py-8 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scrum Values Quiz
          </h1>
          <div>
            <nav className="isolate inline-flex rounded-md shadow-sm" aria-label="Pagination">
              {[1, 2, 3, 4, 5].map(value => (
                <div>
                  {questionDone[value - 1] ?
                    <button
                      className={`bg-orange-400 mx-6 inline-flex items-center justify-center w-12 h-12 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-full`}
                      key={value}
                      href=""
                      onClick={() => handlePaginate(value)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button> :
                    <button
                      className={`bg-orange-200 mx-6 inline-flex items-center justify-center w-12 h-12 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-full`}
                      key={value}
                      href=""
                      onClick={() => handlePaginate(value)}
                    >
                      {value}
                    </button>}
                </div>

              ))}
            </nav>
          </div>

          <div className=''>
            {!finished ?
              <div>
                <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl py-3">
                  {questions[questionNumber - 1].key}
                </h1>
                {questions[questionNumber - 1].value.map((option, index) =>
                  <span key={`${questionNumber}${index}`} onClick={() => handleChange(index)}>
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-300 bg-gray-100 border-gray-300 rounded focus:ring-orange-300 dark:focus:ring-orange-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={result[questionNumber][index]}
                      />
                      <label
                        className="ml-2 text-justify text-sm font-medium text-gray-900 dark:text-gray-300">
                        {option}
                      </label>
                    </div>
                  </span>
                )}

                <button type="button"
                  className="mb-4 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleFinish}
                >
                  Finish
                  <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </div>
              :
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className="mt-6 text-center text-lg leading-8 text-gray-600">
                  <p>
                    Congratulations. You have successfully completed.
                  </p>
                  <p>
                    Do you think it is beautiful? Feel free to give advice!
                  </p>
                  <button
                    className="my-4 text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleReset}
                  >
                    Retake
                  </button>
                </div>

                <div>
                  <Radar data={data} options={options} />
                </div>
              </div>

            }
          </div>
        </div>
      }
    </div>
  )
}