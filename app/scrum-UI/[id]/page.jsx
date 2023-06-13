'use client'
// Functionalities
import { useState } from 'react'

// Elements
import Image from 'next/image'
import Link from 'next/link'

// Resources
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import questions from '@models/questions'




export default function Page({ params }) {
  const [quizStarted, setQuizStarted] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(1)

  function handleTakeQuiz() {
    setQuizStarted(true)
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
                <div>
                  <h1 className="text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl py-3">
                    {questions[0].key}
                  </h1>
                  <p> {questions[0].value} </p>
                </div>
                <div>
                  <h1 className="text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-3xl py-3">
                    See how your area gets larger
                  </h1>
                  <p> {questions[0].value} </p>
                </div>

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
      UI coming soon...
    </div>
  )
}