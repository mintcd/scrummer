'use client'

import { useEffect, useState } from 'react';

export default function Activate() {
  const [status, setStatus] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const api = `${url.origin}/api/activate/${url.pathname.substring(url.pathname.lastIndexOf('/') + 1)}`;
      try {
        const response = await fetch(api, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        console.log(data);
        if (data.status === 200) {
          setStatus(200)
          window.location.href = '/'
        } else {
          setStatus(300)
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {status == 200 && <div> Your account has been activated. Redirecting to homepage... </div>}
      {status == 300 && <div> Link expired </div>}
    </div>

  );
}

