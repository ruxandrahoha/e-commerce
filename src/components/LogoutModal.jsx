import { Dialog, DialogPanel, DialogTitle, Description } from "@headlessui/react"

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <DialogPanel className="bg-white p-6 rounded-2xl shadow-lg z-50 max-w-sm w-full">
          <DialogTitle className="text-lg font-semibold mb-4">
            Confirmare deconectare
          </DialogTitle>
          <Description className="mb-6">
            Ești sigur/ă că vrei să te deconectezi?
          </Description>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              onClick={onClose}
            >
              Anulează
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              onClick={onConfirm}
            >
              Deconectează-te
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
