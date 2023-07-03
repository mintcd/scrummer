import { dividerClasses } from '@mui/material';
import { useState } from 'react';

export default function Login() {
  const [info, setInfo] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [signuped, setSignuped] = useState(false);

  function handleChangeInfo(e) {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(info.password)
  }

  function handleSignup() {
    setSignuped(true)
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you can perform any action with the form data, like making an API call for login.
    console.log('Form submitted with:', info);
  }

  return (
    <div className="grid grid-cols-2 text-center">
      <div className="mr-8">
        <div className="mt-32 h-16 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-vueGreen to-vueBlue">
          Scrummer
        </div>
        <div className="h-32 text-xl">
          Your assistant to learn Scrum and master applying in work.
        </div>
      </div>
      <form className="w-full max-w-sm mt-32" onSubmit={handleSubmit}>


        {!signuped ?
          <div >
            <div about="inputs">
              <input
                className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                name="usernameOrEmail"
                placeholder="Username or email address"
                onChange={handleChangeInfo}
                value={info.usernameOrEmail}
              />
              <input
                className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                name="password"
                onChange={handleChangeInfo}
                placeholder="Password"
                value={info.password}
              />
            </div>
            <div id="buttons" className='flex justify-end'>

              <button
                className="my-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit" // Assuming this button is inside a form and it should trigger a form submission
              >
                Signin
              </button>

              <button
                className="my-2 ml-4 underline text-purple-500"
                onClick={handleSignup}
              >
                Create an account
              </button>
            </div>
          </div>
          :
          <div >
            <div about="inputs">
              <input
                className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                name="usernameOrEmail"
                placeholder="Email"
                onChange={handleChangeInfo}
                value={info.usernameOrEmail}
              />
              <input
                className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                name="usernameOrEmail"
                placeholder="Username"
                onChange={handleChangeInfo}
                value={info.usernameOrEmail}
              />
              <input
                className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
                name="password"
                onChange={handleChangeInfo}
                placeholder="Password"
                value={info.password}
              />
            </div>
            <div className='flex'>
              <button id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Dropdown hover
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
              </div>

            </div>
            <div className='flex justify-end'>
              <button
                className="my-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit" // Assuming this button is inside a form and it should trigger a form submission
              >
                Signup
              </button>
            </div>

          </div>
        }

      </form>
    </div>
  );
}
