'use client'

import { useState } from "react";

import Question from "@components/scrumvalues/question"
import Graph from "@components/scrumvalues/graph"

export default function ScrumValuesQuizFacade() {

  const maxArea = 59.44103

  let [showValues, setShowValues] = useState(false)
  let [currentQuestion, setCurrentQuestion] = useState(0)
  let [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState(Array(5).fill(Array(5).fill(false))) // 5 questions having 5 options each


  const handleNext = () => {
    if (currentQuestion < 4) setCurrentQuestion(currentQuestion + 1)
  }

  const handleBack = () => {
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1)
  }

  const handleChange = (childAnswer) => {
    let updatedAnswers = [...answers]
    updatedAnswers[currentQuestion] = [...childAnswer];
    setAnswers(updatedAnswers);
  }

  const handleFinish = () => {
    setFinished(true)
  }

  const getArea = () => {
    const getAnswerNumbers = answers.map((answer) => answer.filter((option) => option === true).length)

    const percent = Math.floor(getAnswerNumbers
      .map((value, index) => [value, getAnswerNumbers[(index + 1) % getAnswerNumbers.length]])
      .map(pair => pair[0] * pair[1] / 2 * Math.sin(1.25663))
      .reduce(function (a, b) { return a + b; }, 0) / maxArea * 100);
    return percent
  }

  return (
    <div>
      {<div className='container intro-container'>
        {!finished &&
          <Question
            number={currentQuestion}
            selections={answers[currentQuestion]}
            onBack={handleBack}
            onNext={handleNext}
            onFinish={handleFinish}
            onChange={handleChange} />}
        {finished &&
          <div className="row">
            <div className="col-6">
              <Graph answers={answers} />
            </div>
            <div className="col-6">
              <h1 className="intro-title"> Congratulation! </h1>
              <div>Your area covers {getArea()}% of a possibly perfect member's. </div>
              {getArea() < 50 && <div> Try acquiring some more previous descriptions of Scrum values! </div>}
              {getArea() > 50 && <div> Keep going! </div>}
            </div>
          </div>
        }
      </div>}
    </div>
  )

}