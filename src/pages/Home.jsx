import heroImage from "../assets/hero-image.jpg"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-full mx-auto text-5xl"> 
      <div className="flex flex-col gap-10 items-start">
        <h1 className="font-serif">
          Cărți pentru toți, <br/>
          la un click distanță
        </h1>
        <p className="text-lg max-w-150">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim sit lor consectetur amer ad minim veniam. 
        </p>
        <button className="text-lg bg-[#6a5478] rounded-3xl text-[#feeae3] mx-auto p-3">
          Începe cumpărăturile
        </button>
      </div>
      <div>
        <img className="max-w-[500px]" src={heroImage} alt=""></img>
      </div>
    </div>
  )
}
