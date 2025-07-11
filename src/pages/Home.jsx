import { Link } from "react-router";
import { HiSparkles, HiBookOpen, HiHeart, HiTruck, HiShieldCheck, HiChatBubbleLeftRight } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-accent-700 font-medium">
                  <HiSparkles className="w-5 h-5" />
                  <span>Descoperă lumea cărților</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-neutral-900">
                  Cărți pentru
                  <br />
                  <span className="text-accent-700">suflet și minte</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Explorează colecția noastră vastă de cărți selectate cu grijă. 
                  De la bestseller-uri la comori literare, găsești tot ce îți dorești 
                  pentru următoarea ta aventură de lectură.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <button className="bg-accent-700 hover:bg-accent-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-medium flex items-center space-x-2">
                    <HiBookOpen className="w-5 h-5" />
                    <span>Explorează cărțile</span>
                  </button>
                </Link>
                <Link to="/wishlist">
                  <button className="bg-white hover:bg-neutral-50 text-neutral-800 px-8 py-4 rounded-2xl font-semibold transition-all border border-neutral-200 hover:border-accent-300 flex items-center space-x-2">
                    <HiHeart className="w-5 h-5" />
                    <span>Lista de dorințe</span>
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-accent-200/30 rounded-3xl blur-3xl"></div>
              <img 
                className="relative w-full max-w-lg mx-auto rounded-3xl shadow-large" 
                src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Colecție de cărți"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              De ce să alegi librăria noastră?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Oferim o experiență de cumpărare unică, cu servicii de calitate și o selecție atent curată
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-all group">
              <div className="w-16 h-16 bg-accent-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <HiBookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Selecție vastă</h3>
              <p className="text-neutral-600">
                Peste 10.000 de titluri din toate genurile, de la clasici la noutăți editoriale
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-all group">
              <div className="w-16 h-16 bg-accent-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <HiShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Calitate garantată</h3>
              <p className="text-neutral-600">
                Toate cărțile sunt noi, în stare perfectă și livrate cu grijă maximă
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-primary-50 hover:bg-primary-100 transition-all group">
              <div className="w-16 h-16 bg-accent-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <HiTruck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Livrare rapidă</h3>
              <p className="text-neutral-600">
                Livrăm în toată țara în 2-3 zile lucrătoare, cu opțiuni de livrare flexibile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-accent-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Începe-ți călătoria literară astăzi
          </h2>
          <p className="text-xl mb-8 text-accent-100">
            Descoperă cărți care îți vor schimba perspectiva și îți vor îmbogăți viața
          </p>
          <Link to="/products">
            <button className="bg-white text-accent-700 hover:bg-neutral-50 px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 shadow-medium">
              Vezi toate cărțile
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}