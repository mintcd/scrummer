'use client'

import { useState, useEffect, useRef } from "react";
import { Scrollspy, initTE } from "tw-elements";
import questions from '@models/questions'
import Image from 'next/image'
import { BsArrowRight, BsArrowCounterclockwise } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineRight, AiOutlineLeft, AiOutlineCheck } from 'react-icons/ai'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { Radar } from 'react-chartjs-2';




export default function UI() {
  useEffect(() => {
    initTE({ Scrollspy });
    ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
  }, [])

  const maxArea = 59.44103

  // Hooks
  const [questionNumber, setQuestionNumber] = useState(0)
  const quizRef = useRef(null);
  const [reviewed, setReviewed] = useState(false)
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(() =>
    Array(5).fill().map(() => Array(5).fill(false))
  );
  const [finished, setFinished] = useState(false)
  const [retaken, setRetaken] = useState(false)

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
        label: "Let see how large your area is",
        data: result.map((each) =>
          each.reduce((count, value) => count + (value === true ? 1 : 0), 0)
        ),
        backgroundColor: 'rgba(66, 211, 146, 0.3)',
        borderColor: 'rgba(66, 211, 146, 0.5)',
        borderWidth: 1,
        scaleStep: 1,
        // Remove the label property
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
          display: false,
          stepSize: 1,
          fontSize: 100,
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

  function handleReview() {
    setReviewed(true)
  }

  function handleChange(questionIndex, optionIndex) {
    let newResult = [...result]
    newResult[questionIndex][optionIndex] = !newResult[questionIndex][optionIndex]
    setResult(newResult)
  }

  function handleFinish() {
    setFinished(true)
  }

  function handleBack() {
    let newResult = [...result]
    newResult[questionNumber - 1] = [false, false, false, false, false]
    setQuestionNumber(questionNumber - 1)
  }

  function handleNext() {
    let newResult = [...result]
    newResult[questionNumber + 1] = [false, false, false, false, false]
    setQuestionNumber(questionNumber + 1)
  }

  function handleReset() {
    setQuestionNumber(0)
    setReviewed(false)
    setResult(Array(5).fill().map(() => Array(5).fill(false)));
    setFinished(false)
    setRetaken(true)
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="items-center text-justify text-base">
          <div className="text-gray-600 pt-4">
            {!reviewed &&
              <div className="">
                <div
                  class="text-center pt-16 sm:pt-32 font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-r from-vueGreen to-vueBlue"
                >
                  Scrum Values Quiz
                </div>
                {!finished && !retaken && <p className="text-justify text-lg mt-6 leading-8">
                  Welcome to a self-evaluation quiz designed to assess your familiarity with Scrum.
                  The quiz will gauge your understanding of Scrum by measuring the number of exemplary behaviors you exhibit corresponding to each Scrum value. <br />
                </p>}
              </div>
            }

            {reviewed &&
              <div className="flex flex-col justify-center items-center">
                <div
                  class="text-center pt-6 sm:pt-32 font-extrabold text-transparent text-6xl sm:text-8xl bg-clip-text bg-gradient-to-r from-vueGreen to-vueBlue"
                >
                  Scrum Values Quiz
                </div>

                <div className="svg-image">
                  <Image
                    src="/assets/images/scrumpillars.svg"
                    alt="scrum pillars"
                    width={400}
                    height={0}
                  />
                </div>

                <p className="text-left text-m leading-8">
                  An empirical framework for iterative software development:
                  <ul className="list-disc ml-4">
                    <li>
                      Based on three pillars: Transparency, Inspection, and Adaptation.              </li>
                    <li>
                      Developed into five values: Courage, Focus, Commitment, Respect, and Openness.   </li>
                  </ul>
                </p>
              </div>
            }

            {!finished &&
              <div>
                {!retaken && <div class="grid grid-cols-2">
                  <div class="flex justify-start">
                    {!reviewed &&
                      <button
                        className="my-4 w-[6rem] mr-2 h-10 text-vueBlue focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleReview}
                      >
                        Review
                      </button>}

                    <a href="https://scrumguides.org/" target="_blank" className="my-4 flex items-center">
                      <button
                        className="justify-center h-10 w-[6rem] text-vueBlue bg-blue-200 focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={handleStart}
                      >
                        Explore
                        <span className={`ml-2 w-4 h-4 transition-transform transform ${started ? 'rotate-90' : ''}`}>
                          <FaSearch />
                        </span>
                      </button>
                    </a>
                  </div>

                  <div className="flex justify-end">
                    <button
                      className={`my-4 w-[6rem] h-10 text-gray-600 justify-center bg-vueBlue hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${started ? 'arrow-transition' : ''}`}
                      onClick={handleStart}
                    >
                      <strong className="flex items-center text-white">
                        Start
                        <span className={`ml-2 w-4 h-4 transition-transform transform ${started ? 'rotate-90' : ''}`}>
                          <BsArrowRight />
                        </span>
                      </strong>
                    </button>
                  </div>
                </div>}
              </div>
            }
          </div>

        </div>

      </div>
      {
        started &&
        <div class="py-4">
          <div class="">
            {/* <div id="scrollspy1" className="sticky-top pl-3 text-sm overflow-x-auto" ref={quizRef}>
              <ul data-te-nav-list-ref className="flex space-x-4 sm:space-y-4 justify-center">
                {questions.map((question, index) => (
                  <li className="pl-1 py-1 text-left" key={index} style={{ marginTop: 0 }}>
                    <a
                      data-te-nav-link-ref
                      data-te-nav-link-active
                      class="bg-transparent px-[5px] text-neutral-600 shadow-none dark:text-neutral-200"
                      href={`#${question.key}`}
                    >
                      {question.key}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}
            {!finished && <div
              // data-te-spy="scroll"
              // data-te-target="#scrollspy1"
              // data-te-offset="200"
              // class="relative snap-y h-80 overflow-auto px-3"
              class=""
              ref={quizRef}
            >
              {questions.map((question, questionIndex) => (
                questionNumber === questionIndex &&
                <div id={question.key} className="snap-start" key={question.key}>
                  <h1 className="py-2 text-2xl text-center font-bold tracking-tight text-gray-600 sm:text-2xl">
                    {question.key}
                  </h1>
                  {question.value.map((option, optionIndex) => (
                    <div className="">
                      <div name="options" className="">
                        <div className={`my-2 rounded-lg p-2 sm:hover:bg-vueBlue sm:hover:bg-opacity-30 ${result[questionIndex][optionIndex] ? 'bg-vueBlue bg-opacity-50' : 'bg-vueBlue bg-opacity-20'}`}>
                          <label
                            htmlFor={`${questionIndex}${optionIndex}-checkbox`}
                            className="flex items-center cursor-pointer"
                          >
                            <input
                              id={`${questionIndex}${optionIndex}-checkbox`}
                              type="checkbox"
                              className="w-0 h-0"
                              checked={result[questionIndex][optionIndex] === true}
                              onChange={() => handleChange(questionIndex, optionIndex)}
                            />
                            <span className="text-justify text-sm font-medium text-gray-600">
                              {option}
                            </span>
                          </label>
                          {/* <div className="h-[1px] bg-gray-400 bg-opacity-50"></div> */}
                        </div>

                      </div>
                    </div>

                  ))}
                </div>
              ))}
              <div class="grid grid-cols-5 items-center text-sm text-gray-600">
                <div class="flex col-span-1 justify-start">
                  <button
                    className={`my-4 w-10 h-10 text-white text-xl justify-center bg-vueBlue bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                    onClick={handleBack}
                  >
                    <AiOutlineLeft width={10} height={10} />
                  </button>

                </div>

                <div name="progress-bar" className="h-1 w-full bg-neutral-200 dark:bg-neutral-600 col-span-3">
                  <div
                    className="h-1 bg-primary transition-width duration-500"
                    style={{ width: `${questionNumber * 20}%` }}
                  ></div>
                  <div className="my-1">
                    {questionNumber}/5 completed
                  </div>
                </div>

                <div className="flex col-span-1 justify-end">
                  {questionNumber < 4 ?
                    <button
                      className={`my-4 w-10 h-10 text-white text-xl justify-center bg-vueBlue bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                      onClick={handleNext}
                    >
                      <AiOutlineRight />
                    </button>
                    :
                    <button
                      className={`my-4 w-10 h-10 text-white text-xl justify-center bg-vueBlue bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                      onClick={handleFinish}
                    >
                      <AiOutlineCheck />
                    </button>
                  }


                </div>
              </div>
            </div>}

            <div class="border-t py-3"></div>
          </div>
        </div>
      }
      {
        finished &&
        <div class="grid grid-cols-5 items-center justify-center">
          <div className="col-span-5 sm:col-span-4 flex justify-center w-full sm:h-[35rem]">
            <Radar data={data} options={options} />
          </div>

          <div className="col-span-5 sm:col-span-1 text-sm text-gray-600">
            Wasn't your best? Retake <br />
            <button
              className={`my-4 w-10 h-10 justify-center bg-vueBlue bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
              onClick={handleReset}
            >
              <BsArrowCounterclockwise width={10} height={10} />
            </button>
          </div>

        </div>
      }
    </div >
  )
}