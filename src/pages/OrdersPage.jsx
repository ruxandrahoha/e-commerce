import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { Navigate } from "react-router";
import GoBackBtn from "../components/GoBackBtn";
import Spinner from "../components/Spinner";

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) return setUser(null);

      setUser(currentUser);
      const q = query(
        collection(db, "orders"),
        where("userUID", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (!user && !loading) {
    return <Navigate to="/login" />;
  }

  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <GoBackBtn className="bg-white rounded-4xl p-3 cursor-pointer mb-6 shadow" />

      <h1 className="text-2xl font-semibold text-[var(--primary)] mb-6">
        Comenzile mele
      </h1>

      {orders.length === 0 ? (
        <p>Nu ai nicio comandă înregistrată.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-[var(--primary)]">
                  Comanda #{order.orderId}
                </h2>
                <p className="text-gray-600">
                  Status:
                  <span
                    className={`pl-1 rounded-xl bg-white font-semibold ${
                      order.status === "Confirmata"
                        ? "text-green-500"
                        : order.status === "Anulata"
                        ? "text-red-500"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                Data:{" "}
                {new Intl.DateTimeFormat("ro-RO", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(order.createdAt.toDate())}
              </p>

              <p className="text-sm text-gray-600 mb-2">Produse:</p>
              <ul className="list-disc pl-6 mb-2 text-sm">
                {order.cart.map((item, i) => (
                  <li key={i}>
                    {item.title} – {item.quantity} x {item.price} lei
                  </li>
                ))}
              </ul>
              <p className="font-semibold text-right">
                Total: {order.total} lei
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
