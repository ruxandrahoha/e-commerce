import { useEffect, useState } from "react";
import { listenToAllOrders, updateOrderStatus } from "../firebase";
import Spinner from "../components/Spinner";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToAllOrders((fetchedOrders) => {
      setOrders(fetchedOrders);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    await updateOrderStatus(orderId, newStatus);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Toate comenzile plasate</h1>

      {orders.length === 0 ? (
        <p>Nu există comenzi.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const client = order.clientDetails || {};
            const fullName =
              [client.nume, client.prenume].filter(Boolean).join(" ") || "N/A";
            const email = client.email || "N/A";
            const total = order.total || "N/A";
            const createdAt =
              order.createdAt?.toDate().toLocaleString() || "N/A";
            const orderId = order.orderId || "N/A";
            const status = order.status || "În procesare";
            console.log("order.id:", order.id, "order.orderId:", order.orderId);

            return (
              <li
                key={order.id}
                className={`border p-4 rounded-xl shadow-sm bg-white ${
                  status === "Confirmata"
                    ? "border-green-500"
                    : status === "Anulata"
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <p>
                  <span className="font-bold">ID Comandă:</span>{" "}
                  <span className="text-gray-700">{orderId}</span>
                </p>
                <p>
                  <span className="font-bold">Nume client:</span>{" "}
                  <span className="text-gray-700">{fullName}</span>
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  <span className="text-gray-700">{email}</span>
                </p>
                <p>
                  <span className="font-bold">Total:</span>{" "}
                  <span className="text-gray-700">{total} lei</span>
                </p>
                <p>
                  <span className="font-bold">Data:</span>{" "}
                  <span className="text-gray-700">{createdAt}</span>
                </p>
                <p className="font-bold">Produse:</p>
                <ul className="list-disc ml-6 text-gray-700">
                  {(order.cart || []).map((item, index) => (
                    <li key={index}>
                      {item.title} – {item.quantity} x {item.price} lei
                    </li>
                  ))}
                </ul>
                <p>
                  <span className="font-bold">Status comanda:</span>{" "}
                  <span
                    className={`font-semibold ${
                      status === "Confirmata"
                        ? "text-green-600"
                        : status === "Anulata"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {status}
                  </span>
                </p>

                <div className="mt-4 flex gap-2">
                  {status === "În procesare" && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateStatus(order.id, "Confirmata")
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Confirmă comanda
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(order.id, "Anulata")}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Respinge comanda
                      </button>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
