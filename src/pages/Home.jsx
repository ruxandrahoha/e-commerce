import { Link } from "react-router";
import { HiSparkles, HiBookOpen, HiHeart } from "react-icons/hi2";
import heroImage from "../assets/hero-image.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-accent font-medium">
                  <HiSparkles className="w-5 h-5" />
                  <span>Descoperă lumea cărților</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="warm-gradient-text">Cărți pentru</span>
                  <br />
                  <span className="text-neutral-800">suflet și minte</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed max-w-lg">
                  Explorează colecția noastră vastă de cărți selectate cu grijă. 
                  De la bestseller-uri la comori literare, găsești tot ce îți dorești 
                  pentru următoarea ta aventură de lectură.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="group">
                  <button className="btn-primary group-hover:animate-glow">
                    <span className="flex items-center space-x-2">
                      <HiBookOpen className="w-5 h-5" />
                      <span>Explorează cărțile</span>
                    </span>
                  </button>
                </Link>
                <Link to="/wishlist">
                  <button className="btn-secondary">
                    <span className="flex items-center space-x-2">
                      <HiHeart className="w-5 h-5" />
                      <span>Lista de dorințe</span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-3xl"></div>
              <img 
                className="relative w-full max-w-lg mx-auto rounded-3xl shadow-2xl book-shadow" 
                src={heroImage} 
                alt="Colecție de cărți"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">
              De ce să alegi librăria noastră?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Oferim o experiență de cumpărare unică, cu servicii de calitate și o selecție atent curată
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <HiBookOpen className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Selecție vastă</h3>
              <p className="text-neutral-600">
                Peste 10.000 de titluri din toate genurile, de la clasici la noutăți editoriale
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <HiSparkles className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Calitate garantată</h3>
              <p className="text-neutral-600">
                Toate cărțile sunt noi, în stare perfectă și livrate cu grijă maximă
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all card-hover">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-glow">
                <HiHeart className="w-8 h-8 text-primary-dark" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-4">Pasiune pentru cărți</h3>
              <p className="text-neutral-600">
                Echipa noastră de bibliofili te ajută să găsești cartea perfectă pentru tine
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Începe-ți călătoria literară astăzi
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Descoperă cărți care îți vor schimba perspectiva și îți vor îmbogăți viața
          </p>
          <Link to="/products">
            <button className="btn-accent text-lg px-8 py-4">
              Vezi toate cărțile
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}