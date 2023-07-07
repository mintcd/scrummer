'use client'

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, dividerClasses } from '@mui/material';
import questions from '@models/questions'
import { AiOutlineRight, AiOutlineLeft, AiOutlineCheck, AiOutlineHome } from 'react-icons/ai'
import axios from 'axios'

interface ScrumvaluesProps {
  user: string;
}

export default function Scrumvalues({ user }: ScrumvaluesProps) {

  // Hooks
  const [questionNumber, setQuestionNumber] = useState(0)
  const [result, setResult] = useState(() =>
    Array(5).fill(0).map(() => Array(5).fill(false))
  );
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  function handleChange(questionIndex: number, optionIndex: number) {
    let newResult = [...result]
    newResult[questionIndex][optionIndex] = !newResult[questionIndex][optionIndex]
    setResult(newResult)
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
  }

  const handleFinish = () => {
    setOpen(true)
  };

  async function handleDialog(confirmed: boolean) {
    if (confirmed) {
      await axios.post("api/submit", {
        user: user,
        result: result
      })
        .then(response => console.log(response))
        .then(() => setSubmitted(true))

    }
    setOpen(false)
  }

  return (
    <div className='flex flex-col items-center text-gray-500 text-center'>
      {open &&
        <Dialog open={open} onClose={() => handleDialog(false)} className='text-sm text-gray-500'>
          <DialogTitle> Confirm </DialogTitle>
          <DialogContent className="relative p-4 text-justify" dividers>
            Please make sure the options align with your daily work approach
          </DialogContent>
          <DialogActions className="flex flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              onClick={() => handleDialog(false)}
              className='w-[6rem] h-[2rem] mr-3 justify-center items-center hover:bg-gradient-to-br rounded-lg inline-flex text-[#5d91e7] '
            >
              Let me recheck
            </button>
            <button
              onClick={() => handleDialog(true)}
              className='w-[4rem] h-[2rem] ml-3 rounded-lg justify-center items-center bg-[#56a2d2] hover:bg-gradient-to-br  text-white'
            >
              Sure!
            </button>
          </DialogActions>

        </Dialog>}

      {!submitted &&
        <div>
          <div className='flex-grow pt-8 text-lg'> Homepage is being developed... <br /> Please spend a minute redoing the quiz. </div>
          <div about='quiz'>
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
            <div about='bottom' className="mb-[-1.5rem] grid grid-cols-5 justify-center items-center text-sm">
              <div about="back" className="flex col-span-1 justify-start">
                <button
                  name="right"
                  className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                  onClick={handleBack}
                >
                  <AiOutlineLeft width={10} height={10} />
                </button>

              </div>

              <div about="progress-bar"
                className="col-span-3 h-2 bg-vueGreen transition-width duration-500"
                style={{
                  width: `${(questionNumber + 1) * 20}%`,
                  backgroundColor: 'rgba(66, 211, 146, 0.5)',
                }}>
              </div>

              <div className="flex col-span-1 justify-end">
                {questionNumber < 4 ?
                  <button
                    name="next"
                    className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                    onClick={handleNext}
                  >
                    <AiOutlineRight />
                  </button>
                  :
                  <button
                    name="finish"
                    className={`my-4 w-10 h-10 text-white text-xl justify-center bg-[#56a2d2] hover:bg-gradient-to-br font-[600] rounded-full inline-flex items-center`}
                    onClick={handleFinish}
                  >
                    <AiOutlineCheck />
                  </button>

                }
              </div>
            </div>
            <div about="taken" className='col-span-5'>
              Question {questionNumber + 1}/5
            </div>
            <div className="border-t py-3"></div>
          </div>
        </div>}

      {submitted &&
        <div className='flex-grow pt-8 text-lg'> Your submission has been recorded, thank you! </div>
      }
    </div>
  )
}