import Feed from '@components/Feed'

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Computer Science Blocks
        <br className="max-md:hidden" />
        <span className="orange_gradient"> Principles that construct the Computer-assisted Era </span>
      </h1>
      <p> A paragraph here </p>

      <Feed />
    </section>
  )
}