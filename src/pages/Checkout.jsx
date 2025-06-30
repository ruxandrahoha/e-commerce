import React, { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";
import myImage from "../assets/temporaryImage.jpeg";
import GoBackBtn from "../components/GoBackBtn";

export default function Checkout() {
  const { cart, totalPrice } = useCart();
  const [details, setDetails] = useState({
    tipClient: "",
    nume: "",
    prenume: "",
    judet: "",
    localitate: "",
    strada: "",
    numar: "",
    telefon: "",
    email: "",
    voucher: "",
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-sm mx-auto text-center">
        <p className="p-8 w-full text-3xl font-serif mt-20">
          Coșul dvs. este gol.
        </p>
        <Link to="/products">
          <button className="bg-(--primary) text-(--secondary) px-6 py-3 rounded-4xl cursor-pointer">
            Începeți cumpărăturile
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <GoBackBtn className="bg-white rounded-4xl p-3 cursor-pointer" />
      <div className="flex justify-around">
        <div className="bg-white p-4 flex flex-col">
          <h1 className="text-lg font-bold">Detalii pentru facturare</h1>

          <label className="mb-3">
            <span className="font-medium mb-1">Tip client*</span>
            <select className="border-1 border-gray-500 p-1 w-full rounded">
              <option value="pf">Persoană fizică</option>
              <option value="pj">Persoană juridică</option>
            </select>
          </label>

          <label className="mb-3">
            <span className="font-medium mb-1">Nume*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.nume}
              onChange={(e) => setDetails({ ...details, nume: e.target.value })}
              required
            />
          </label>
          <label className="mb-3">
            <span className="font-medium mb-1">Preume*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.prenume}
              onChange={(e) =>
                setDetails({ ...details, prenume: e.target.value })
              }
              required
            />
          </label>
          <label className="mb-3">
            <span className="font-medium mb-1">Judet*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.judet}
              onChange={(e) =>
                setDetails({ ...details, judet: e.target.value })
              }
              required
            />
          </label>
          <label className="mb-3">
            <span className="font-medium mb-1">Localitate/Municipiu*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.localitate}
              onChange={(e) =>
                setDetails({ ...details, localitate: e.target.value })
              }
              required
            />
          </label>
          <label className="mb-3">
            <span className="font-medium mb-1">Strada*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.strada}
              onChange={(e) =>
                setDetails({ ...details, strada: e.target.value })
              }
              required
            />
          </label>
          <label className="mb-3">
            <span className="font-medium mb-1">Numar, bloc, scara, ap*</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.numar}
              onChange={(e) =>
                setDetails({ ...details, numar: e.target.value })
              }
              required
            />
          </label>
        </div>
        <div className="bg-white p-2">
          <p>Subtotal: {totalPrice} lei</p>
          <p>Taxă de livrare: 9.99 lei</p>
          <hr />
          <p>Total: {totalPrice + 9.99} lei</p>
          <label className="mb-3">
            <span className="font-medium mb-1">Cod reducere</span>
            <input
              className="border-1 border-gray-500 p-1 w-full rounded"
              value={details.voucher}
              onChange={(e) =>
                setDetails({ ...details, voucher: e.target.value })
              }
              required
            />
            <span>Cod valid/invalid</span>
          </label>
          <Link to="">
            <button className=" bg-(--primary) text-(--secondary) p-4 rounded-4xl hover:bg-(--primary-darker) cursor-pointer">
              Mergi către plată
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
