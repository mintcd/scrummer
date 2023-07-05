import '@styles/global.css'
import { Inter } from 'next/font/google'
// import Nav from '../components/Nav'

export const metadata = {
  title: 'Learn Scrum',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" rel="preload">
      <body className=''>
        <div className="gradient"></div>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}
