export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-12">
      <section className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Politica de Confidențialitate
        </h1>
        <ol className="list-decimal list-inside space-y-6 text-gray-800">
          <li>
            <p className="inline font-semibold mb-2">Date colectate</p>
            <p>
              Colectăm următoarele informații prin formularul de checkout: nume,
              prenume, județ, localitate, stradă și număr, telefon, email.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-2">
              Scopul colectării datelor
            </p>
            <p>
              Datele sunt folosite exclusiv pentru procesarea comenzilor plasate
              pe site. Menționăm că acest site este un demo, deci comenzile nu
              sunt reale.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-2">Servicii terțe</p>
            <p>
              Folosim Firebase pentru gestionarea datelor și funcționalităților
              site-ului.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-2">Protecția datelor</p>
            <p>
              Depunem toate eforturile pentru a păstra datele tale în siguranță,
              însă acest site este un demo și nu colectează date reale în scop
              comercial.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-2">
              Drepturile utilizatorilor
            </p>
            <p>
              Ai dreptul să ne contactezi la adresa de email{" "}
              <a
                href="mailto:ruxandra.hoha@gmail.com"
                className="underline hover:text-gray-600"
              >
                ruxandra.hoha@gmail.com
              </a>{" "}
              pentru a cere acces, corectare sau ștergere a datelor tale
              personale.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-2">Cookies</p>
            <p>Site-ul nu folosește cookies.</p>
          </li>
        </ol>
      </section>
    </div>
  );
}
