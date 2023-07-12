import { useState, ChangeEvent } from 'react'
import { AiOutlineBulb } from 'react-icons/ai'
import { Dialog, DialogTitle, DialogContent, DialogActions, dividerClasses } from '@mui/material';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { isEmail, containsSpecialCharacters } from '@controllers/helpers';

export default function Login() {

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

  const [error, setError] = useState({ existed: false, nonexisted: false, notEmail: false, containsSpecialCharacters: false });

  const [existed, setExisted] = useState(false);
  const [nonexisted, setNonexisted] = useState(false);

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

  async function handleConfirmSignin() {
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signinInfo)
      });

      if (response.status === 401) setNonexisted(true)
      if (response.status === 200) {
        const data = await response.json();
        setCookie('auth', data.cookie, {
          maxAge: 604800,
          path: '/',
          secure: false,
        });
        window.location.href = '/'
      }

    } catch (error) {
      console.error(error);
    }
  }

  function handleSignup() {
    setOpen(true)
  }

  async function handleConfirmSignup() {
    if (!isEmail(signupInfo.email)) {
      setError((prevState) => ({
        ...prevState,
        notEmail: true,
      }));
      return;
    }
    if (containsSpecialCharacters(signupInfo.username)) {
      setError((prevState) => ({
        ...prevState,
        notEmail: false,
        containsSpecialCharacters: true,
      }));
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });

      if (response.status === 409)
        setError((prevState) => ({
          ...prevState,
          existed: true,
        }));
      if (response.status === 200) {
        setError((prevState) => ({
          ...prevState,
          notEmail: false,
          nonexisted: false,
          containsSpecialCharacters: false,
          existed: false,
        }));

        setSignuped(true)
      }
    } catch (error) {
      console.error(error);
    }
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
        <a href="https://scrumguides.org/" target="_blank" rel="noopener noreferrer" className='text-center'>
          <span>
            <div className='flex justify-center text-4xl text-middlegreen text-center'>
              <AiOutlineBulb />
            </div>
            Take a travel in Scrum
          </span>
        </a>
      </div>
      <div className="w-full ml-8 max-w-sm mt-32">
        <div about="signin">
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
          onClose={(reason: "backdropClick" | "escapeKeyDown") => setOpen(false)}
        >
          <DialogTitle > Sign up </DialogTitle>
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
              {error.notEmail && <div className='text-sm text-red-500'> Please enter a valid email. </div>}
              <input
                className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
                type="text"
                name="username"
                placeholder='Username'
                onChange={(e) => handleChangeSignup(e)}
                value={signupInfo.username}
              />
              {error.containsSpecialCharacters && <div className='ml-2 text-sm text-red-500'>Special characters (!@#$%^&amp;*(),.?&quot;:{ }|&lt;&gt;) not allowed.</div>}

              <input
                className="my-2 bg-gray-100 appearance-none border-2 border-gray-100 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-[#56a2d2]"
                type="password"
                name="password" // Updated name here
                placeholder="Password"
                onChange={(e) => handleChangeSignup(e)}
                value={signupInfo.password}
              />
            </DialogContent>

            {error.existed && <div className='text-sm'> User existed. </div>}
            {signuped && <div className='text-sm'> Signup completed. Please signin. </div>}
            <DialogActions className='w-full'>
              <button
                type="button"
                className="py-2 rounded px-4 w-full shadow bg-[#56a2d2] hover:opacity-50 focus:shadow-outline focus:outline-none text-white font-bold "
                onClick={handleConfirmSignup}
              >
                Confirm
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
