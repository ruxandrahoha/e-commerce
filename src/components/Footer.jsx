import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary)] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-center md:items-start gap-6">
        <div className="max-w-xs text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Logo Librarie</h2>
          <h3 className="font-semibold mb-1">Contact</h3>
          <p>
            Telefon:{" "}
            <a href="tel:+40123456789" className="hover:text-gray-300">
              +40 123 456 789
            </a>
          </p>
          <p>Adresă: Bd. Vasile Pârvan nr.4</p>
        </div>

        <div className="max-w-xs text-center md:text-left">
          <h3 className="font-semibold mb-2">Link-uri</h3>
          <ul>
            <li>
              <Link to="/privacy-policy" className="hover:text-gray-300">
                Politică de confidențialitate
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-gray-300">
                Termeni și condiții
              </Link>
            </li>
          </ul>

          <div className="mt-4 flex justify-start space-x-4 text-white text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-gray-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-gray-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-gray-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gray-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-gray-300"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-300">
        © Ruxandra Hoha 2025
      </div>
    </footer>
  );
}
