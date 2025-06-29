import { useState } from "react"
import LogoutModal from "./LogoutModal"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function LogoutButton({ className }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const { logout } = useAuth()
    
    async function handleLogout() {
        try {
            await logout()
            toast.success("Te-ai deconectat cu succes.")
            navigate("/")
        }
        catch(err) {
            toast.error(`A aparut o eroare la deconectare: + ${err.message}`)
        }
    }
    
    return (
        <>
            <button className={className} onClick={() => setIsModalOpen(true)}>Deconectare</button>
            <LogoutModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    setIsModalOpen(false)
                    handleLogout()
                }}
            />
        </>
    )
}