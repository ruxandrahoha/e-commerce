import React, { useState } from "react"
import { useCart } from "../context/CartContext"
import myImage from "../assets/temporaryImage.jpeg"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return <p className="bg-blue-200 max-w-sm rounded-xl shadow-lg mx-auto text-center p-8 w-full text-xl font-serif mt-20">Coșul dvs. este gol.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-4 px-4">
        <div className="w-24 h-6" />
        <div className="flex-1 min-w-[150px] font-bold text-gray-700 ml-12">Produs</div>
        <div className="w-24 text-center text-sm text-gray-500">preț unitar</div>
        <div className="w-32 text-center text-sm text-gray-500">cantitate</div>
        <div className="w-24 text-center text-sm text-gray-500">total</div>
        <div className="w-16" />
      </div>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center border-2 border-blue-300 p-4 rounded-3xl bg-white gap-4">
          <img
            src={myImage}
            alt={`Coperta cartii ${item.title}`}
            className="w-24 h-24 object-cover rounded-md"
          />

          <div className="flex-1 min-w-[150px]">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">de {item.author}</p>
          </div>

          <div className="w-24 text-center">
            <p className="font-bold">{item.price} lei</p>
          </div>

          <div className="w-32 flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-300 px-2 rounded cursor-pointer"
                onClick={() => {
                  if (item.quantity > 1) {
                    updateQuantity(item.id, item.quantity - 1);
                  }
                }}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                className="w-10 text-center border rounded"
                value={item.quantity}
                onChange={e => {
                  const val = Number(e.target.value);
                  if (val >= 1) updateQuantity(item.id, val);
                }}
              />
              <button
                className="bg-gray-300 px-2 rounded cursor-pointer"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="w-24 text-center">
            <p className="font-bold">{item.price * item.quantity} lei</p>
          </div>

          <div className="w-16 text-center">
            <button
              className="bg-red-400 opacity-90 text-white  px-3 py-2 rounded-lg hover:bg-red-500 cursor-pointer"
              onClick={() => removeFromCart(item.id)}
            >
              ✕
            </button>
          </div>
        </li>
        ))}
      </ul>
      <div>
        <h1 className="text-2xl font-bold mb-2 text-right mt-6">
          Preț fără TVA: {Math.round(totalPrice/1.19*100)/100} lei
        </h1>
        <h1 className="text-2xl font-bold text-right">
          Preț total: {totalPrice} lei
        </h1>
      </div>
      <button className="flex justify-center bg-blue-300 rounded-2xl hover:bg-blue-400 hover:text-white transition cursor-pointer m-auto py-2 px-16 text-xl">
        Plasează comanda
      </button>
    </div>
  );
}
