'use client'
// Functionalities
import { useState } from 'react'

// Elements
import Image from 'next/image'
import introParagraph from '@components/scrumUI/intro'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import questions from '@models/questions'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
import { Radar } from 'react-chartjs-2';


export default function UI() {
  // Hooks
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

  function handleBack() {
    setQuestionNumber(questionNumber - 1)
  }

  function handleNext() {
    setQuestionNumber(questionNumber + 1)
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
  }


  return (
    <div className="bg-white flex flex-col items-center justify-between border-t border-gray-200 px-4 sm:px-6">
      {!quizStarted &&
        <div className="relative isolate px-6 pt-2 lg:px-8">
          <div className="mx-auto max-w-4xl py-10">
            <div className='flex flex-col items-center'>
              <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                Scrum Development Progress
              </h1>
              <Image
                src="/assets/images/scrumpillars.svg"
                alt="scrum pillars"
                width={500}
                height={0}
              // className="mr-3 h-6 sm:h-9"
              />
              {introParagraph}
            </div>
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
        </div>}

      {quizStarted &&
        <div>
          <h1 className="py-8 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scrum Values Quiz
          </h1>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {finished &&
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
              </div>}
            {!finished && <div>
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
              <div name="back-next" className="bg-white flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                {questionNumber === 1 && <div></div>}
                {questionNumber > 1 &&
                  <button type="button"
                    className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleBack}>
                    <svg aria-hidden="true"
                      className="w-5 h-5 mr-2 -ml-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    Back
                  </button>}

                {questionNumber < 5 &&
                  <button type="button"
                    className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleNext}>
                    Next
                    <ArrowRightIcon className="ml-2 h-5 w-5" aria-hidden="true" />
                    <div style={{ color: 'white' }}>
                    </div>
                  </button>}
                {questionNumber === 5 &&
                  <button type="button"
                    className="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleFinish}
                  >
                    Finish
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>}
              </div>


            </div>
            }
            <div>
              <Radar data={data} options={options} />
            </div>
          </div>

        </div>
      }

      {!quizStarted && <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
      </div>}

    </div>
  )
}