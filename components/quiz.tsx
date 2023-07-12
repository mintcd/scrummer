'use client'

import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, dividerClasses } from '@mui/material';
import questions from '@models/questions'
import axios from 'axios'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Scrumvalues({ username }) {

  const [visited, setVisited] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false });
  const [questionNumber, setQuestionNumber] = useState(0);
  const [result, setResult] = useState(() =>
    Array(5)
      .fill(0)
      .map(() => Array(5).fill(false))
  );
  const [open, setOpen] = useState(false);

  const [summitting, setSummitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    console.log(visited)
    setVisited((prevVisited) => ({
      ...prevVisited,
      [questionNumber]: true
    }));
  }, [questionNumber]);


  function handleChange(questionIndex: number, optionIndex: number) {
    let newResult = [...result]
    newResult[questionIndex][optionIndex] = !newResult[questionIndex][optionIndex]
    setResult(newResult)
  }

  async function handleDialog() {
    await axios.post("api/submit", {
      user: username,
      result: result
    })
      .then(response => console.log(response))
      .then(() => setSubmitted(true))
  }

  return (
    <div className='flex flex-col items-center text-gray-500 text-center'>
      {open &&
        <Dialog open={open} onClose={() => setOpen(false)} className='text-sm text-gray-500'>
          <DialogTitle> Confirm </DialogTitle>
          <DialogContent className="relative p-4 text-justify">
            Please make sure the options align with your daily work approach
          </DialogContent>
          {submitted && <div className='flex-grow text-sm text-gray-600 text-center'> Your submission has been recorded, thank you! </div>}

          <DialogActions className="flex flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              onClick={() => setOpen(false)}
              className='w-[6rem] h-[2rem] mr-3 justify-center items-center hover:bg-gradient-to-br rounded-lg inline-flex text-[#5d91e7] '
            >
              Let me recheck
            </button>
            <button
              onClick={handleDialog}
              disabled={submitted}
              className={`w-[4rem] h-[2rem] ml-3 rounded-lg justify-center items-center bg-[#56a2d2] hover:bg-gradient-to-br text-white
              ${submitted ? 'bg-gray-200' : `bg-[#56a2d2]`}`
              }
            >
              Sure!
            </button>
          </DialogActions>
        </Dialog>}

      <div about='quiz' className="mt-8">
        <div about='navigator' className='flex flex-col items-center pt-1 pb-6'>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                if (questionNumber > 0) {
                  setQuestionNumber(questionNumber - 1);
                }
              }}
            >
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />

            </button>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 
              ${value === (questionNumber + 1) ? 'bg-vueGreen' : 'bg-gray-50'}
                }`}
                onClick={() => setQuestionNumber(value - 1)}
              >
                {value}
              </button>

            ))}

            <button
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => {
                if (questionNumber < 4) {
                  setQuestionNumber(questionNumber + 1);
                }
              }}
            >
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
        {questions.map((question, questionIndex) => (
          questionNumber === questionIndex &&
          <div id={question.key} key={question.key}>
            <div about="question-title" className="py-2 text-2xl font-bold tracking-tight">
              {question.key}
            </div>
            {question.value.map((option, optionIndex) => (
              <div key={optionIndex}>
                <div about="option">
                  <div
                    className={`flex-grow my-2 rounded-lg p-2 bg-vueGreen sm:hover:bg-vueBlue sm:hover:bg-opacity-30 ${result[questionIndex][optionIndex] ? 'bg-vueBlue bg-opacity-50' : 'bg-vueBlue bg-opacity-20'}`}
                  >
                    <div
                      className="flex items-center cursor-pointer"
                    >

                      <span className="text-justify text-sm font-medium">
                        <button
                          id={`${questionIndex}${optionIndex}-checkbox`}
                          className="w-full sm:w-[40rem] h-[auto] text-left"
                          onClick={() => handleChange(questionIndex, optionIndex)}
                        >
                          {option}
                        </button>

                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="border-t py-3"></div>
        <button
          disabled={!Object.values(visited).every((visited) => visited)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded
          ${Object.values(visited).every((visited) => visited) ? 'bg-vueGreen' : 'bg-gray-200'}
       `}
          onClick={() => setOpen(true)}

        >
          Submit
        </button>
      </div>
    </div>
  )
}