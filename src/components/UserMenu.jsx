import { NavLink } from "react-router"
import { useAuth } from "../context/AuthContext"
import { Popover, PopoverButton, PopoverPanel} from "@headlessui/react"
import { IoChevronDown } from "react-icons/io5"
import LogoutButton from "./LogoutButton"

export default function UserMenu() {
    
    const { loggedUser } = useAuth()

    if (loggedUser) {
        return (
        <Popover className="relative inline-block">
            <PopoverButton className="flex items-center gap-1 px-4 py-2 mx-2 font-semibold text-(--secondary) hover:underline focus:outline-none">
                Bun venit, {loggedUser.displayName || "user"}!
                <IoChevronDown size={20}/>
            </PopoverButton>

            <PopoverPanel className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-xl p-2 z-50 border-2 border-(--primary)">
            <NavLink
                to="/dashboard"
                className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition mb-2"
            >
                Dashboard
            </NavLink>
            <LogoutButton
                className="block w-full text-center px-4 py-2 bg-(--secondary) text-(--primary) hover:bg-(--primary) hover:text-(--secondary) rounded-md transition cursor-pointer"
            />
            </PopoverPanel>
        </Popover>
        )
  }

  return (
    <NavLink
      className="px-4 py-2 text-(--secondary) mx-2 font-medium hover:underline"
      to="/login"
    >
      Autentificare
    </NavLink>
  )
}
