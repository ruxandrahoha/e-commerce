import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import { useNavigate } from "react-router";

export default function OrderConfirmationModal({ isOpen, setIsOpen, orderId }) {
  const navigate = useNavigate();

  function closeModalAndRedirect() {
    setIsOpen(false);
    navigate("/orders");
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Mulțumim pentru comandă!
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Comanda ta a fost înregistrată cu succes.
                    <br />
                    Număr comandă:{" "}
                    <span className="font-semibold">{orderId}</span>
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-2xl border border-transparent bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--primary-darker)]"
                    onClick={closeModalAndRedirect}
                  >
                    Vezi comenzile mele
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
