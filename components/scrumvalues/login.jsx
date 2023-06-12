import React, { useState } from "react";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("")
    const [started, setStarted] = useState(false)
    const [error, setError] = useState(false)

    const handleStart = () => {
        if (onLogin(username)) {
            setStarted(true)
            setError(false)
        }
        else setError(true)
    }

    const handleRename = () => {
        onLogin(username)
    }

    return (
        <div className="login-container">
            <input placeholder="Enter your name" className="text-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {!started && <input className="btn" type="submit" value="Start" onClick={handleStart} />}
            {started && <input className="btn" type="submit" value="Rename" onClick={handleRename} />}
            {error && <div> Your name should not be empty </div>}
        </div>
    )
}

export default Login