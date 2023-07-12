'use client'

import { getCookie, hasCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Login from "@components/login";
import Homepage from '@components/homepage';

export default function Home() {
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const [user, setUser] = useState(Object());

  useEffect(() => {
    async function verifyUser() {
      const cookieValue = getCookie('auth')
      console.log("Cookies", cookieValue)
      if (cookieValue) {
        try {
          const response = await axios.post("/api/verify", {
            cookie: cookieValue,
          });

          if (response.status === 200) {
            console.log(user)
            setUser(response.data.user);
            console.log("Verified", response.data.user)
            setVerificationStatus('verified');
          } else {
            setVerificationStatus('unverified');
          }
        } catch (error) {
          console.error('Error verifying user:', error);
          setVerificationStatus('error');
        }
      } else {
        setVerificationStatus('unverified');
      }
    }
    verifyUser();
  }, []);

  return (
    <div>
      {verificationStatus === 'loading' && <div> Imagine it is a loading spinner... </div>}
      {verificationStatus === 'verified' && <Homepage user={user} />}
      {verificationStatus === 'unverified' && <Login />}
      {verificationStatus === 'error' && <div>Error verifying user.</div>}
    </div>
  );
}
