'use client';

import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

import Login from "../components/scrumUI/login"

export default function Home() {
  const [name, setName] = useState(null);

  useEffect(() => {
    const cookie = getCookie('auth1')
    if (cookie) setName(cookie.toString())

  }, []);

  return (
    <div>
      {name ?
        <div> Welcome </div> :
        <Login />}
    </div>

  );
}
