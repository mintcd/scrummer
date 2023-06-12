import React, { useState, useEffect } from "react";
import questions from "@models/data/questions";

const Question = ({ number, selections, onNext, onBack, onFinish, onChange }) => {
  const question = questions[number]
  const [selected, setSelected] = useState(selections)
  useEffect(() => {
    setSelected(selections);
  }, [selections]);


  const handleChange = (index) => {
    let updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    onChange(updatedSelected)
    setSelected(updatedSelected);
  };

  const handleBack = () => {
    onBack();
    setSelected([false, false, false, false, false])
  };

  const handleNext = () => {
    onNext();
    setSelected([false, false, false, false, false])
  }

  const handleFinish = () => {
    onFinish(selected)
  }

  return (
    <div className="container question-container">
      <h1 className="intro-title"> {question.value} </h1>
      {question.answers.map((answer, index) => (
        <div key={index} className="answer-container">
          <input
            className="select"
            type="checkbox"
            id={`${question.value}-${index}`}
            name={`question-${number}`}
            value={answer}
            checked={selected[index]}
            onChange={() => handleChange(index)}
          />
          <label>  <span onClick={() => handleChange(index)}>
            {answer}
          </span> </label>
        </div>

      ))}
      <div className="row">
        {number === 0 &&
          <div className="button-container col-4"></div>}

        {number > 0 &&
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/quiz"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Take Quiz
            </a>
            <a href="https://scrumguides.org/" target="_blank" className="text-sm font-semibold leading-6 text-gray-900">
              Explore <span aria-hidden="true">→</span>
            </a>
          </div>}

        {number < 4 &&
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/quiz"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Take Quiz
            </a>
            <a href="https://scrumguides.org/" target="_blank" className="text-sm font-semibold leading-6 text-gray-900">
              Explore <span aria-hidden="true">→</span>
            </a>
          </div>}
        {number === 4 &&
          <div className="button-container col-4">
            <button className="btn --right" onClick={handleFinish}>
              <FontAwesomeIcon icon={faCheck} bounce />
            </button>
          </div>}
      </div>
    </div>
  );
};

export default Question;