import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router";
import { useCart } from "../context/CartContext";
import GoBackBtn from "../components/GoBackBtn";
import { auth, addOrder, generateSequentialOrderId, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { localitati } from "../localitati";
import OrderConfirmationModal from "../components/OrderConfirmationModal";

export default function Checkout() {
  const [user, setUser] = useState(null);
  const { cart, totalPrice, clearCart } = useCart();
  const [details, setDetails] = useState({
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
  const [voucherError, setVoucherError] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        setDetails((prev) => ({ ...prev, email: currentUser.email }));
      }
    });

    return () => unsubscribe();
  }, []);

  async function checkVoucher(voucherCode) {
    if (!voucherCode) {
      setVoucherError("");
      setDiscountPercent(0);
      return;
    }

    const vouchersRef = collection(db, "vouchers");
    const q = query(
      vouchersRef,
      where("name", "==", voucherCode.toLowerCase())
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      setDiscountPercent(data.percent || 0);
      setVoucherError("");
    } else {
      setDiscountPercent(0);
      setVoucherError("Cod voucher invalid");
    }
  }

  const deliveryFee = 9.99;
  const discountAmount = (totalPrice * discountPercent) / 100;
  const finalPrice = (totalPrice - discountAmount + deliveryFee).toFixed(2);

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
      total: finalPrice,
      userUID: user.uid,
      status: "În procesare",
    };

    const success = await addOrder(order);

    setIsSubmitting(false);
    if (success) {
      setDetails({
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
      <GoBackBtn className="bg-white rounded-2xl p-3 cursor-pointer mb-6 shadow" />

      <form className="flex flex-col lg:flex-row gap-8" onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full lg:w-2/3">
          <h1 className="text-2xl font-semibold mb-6 text-[var(--primary)]">
            Detalii pentru facturare
          </h1>

          <div className="space-y-4">
            <label key="email" className="block">
              <span className="font-medium">Email</span>
              <input
                className="border border-gray-300 p-2 w-full rounded mt-1 bg-gray-200 cursor-not-allowed"
                value={details.email}
                disabled
              />
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
                type="tel"
                pattern="0[0-9]{9}"
                onChange={(e) =>
                  setDetails({ ...details, telefon: e.target.value })
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
            {!voucherError ? (
              <p>
                Reducere:
                <span className="float-right">
                  {-((totalPrice * 15) / 100).toFixed(2)} lei
                </span>
              </p>
            ) : null}
            <p>
              Taxă livrare: <span className="float-right">9.99 lei</span>
            </p>
            <hr className="my-2" />
            <p className="font-bold">
              Total: <span className="float-right">{finalPrice} lei</span>
            </p>
          </div>

          <label className="block mt-6">
            <span className="font-medium">Cod reducere</span>
            <div className="flex gap-2 mt-1">
              <input
                className="border border-gray-300 p-2 rounded flex-grow"
                value={details.voucher}
                onChange={(e) =>
                  setDetails({ ...details, voucher: e.target.value.trim() })
                }
                placeholder="Introdu codul voucher"
              />
              <button
                type="button"
                className="bg-[var(--primary)] text-[var(--secondary)] px-4 rounded-2xl hover:bg-[var(--primary-darker)] transition"
                onClick={async () => {
                  await checkVoucher(details.voucher);
                }}
              >
                Aplică
              </button>
            </div>
            {voucherError ? (
              <span className="text-sm text-red-600 mt-1 inline-block">
                {voucherError}
              </span>
            ) : (
              discountPercent > 0 && (
                <span className="text-sm text-green-600 mt-1 inline-block">
                  Voucher aplicat: {discountPercent}% reducere
                </span>
              )
            )}
          </label>

          <button
            type="submit"
            className="mt-6 w-full bg-[var(--primary)] text-[var(--secondary)] p-4 rounded-2xl font-medium hover:bg-[var(--primary-darker)] transition disabled:opacity-50"
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
