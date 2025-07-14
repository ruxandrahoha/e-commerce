import { Link } from "react-router";
import {
  HiSparkles,
  HiBookOpen,
  HiHeart,
  HiTruck,
  HiShieldCheck,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";
import heroImage from "../assets/hero-image.jpg";

export default function Home() {
  return (
    <div className="min-h-screen bg-(--secondary)">
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-accent-700 font-medium">
                  <HiSparkles className="w-5 h-5" />
                  <span>Descoperă lumea cărților</span>
                </div>
                <h1 className="font-serif text-5xl font-bold leading-tight text-(--primary)">
                  Cărți pentru toți,
                  <br />
                  <span className="text-accent-700">la un click distanță</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed max-w-lg">
                  Explorează colecția noastră vastă de cărți selectate cu grijă.
                  De la bestseller-uri la comori literare, găsești tot ce îți
                  dorești pentru următoarea ta aventură de lectură.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/products">
                  <button className="w-full sm:w-auto bg-(--primary) hover:bg-accent-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 cursor-pointer shadow-xl flex items-center justify-center space-x-2">
                    <HiBookOpen className="w-5 h-5" />
                    <span>Explorează cărțile</span>
                  </button>
                </Link>
                <Link to="/wishlist">
                  <button className="w-full sm:w-auto bg-white hover:bg-accent-800 text-neutral-800 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 cursor-pointer shadow-xl flex items-center justify-center space-x-2">
                    <HiHeart className="w-5 h-5" />
                    <span>Lista de dorințe</span>
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent-200/30 rounded-3xl blur-3xl"></div>
              <img
                className="relative w-full max-w-lg mx-auto"
                src={heroImage}
                alt="Colecție de cărți"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 min-w-full bg-[#a998b0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              De ce să alegi librăria noastră?
            </h2>
            <p className="text-base text-neutral-700 max-w-2xl mx-auto px-4">
              Oferim o experiență de cumpărare unică, cu servicii de calitate și
              o selecție atent curată
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-white">
            <div className="text-center p-8 rounded-2xl bg-(--primary) text-white hover:bg-primary-100 transition-all group shadow-lg/30">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 transition-transform">
                <HiBookOpen className="w-10 h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Selecție vastă
              </h3>
              <p className="text-sm sm:text-base---------">
                Peste 10.000 de titluri din toate genurile, de la clasici la
                noutăți editoriale
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl text-white bg-(--primary) hover:bg-primary-100 transition-all group shadow-lg/30">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 transition-transform">
                <HiShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Calitate garantată
              </h3>
              <p className="text-sm sm:text-base">
                Toate cărțile sunt noi, în stare perfectă și livrate cu grijă
                maximă
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl text-white bg-(--primary) transition-all group shadow-lg/30">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 transition-transform">
                <HiTruck className="w-10 h-10" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Livrare rapidă
              </h3>
              <p className="text-sm sm:text-base">
                Livrăm în toată țara în 2-3 zile lucrătoare, cu opțiuni de
                livrare flexibile
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-15 pt-30 px-6 bg-accent-700 text-(--primary)">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Începe-ți călătoria literară astăzi
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-8 text-accent-100 px-4">
            Descoperă cărți care îți vor schimba perspectiva și îți vor îmbogăți
            viața
          </p>
          <Link to="/products">
            <button className="bg-white text-accent-700 cursor-pointer px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-lg/10">
              Vezi toate cărțile
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
