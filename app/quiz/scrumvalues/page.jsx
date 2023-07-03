'use client'

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import { useState, useEffect, useRef } from "react";
import { Scrollspy, Modal, Ripple, initTE } from "tw-elements";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import questions from '@models/questions'
import Image from 'next/image'
import { BsArrowRight, BsArrowCounterclockwise } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa';
import { AiOutlineRight, AiOutlineLeft, AiOutlineCheck, AiOutlineHome } from 'react-icons/ai'

import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, Colors } from 'chart.js'
import { Radar } from 'react-chartjs-2';

export default function UI() {
  useEffect(() => {
    initTE({ Scrollspy, Modal, Ripple });
    ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
  }, [])

  const maxArea = 59.44103

  // Hooks
  const [questionNumber, setQuestionNumber] = useState(0)
  const [questionDone, setQuestionDone] = useState(0)
  const quizRef = useRef(null);
  const [reviewed, setReviewed] = useState(false)
  const [started, setStarted] = useState(false)
  const [result, setResult] = useState(() =>
    Array(5).fill().map(() => Array(5).fill(false))
  );
  const [finished, setFinished] = useState(false)
  const [retaken, setRetaken] = useState(false)
  const [open, setOpen] = useState(false);

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
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          font: {
            size: 15
          }
        }
      }
    }
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
    setQuestionDone(questionDone + Number(questionNumber >= questionDone))
  }

  function handleBack() {
    let newResult = [...result]
    newResult[questionNumber - 1] = [false, false, false, false, false]
    if (questionNumber > 0) setQuestionNumber(questionNumber - 1)
  }

  function handleNext() {
    let newResult = [...result]
    newResult[questionNumber + 1] = [false, false, false, false, false]
    setQuestionNumber(questionNumber + 1)
    setQuestionDone(questionDone + Number(questionNumber >= questionDone))
  }

  const handleFinish = () => {
    if (!retaken) setOpen(true)
    else setFinished(true)
  };

  function handleDialog(confirmed) {
    if (confirmed) setFinished(true);
    setOpen(false);
  }

  function handleRetake() {
    setQuestionNumber(0)
    setReviewed(false)
    setResult(Array(5).fill().map(() => Array(5).fill(false)));
    setQuestionDone(0)
    setFinished(false)
    setRetaken(true)
  }

  function handleReset() {
    setQuestionNumber(0)
    setReviewed(false)
    setResult(Array(5).fill().map(() => Array(5).fill(false)));
    setQuestionDone(0)
    setFinished(false)
    setStarted(false)
    setRetaken(false)
  }

  const question =
    <div name="questions" className="sm:w-[80%] justify-center items-center" ref={quizRef}>
      {questions.map((question, questionIndex) => (
        questionNumber === questionIndex &&
        <div id={question.key} className="snap-start" key={question.key}>
          <div name="question-title" className="py-2 text-2xl font-bold tracking-tight text-left">
            {question.key}
          </div>
          {question.value.map((option, optionIndex) => (
            <div className="">
              <div name="options" className="">
                <div className={`my-2 rounded-lg p-2 bg-vueGreen sm:hover:bg-vueBlue sm:hover:bg-opacity-30 ${result[questionIndex][optionIndex] ? 'bg-vueBlue bg-opacity-50' : 'bg-vueBlue bg-opacity-20'}`}>
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
                    <span className="text-justify text-sm font-medium">
                      {option}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div name='bottom' className="mb-[-1.5rem] grid grid-cols-5 justify-center items-center text-sm">
        <div name="back" className="flex col-span-1 justify-start">
          <button
            className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
            onClick={handleBack}
          >
            <AiOutlineLeft width={10} height={10} />
          </button>

        </div>

        <div name="progress-bar" className="w-full col-span-3">
          <div
            className="h-2 transition-width duration-500"
            style={{
              width: `${questionDone * 20}%`,
              backgroundColor: 'rgba(66, 211, 146, 0.3)',
            }}
          ></div>
          <div
            className="h-2 bg-vueGreen transition-width duration-500"
            style={{
              width: `${(questionNumber + 1) * 20}%`,
              backgroundColor: 'rgba(66, 211, 146, 0.5)',
            }}
          ></div>
        </div>

        <div className="flex col-span-1 justify-end">
          {questionNumber < 4 ?
            <button
              name="next"
              className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
              onClick={handleNext}
            >
              <AiOutlineRight />
            </button>
            :
            <button
              name="finish"
              className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
              onClick={handleFinish}
            >
              <AiOutlineCheck />
            </button>

          }
        </div>
      </div>
      <div name="taken" className='col-span-5'>
        {questionDone}/5 taken
      </div>
      <div className="border-t py-3"></div>
      {retaken &&
        <button
          name="home"
          className={`mb-4 w-12 h-12 text-white text-xl justify-center bg-vueBlue bg-opacity-60 hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
          onClick={handleReset}
        >
          <AiOutlineHome />
        </button>}
    </div>

  const chart =
    <div name="chart" className="grid grid-cols-5 items-center justify-center">
      <Radar data={data} options={options} />
    </div>

  return (
    <div className='text-gray-500 text-center'>
      {open &&
        <Dialog open={open} onClose={() => handleDialog(false)} className='text-sm text-gray-500'>
          <DialogTitle> Confirm </DialogTitle>
          <DialogContent className="relative p-4 text-justify" dividers>
            Make sure your options match your how you work
          </DialogContent>
          <DialogActions className="flex flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              onClick={() => handleDialog(false)}
              className='w-[6rem] h-[2rem] justify-center items-center hover:bg-gradient-to-br rounded-lg inline-flex text-[#5d91e7] '
            >
              No
            </button>
            <button
              onClick={() => handleDialog(true)}
              className='w-[6rem] h-[2rem] rounded-lg justify-center items-center bg-middlegreen hover:bg-gradient-to-br  text-white'
              variant="contained"
            >
              Yes
            </button>
          </DialogActions>
        </Dialog>}

      <div className="pt-16 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-vueGreen to-vueBlue">
        Scrum Values Quiz
      </div>

      <BrowserView>
        <div name="intro" className="flex flex-col text-justify">
          {!retaken &&
            <div className="grid grid-cols-2 items-center justify-center">
              <div name="col-1" className="col-span-2 sm:col-span-1">
                <Image name="scrum" src="/assets/images/scrumpillars.svg" alt="scrum pillars" width={500} height={0} />
              </div>

              <div name="col-2">
                {
                  <div className="col-span-2 sm:col-span-1text-justify text-lg mt-6 leading-8">
                    Welcome to a self-evaluation quiz designed to assess your familiarity with Scrum.
                    The quiz will gauge your understanding of Scrum by measuring the number of exemplary behaviors you exhibit corresponding to each Scrum value. <br />
                  </div>}
                {reviewed &&
                  <div className="flex flex-col justify-center items-center text-lg">
                    <p className="mt-4 text-left leading-8">
                      Scrum is an empirical framework for iterative software development:
                      <ul className="list-disc ml-4">
                        <li> Based on <b>three pillars</b>: Transparency, Inspection, and Adaptation.</li>
                        <li>
                          Developed into <b>five values</b>: Courage, Focus, Commitment, Respect, and Openness.   </li>
                      </ul>
                    </p>

                  </div>}
                {!finished && !retaken &&
                  <div name='buttons' className='grid grid-cols-5 font-[500]'>
                    <div className="col-span-3 flex justify-start">
                      {!reviewed &&
                        <button
                          className="w-[6rem] h-[2rem] my-4 mr-2  text-[#5d91e7]"
                          onClick={handleReview}>
                          Review
                        </button>}


                      <button
                        onClick={() => window.open('https://scrumguides.org/', '_blank')}
                        className="rounded-lg w-[6rem] h-[2rem] px-5 my-4 mr-2  bg-middlegreen bg-opacity-30 flex justify-center items-center text-[#4cb8b4]"
                      >
                        Explore
                        <span className={`ml-2 w-5 h-5`}>
                          <FaSearch />
                        </span>
                      </button>

                    </div>

                    <div className="col-span-2 flex justify-end">
                      <button
                        className={`my-4 w-[6rem] h-[2rem] justify-center bg-middlegreen hover:bg-gradient-to-br rounded-lg inline-flex items-center ${started ? 'arrow-transition' : ''}`}
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
                  </div>
                }
              </div>
            </div>}
        </div>

        {started &&
          <div name="quiz" className="py-4 flex flex-col items-center">
            {!finished && question}

          </div>
        }

        {finished && chart}
      </BrowserView>

      <MobileView className='text-gray-500 text-sm'>
        <div name="intro" className="flex flex-col justify-center">
          {!reviewed ?
            <div className="">
              {!finished && !retaken && <p className="text-justify text-lg mt-6 leading-8">
                Welcome to a self-evaluation quiz designed to assess your familiarity with Scrum.
                The quiz will gauge your understanding of Scrum by measuring the number of exemplary behaviors you exhibit corresponding to each Scrum value. <br />
              </p>}
            </div>
            :
            <div className="flex flex-col justify-center items-center">
              <Image name="scrum" src="/assets/images/scrumpillars.svg" alt="scrum pillars" width={300} height={0} />
              <p className="text-left leading-8">
                Scrum is an empirical framework for iterative software development:
                <ul className="list-disc ml-4">
                  <li> Based on <b>three pillars</b>: Transparency, Inspection, and Adaptation.</li>
                  <li>
                    Developed into <b>five values</b>: Courage, Focus, Commitment, Respect, and Openness.   </li>
                </ul>
              </p>
            </div>}

          {!finished && !retaken &&
            <div name='buttons' className='grid grid-cols-5 font-[500]'>
              <div className="col-span-3 flex justify-start">
                {!reviewed &&
                  <button
                    className="w-[6rem] h-8 my-4 mr-2  text-vueGreen"
                    onClick={handleReview}>
                    Review
                  </button>}
                <button
                  onClick={() => window.open('https://scrumguides.org/', '_blank')}
                  className="rounded-lg w-[6rem] h-8 px-5 my-4 mr-2  bg-vueGreen bg-opacity-30 flex justify-center items-center text-vueGreen"
                >
                  Explore
                  <span className={`ml-2 w-5 h-5`}>
                    <FaSearch />
                  </span>
                </button>
              </div>

              <div className="col-span-2 flex justify-end">
                <button
                  className={`my-4 w-[6rem] h-[2rem] justify-center bg-middlegreen hover:bg-gradient-to-br rounded-lg inline-flex items-center ${started ? 'arrow-transition' : ''}`}
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
            </div>
          }


        </div>

        {started && !finished && question}
        {finished && chart}
      </MobileView>
    </div>


  )
}