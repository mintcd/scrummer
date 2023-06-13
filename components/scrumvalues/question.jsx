import React, { useState, useEffect } from "react";
import questions from "../../models/questions";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faForward, faBackward, faCheck } from "@fortawesome/free-solid-svg-icons";

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
          <div className="button-container col-4">
            <button className="btn --left" onClick={handleBack}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
          </div>}

        {number < 4 &&
          <div className="button-container col-4">
            <button className="btn --right" onClick={handleNext}>
              <FontAwesomeIcon icon={faForward} />
            </button>
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