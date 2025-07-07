import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router";
import { useCart } from "../context/CartContext";
import GoBackBtn from "../components/GoBackBtn";
import { auth, addOrder, generateSequentialOrderId } from "../firebase";
import { localitati } from "../localitati";
import OrderConfirmationModal from "../components/OrderConfirmationModal";

export default function Checkout() {
  const [user, setUser] = useState(null);
  const { cart, totalPrice, clearCart } = useCart();
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
  const [orderSent, setOrderSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastOrderId, setLastOrderId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  function handleJudetChange(e) {
    const newJudet = e.target.value;
    setDetails({
      ...details,
      judet: newJudet,
      localitate: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const orderId = await generateSequentialOrderId();

    const order = {
      orderId: orderId,
      clientDetails: details,
      cart,
      total: (totalPrice + 9.99).toFixed(2),
      userUID: user.uid,
      status: "În procesare",
    };

    const success = await addOrder(order);

    setIsSubmitting(false);
    if (success) {
      setDetails({
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
      clearCart();
      setShowModal(true);
      setOrderSent(true);
      setLastOrderId(orderId);
    } else {
      alert("A apărut o eroare la trimiterea comenzii.");
    }
  }

  if (cart.length === 0 && !orderSent) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <GoBackBtn className="bg-white rounded-4xl p-3 cursor-pointer mb-6 shadow" />

      <form className="flex flex-col lg:flex-row gap-8" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-2/3">
          <h1 className="text-2xl font-semibold mb-6 text-[var(--primary)]">
            Detalii pentru facturare
          </h1>

          <div className="space-y-4">
            <label className="block">
              <span className="font-medium">Tip client*</span>
              <select
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details.tipClient}
                onChange={(e) =>
                  setDetails({ ...details, tipClient: e.target.value })
                }
                required
              >
                <option value="">Selectează</option>
                <option value="pf">Persoană fizică</option>
                <option value="pj">Persoană juridică</option>
              </select>
            </label>

            <label key="nume" className="block">
              <span className="font-medium">Nume*</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["nume"]}
                onChange={(e) =>
                  setDetails({ ...details, nume: e.target.value })
                }
                required
              />
            </label>

            <label key="prenume" className="block">
              <span className="font-medium">Prenume*</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["prenume"]}
                onChange={(e) =>
                  setDetails({ ...details, prenume: e.target.value })
                }
                required
              />
            </label>

            <label key="telefon" className="block">
              <span className="font-medium">Telefon*</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["telefon"]}
                onChange={(e) =>
                  setDetails({ ...details, telefon: e.target.value })
                }
                required
              />
            </label>

            <label key="email" className="block">
              <span className="font-medium">Email</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["email"]}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                required
              />
            </label>

            <label key="judet" className="block">
              <span className="font-medium">Județ*</span>
              <select
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details.judet}
                onChange={handleJudetChange}
                required
              >
                <option value="">Selectează județul</option>
                {Object.keys(localitati).map((judet) => (
                  <option key={judet} value={judet}>
                    {judet}
                  </option>
                ))}
              </select>
            </label>

            <label key="localitate" className="block">
              <span className="font-medium">Localitate/Municipiu*</span>
              <select
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details.localitate}
                onChange={(e) =>
                  setDetails({ ...details, localitate: e.target.value })
                }
                required
                disabled={!details.judet}
              >
                <option value="">Selectează localitatea</option>
                {details.judet &&
                  localitati[details.judet].map((localitate) => (
                    <option key={localitate} value={localitate}>
                      {localitate}
                    </option>
                  ))}
              </select>
            </label>

            <label key="strada" className="block">
              <span className="font-medium">Strada*</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["strada"]}
                onChange={(e) =>
                  setDetails({ ...details, strada: e.target.value })
                }
                required
              />
            </label>

            <label key="numar" className="block">
              <span className="font-medium">Număr, bloc, scară, ap.*</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1"
                value={details["numar"]}
                onChange={(e) =>
                  setDetails({ ...details, numar: e.target.value })
                }
                required
              />
            </label>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-1/3 h-fit">
          <h2 className="text-xl font-semibold mb-4">Rezumat comandă</h2>
          <div className="space-y-2 text-lg">
            <p>
              Subtotal: <span className="float-right">{totalPrice} lei</span>
            </p>
            <p>
              Taxă livrare: <span className="float-right">9.99 lei</span>
            </p>
            <hr className="my-2" />
            <p className="font-bold">
              Total:{" "}
              <span className="float-right">
                {(totalPrice + 9.99).toFixed(2)} lei
              </span>
            </p>
          </div>

          <label className="block mt-6">
            <span className="font-medium">Cod reducere</span>
            <input
              className="border border-gray-300 p-2 w-full rounded mt-1"
              value={details.voucher}
              onChange={(e) =>
                setDetails({ ...details, voucher: e.target.value })
              }
            />
            <span className="text-sm text-gray-500 mt-1 inline-block">
              Cod valid/invalid
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 w-full bg-[var(--primary)] text-[var(--secondary)] p-4 rounded-3xl font-medium hover:bg-[var(--primary-darker)] transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Se procesează..." : "Trimite comanda"}
          </button>
        </div>
      </form>

      <OrderConfirmationModal
        isOpen={showModal}
        setIsOpen={setShowModal}
        orderId={lastOrderId}
      />
    </div>
  );
}
