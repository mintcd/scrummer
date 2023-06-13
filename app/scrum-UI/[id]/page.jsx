'use client'
// Functionalities
import { useState } from 'react'

// Elements
import Image from 'next/image'
import Link from 'next/link'

// Resources
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import questions from '@models/questions'


import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

import { Radar } from 'react-chartjs-2';


export default function Page({ params }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [result, setResult] = useState(
    [1, 2, 3, 4, 5].reduce((obj, value) => (
      { ...obj, [value]: [false, false, false, false, false] }
    ), {})
  );
  const [finished, setFinished] = useState(false)


  const data = {
    labels: questions.map((question) => question.key),
    datasets: [
      {
        label: "See how you area gets larger",
        // scale: 1
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

  function handleTakeQuiz() {
    setQuizStarted(true)
  }

  function handleChange(index) {
    let newResult = { ...result }
    newResult[questionNumber][index] = !newResult[questionNumber][index]
    setResult(newResult)
  }

  function handleBack() {
    // let newResult = { ...result }
    // newResult[questionNumber] = Array(5).fill(false)
    // setResult(newResult)
    setQuestionNumber(questionNumber - 1)
  }

  function handleNext() {
    // let newResult = { ...result }
    // newResult[questionNumber] = Array(5).fill(false)
    // setResult(newResult)
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
    <div>
      {params.id == 1 &&
        <div className="bg-white flex flex-col items-center justify-between border-t border-gray-200 px-4 sm:px-6">
          {!quizStarted &&
            <div className="relative isolate px-6 pt-2 lg:px-8">
              <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-20">
                <div className='flex flex-col items-center'>
                  <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Scrum Development Progress
                  </h1>
                  <Image
                    src="/assets/images/scrumpillars.svg"
                    alt="Flowbite Logo"
                    width={500}
                    height={0}
                  // className="mr-3 h-6 sm:h-9"
                  />
                  <p className="mt-6 text-justify text-lg leading-8 text-gray-600">
                    In short, Scrum is an empirical framework for iterative software development (also know as Agile), based on three pillars, which are Transparency, Inspection and Adaption.
                  </p>

                  <p className="mt-6 text-justify text-lg leading-8 text-gray-600">
                    This framework is described practically in term of 5 values: Courage, Focus, Commitment, Respect and Openness.
                    The following quiz gives you a reference metric to evaluate these values.
                    Whether your organization is following Scrum, the quiz is a way to determine your co-work ability in general.
                  </p>

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
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
            </div>}

          {quizStarted &&
            <div>
              <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
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
                      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
                      <div class="flex items-center mb-4">
                        <input
                          type="checkbox"
                          class="w-4 h-4 text-orange-300 bg-gray-100 border-gray-300 rounded focus:ring-orange-300 dark:focus:ring-orange-400 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={result[questionNumber][index]}
                        />
                        <label for="default-checkbox"
                          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {option}
                        </label>
                      </div>
                    </span>
                  )}
                  {console.log(result)}
                  <div className="bg-white flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                    {questionNumber === 1 && <div></div>}
                    {questionNumber > 1 &&
                      <button type="button"
                        class="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleBack}>
                        <svg aria-hidden="true"
                          class="w-5 h-5 mr-2 -ml-1 transform rotate-180" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                        Back
                      </button>}

                    {questionNumber < 5 &&
                      <button type="button"
                        class="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleNext}>
                        Next
                        <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>}
                    {questionNumber === 5 &&
                      <button type="button"
                        class="text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleFinish}
                      >
                        Finish
                        <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                      </button>}
                  </div>


                </div>}
                {<div>
                  <Radar data={data} options={options} />
                </div>}
              </div>

            </div>}

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
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div className='flex flex-col items-center py-1'>
                <p className='py-2'> Or visit other UIs </p>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                  {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                  {[1, 2, 3, 4, 5].map(value => (
                    <Link
                      key={value}
                      href={`/scrum-UI/${value}`}
                      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      {value}
                    </Link>
                  ))}

                  <a
                    href="#"
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </nav>
              </div>
            </div>
          </div>}

        </div>}
    </div>
  )
}