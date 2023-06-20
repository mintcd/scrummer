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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
        label: "Point",
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

  // Handlers

  function handleScroll() {
    const scrollspyElements = document.querySelectorAll('[data-te-nav-link-ref]');
    let active = '';
    for (let i = scrollspyElements.length - 1; i >= 0; i--) {
      const spyee = scrollspyElements[i].getAttribute('href').substring(1);
      const spyeeElement = document.getElementById(spyee);
      const rect = spyeeElement.getBoundingClientRect();
      if (rect.top <= 0) {
        active = spyee;
        break;
      }
    }
    setActiveSpyee(active);
  }

  function handleStart() {
    setStarted(true);
  }

  function handleChange(questionIndex, optionIndex) {
    let newResult = [...result]
    newResult[questionIndex][optionIndex] = !newResult[questionIndex][optionIndex]
    setResult(newResult)
  }

  function handleFinish() {
    setFinished(true)
    setActiveSpyee('Finish');
  }

  function handleReset() {
    setStarted(false)
    setResult(Array(5).fill().map(() => Array(5).fill(false)))
    setFinished(false)
    setActiveSpyee('');
  }

  return (
    <div>
      {!started ?
        <div>
          <h1 className="text-4xl py-8 text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scrum Development Progress
          </h1>
          <div className='grid items-center grid-cols-1 gap-4 sm:grid-cols-2'>
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
              {introParagraph}
              <div className="mt-5 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleStart}
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
        : <div>
          <h1 className=" py-16 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
            Scrum Values Quiz
          </h1>
          {!finished ?
            <div class="grid grid-cols-3">
              <div className="col-span-3 sm:col-span-1">
                <div id="scrollspy1" className="sticky-top pl-3 text-sm overflow-x-auto">
                  <ul data-te-nav-list-ref className="flex sm:flex-col space-x-4 sm:space-y-4 justify-center">
                    {questions.map((question, index) => (
                      <li className="px-1 py-1 text-left" key={index} style={{ marginLeft: 0 }}>
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
                    <li className="px-1 py-3 text-left" key="finish" style={{ marginLeft: 0 }}>
                      <a
                        data-te-nav-link-ref
                        data-te-nav-link-active={activeSpyee === 'Finish'}  // Apply bold styling if activeSpyee is "Finish"
                        className={`bg-transparent px-1 text-neutral-600 shadow-none dark:text-neutral-200 ${activeSpyee === 'Finish' ? 'font-bold' : ''}`}  // Add font-bold class
                        href={`#Finish`}
                      >
                        Finish
                      </a>
                    </li>
                  </ul>
                </div>
              </div>


              <div class="col-span-3 sm:col-span-2">
                <div
                  data-te-spy="scroll"
                  data-te-target="#scrollspy1"
                  data-te-offset="200"
                  class="relative snap-y h-80 overflow-auto">
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
                                } accent-orange-400 rounded`}
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
                  <button
                    id="Finish"
                    type="button"
                    className="my-4 h-10 text-white bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 hover:bg-gradient-to-br focus:ring-4 first-letter:focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleFinish}
                  >
                    Finish
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                  </button>
                </div>
              </div>
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
            </div>}
        </div>

      }
    </div>
  )
}