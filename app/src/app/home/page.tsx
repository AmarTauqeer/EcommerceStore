'use client'
import Hero from "../components/Hero";
const Home = () => {
  return (
    <>
        <div className="flex flex-col justify-items-center bg-slate-50">
          <div className="flex flex-col">
            <Hero />
            <h2 className="py-10 text-center font-semibold">Welcome  to E-commerce Application Demo</h2>
          </div>
        </div>
    </>
  )
}

export default Home
