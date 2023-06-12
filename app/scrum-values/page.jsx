import Feed from '@components/Feed'
import Link from 'next/link'

export default function Page() {
  return (
    <section className="home-section">
      <h1 className="head_text text-center">
        Design Research
        <br className="max-md:hidden" />
        <span className="orange_gradient"> Principles and Practical UIs </span>
      </h1>
      {/* <p> A paragraph here </p> */}

      <Link href="/scrum-UI" className='flex gap-2 flex-center'>
        <p className='logo_text'> Checkout my new UI </p>
      </Link>

    </section>
  )
}