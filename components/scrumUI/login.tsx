import { useState, ChangeEvent } from 'react'
import { AiOutlineBulb } from 'react-icons/ai'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


export default function Login() {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const [signinInfo, setSigninInfo] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [signupInfo, setSignupInfo] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signuped, setSignuped] = useState(false);
  const [open, setOpen] = useState(false);


  function handleChangeSignin(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSigninInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleChangeSignup(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setSignupInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleConfirmSignin() {
    console.log(signinInfo)
  }

  function handleSignup() {
    setOpen(true)
  }

  function handleConfirmSignup(bool: Boolean, e: React.FormEvent) {
    if (bool) {
      fetch("/api/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
        .then(response => {
          console.log(response.json())
        }
        )
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      setOpen(false)
    }
    else setOpen(false)

  }


  return (
    <div className="my-32 grid grid-cols-2 justify-center text-gray-600 text-center">
      <div className="mr-8">
        <div className="mt-32 h-16 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-vueGreen to-vueBlue">
          Scrummer
        </div>
        <div className="my-8 text-xl">
          Your assistant to learn Scrum and master applying in work.
        </div>

        <a
          href="https://scrumguides.org/"
          target="_blank"
          rel="noopener noreferrer"
          className='text-center'
        >
          <span>
            <div className='flex justify-center text-4xl text-middlegreen text-center'>
              <AiOutlineBulb />
            </div>

            <div> Take a travel in Scrum </div>
          </span>
        </a>
      </div>
      <div className="w-full ml-8 max-w-sm mt-32">
        <div >
          <div about="inputs">
            <input
              className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
              name="usernameOrEmail"
              id="loginUsernameOrEmail"
              type="text"
              placeholder="Username or email address"
              onChange={(e) => handleChangeSignin(e)}
              value={signinInfo.usernameOrEmail}
            />
            <input
              className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
              type="password"
              name="password" // Updated name here
              onChange={(e) => handleChangeSignin(e)}
              placeholder="Password"
              value={signinInfo.password}
            />
          </div>
          <div id="buttons" className='flex justify-end'>

            <button
              className="my-2 shadow bg-[#56a2d2] hover:opacity-40 text-white font-bold py-2 px-4 rounded"
              onClick={handleConfirmSignin}
            >
              Signin
            </button>

            <button
              className="my-2 ml-4 underline text-[#56a2d2]"
              onClick={handleSignup}
            >
              Create an account
            </button>
          </div>
        </div>

        <Dialog className="" open={open}
          onClose={(reason: "backdropClick" | "escapeKeyDown") => handleConfirmSignup(false, null)}
        >
          <form className="flex flex-col justify-center items-center">
            <DialogContent dividers>
              <input
                className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => handleChangeSignup(e)}
                value={signupInfo.email}
              />
              <input
                className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleChangeSignup(e)}
                value={signupInfo.username}
              />
              <input
                className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
                type="password"
                name="password" // Updated name here
                placeholder="password"
                onChange={(e) => handleChangeSignup(e)}
                value={signupInfo.password}
              />
            </DialogContent>
            <DialogActions className='w-full'>
              <button
                type="button"
                className="py-2 rounded px-4 w-full shadow bg-[#56a2d2] hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold "
                onClick={(e) => handleConfirmSignup(true, e)}
              >
                Signup
              </button>
            </DialogActions>
          </form>
        </Dialog>


      </div>
    </div>
  );
}
