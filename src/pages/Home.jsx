import { Link } from "react-router"
import heroImage from "../assets/hero-image.jpg"

export default function Home() {
  return (
    <div className="flex justify-center gap-20 pt-30 h-full mx-auto                                                                                                                                                                                                                                                               text-5xl"> 
      <div className="flex flex-col gap-5 items-start">
        <h1 className="font-serif text-(--primary-darker)">
          Cărți pentru toți, <br/>
          la un click distanță
        </h1>
        <p className="text-lg max-w-130">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. 
        </p>
        <Link to="/products" className="">
          <button className="text-xl bg-(--primary) rounded-4xl text-(--secondary) mx-auto mt-12 py-3 px-6 cursor-pointer hover:bg-(--primary-darker)">
            Începe cumpărăturile
          </button>
        </Link>
      </div>
      <div>
        <img className="max-w-[500px]" src={heroImage} alt=""></img>
      </div>
    </div>
  )
}
