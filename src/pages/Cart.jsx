import React from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { getAuth } from "firebase/auth";

export default function Cart() {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const handleOrderClick = () => {
    if (!user) {
      navigate("/login", {
        state: { errorMessage: "Trebuie să aveți cont pentru a comanda" },
      });
    } else {
      navigate("/checkout");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-150 flex items-center justify-center">
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl shadow-lg max-w-md mx-4">
          <div className="text-4xl sm:text-6xl mb-6">🛒</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
            Coșul dvs. este gol
          </h2>
          <p className="text-neutral-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Adăugați câteva cărți pentru a începe
          </p>
          <Link to="/products">
            <button className="bg-(--primary) hover:bg-(--primary-darker) cursor-pointer text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-colors text-sm sm:text-base">
              Începe cumpărăturile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-4 px-4">
        <div className="w-24 h-6" />
        <div className="flex-1 min-w-[150px] font-bold text-gray-700 ml-12">
          Produs
        </div>
        <div className="w-24 text-center text-sm text-gray-500">
          preț unitar
        </div>
        <div className="w-32 text-center text-sm text-gray-500">cantitate</div>
        <div className="w-24 text-center text-sm text-gray-500">total</div>
        <div className="w-16" />
      </div>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center border-2 border-(--secondary) p-4 rounded-4xl bg-white gap-4"
          >
            <img
              src={item.image}
              alt={`Coperta cartii ${item.title}`}
              className="w-24 h-24 object-contain"
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
                  onChange={(e) => {
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
                className="bg-(--red) text-white px-3 py-2 rounded-4xl hover:bg-red-500 cursor-pointer"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h1 className="text-xl font-semibold mb-1 text-right mt-6">
          Preț fără TVA: {Math.round((totalPrice / 1.19) * 100) / 100} lei
        </h1>
        <h1 className="text-xl font-semibold mb-5 text-right">
          Preț total: {totalPrice} lei
        </h1>
      </div>
      <button
        onClick={handleOrderClick}
        className="flex justify-center bg-(--primary) rounded-4xl hover:bg-(--primary-darker) text-(--secondary) transition cursor-pointer m-auto py-2 px-16 text-xl"
      >
        Plasează comanda
      </button>
    </div>
  );
}
