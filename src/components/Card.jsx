import React from "react"
import { Link } from "react-router"

export default function Card({author, title, price, image}) {
    return (
        <Link to="" className="w-96 h-[250px]">
            <img className="bg-white" src={image} alt={`Cover of ${title}`}></img>
            <h1 className="">{title}</h1>
            <h2 className="">{author}</h2>
            <div className="flex justify-between">
                <p className="">{price}</p>
                <button className="">+</button>
            </div>
            
        </Link>
    )
}