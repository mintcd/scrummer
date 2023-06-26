import '@styles/globals.css'
import { Inter } from 'next/font/google'
// import Nav from '../components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Research on UI design',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=' bg-blue-100'>
        <main className='app'>
          {children}
        </main>
      </body>
    </html>
  )
}
