import { Link } from "react-router";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-(--primary) text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-accent-400">
              Librărie
            </h2>
            <p className="text-neutral-300 mb-4">
              Destinația ta pentru cele mai bune cărți din toate genurile.
              Descoperă, citește, inspiră-te.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-accent-700 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <div className="space-y-2 text-neutral-300">
              <p>
                <span className="font-medium">Telefon:</span>{" "}
                <a
                  href="tel:+40123456789"
                  className="hover:text-accent-400 transition-colors"
                >
                  +40 123 456 789
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:contact@libraria.ro"
                  className="hover:text-accent-400 transition-colors"
                >
                  contact@libraria.ro
                </a>
              </p>
              <p>
                <span className="font-medium">Adresă:</span> Bd. Vasile Pârvan
                nr.4, București
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-lg">Link-uri utile</h3>
            <div className="space-y-2">
              <Link
                to="/privacy-policy"
                className="block text-neutral-300 hover:text-accent-400 transition-colors"
              >
                Politică de confidențialitate
              </Link>
              <Link
                to="/terms-and-conditions"
                className="block text-neutral-300 hover:text-accent-400 transition-colors"
              >
                Termeni și condiții
              </Link>
              <Link
                to="/products"
                className="block text-neutral-300 hover:text-accent-400 transition-colors"
              >
                Catalog cărți
              </Link>
              <Link
                to="/orders"
                className="block text-neutral-300 hover:text-accent-400 transition-colors"
              >
                Comenzile mele
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-(--secondary) pt-8 text-center">
          <p className="text-neutral-400">
            © 2025 Ruxandra Hoha. Toate drepturile rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
