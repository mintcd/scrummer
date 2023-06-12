import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faForward } from "@fortawesome/free-solid-svg-icons";


import { useState } from "react";

import scrumvalues from "../../assets/scrumvalues.png";
import scrumpillars from "../../assets/scrumpillars.png";


const Intro = () => {

    let [showValues, setShowValues] = useState(false)

    return (
        <div className='container intro-container'>
            {!showValues &&
                <div className='scrum-intro-container'>
                    <h1 className='intro-title'> Scrum </h1>
                    <div className="row">
                        <img className="intro-img col-6" alt="scrumpillars" src={scrumpillars} />
                        <div className="col-6 intro-text">
                            <p> Scrum is a developmental framework relying on Empiricism,
                                which prioritizes experience over fore-seeing rational thinking, leading to iterative
                                development process rather than plan-based ones, such as Waterfall. </p>
                            <p> By this empirical approach, three pillars of Scrum are Transparency, Inspection and Adaption.</p>
                            <div className="button-container">
                                <button className="btn" onClick={() => setShowValues(true)}>
                                    <FontAwesomeIcon icon={faForward} />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>}
            {showValues &&
                <div className="scrum-values-container">
                    <h1 className='intro-title'> Scrum Values </h1>
                    <div className="row">
                        <img className="intro-img col-6" alt="" src={scrumvalues} />
                        <div className="col-6 intro-text">
                            <p> Scrum values can be considered as criteria to estimate if a Scrum member obey Scrum,
                                including Courage, Focus, Commitment, Respect and Openness.
                                If you are new to Scrum, these criteria may be useful for use to adjust
                                your own work attitude. </p>
                            <p> Read more about scrum at <a href="https://www.scrum.org/">https://www.scrum.org/</a>.</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}
export default Intro;