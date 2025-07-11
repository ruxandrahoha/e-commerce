import React from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { getAuth } from "firebase/auth";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi2";

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
      <div className="min-h-screen bg-primary-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-medium max-w-md">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Coșul dvs. este gol
          </h2>
          <p className="text-neutral-600 mb-8">
            Adăugați câteva cărți minunate pentru a începe
          </p>
          <Link to="/products">
            <button className="bg-accent-700 hover:bg-accent-800 text-white px-8 py-4 rounded-2xl font-semibold transition-colors">
              Începe cumpărăturile
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-100 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-medium overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-8">Coșul de cumpărături</h1>
            
            {/* Cart Items */}
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-6 p-6 bg-neutral-50 rounded-2xl"
                >
                  <img
                    src={item.image}
                    alt={`Coperta cartii ${item.title}`}
                    className="w-20 h-24 object-cover rounded-lg shadow-soft"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">de {item.author}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-1">Preț unitar</p>
                    <p className="font-semibold text-neutral-900">{item.price} lei</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      className="p-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      <HiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      className="p-2 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 transition-colors"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <HiPlus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-neutral-500 mb-1">Total</p>
                    <p className="font-bold text-accent-700">{item.price * item.quantity} lei</p>
                  </div>

                  <button
                    className="p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <HiTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 border-t pt-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-neutral-600">Preț fără TVA:</span>
                <span className="text-lg font-semibold">
                  {Math.round((totalPrice / 1.19) * 100) / 100} lei
                </span>
              </div>
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-semibold text-neutral-900">Preț total:</span>
                <span className="text-2xl font-bold text-accent-700">{totalPrice} lei</span>
              </div>
              
              <button
                onClick={handleOrderClick}
                className="w-full bg-accent-700 hover:bg-accent-800 text-white py-4 rounded-2xl font-semibold text-lg transition-colors"
              >
                Plasează comanda
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}