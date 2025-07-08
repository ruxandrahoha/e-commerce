export default function TermsAndConditions() {
  return (
    <div className="flex flex-col justify-center items-center px-6 py-12">
      <section className="max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Termeni și condiții
        </h1>
        <ol className="list-decimal list-inside space-y-6 text-gray-700 leading-relaxed">
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">Produse</p>
            <p>Site-ul nostru oferă spre vânzare exclusiv cărți.</p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">
              Destinatari
            </p>
            <p>
              Produsele sunt destinate exclusiv consumatorilor finali din
              România.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">Livrare</p>
            <p>
              Comenzile sunt procesate și livrate în termen de 3-7 zile
              lucrătoare, în funcție de disponibilitatea produselor și zona de
              livrare. Costurile și modalitățile de livrare vor fi comunicate în
              pagina de checkout.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">
              Retur și rambursare
            </p>
            <p>
              Ai dreptul să returnezi produsele în termen de 14 zile
              calendaristice de la primirea comenzii, fără a oferi un motiv,
              conform legislației în vigoare. Pentru retur, produsele trebuie să
              fie în stare originală, nedeteriorate și neutilizate. Costurile
              returului pot fi suportate de client, conform detaliilor afișate
              în politica de retur.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">
              Protecția datelor
            </p>
            <p>
              Respectăm normele GDPR privind protecția datelor personale. Datele
              colectate sunt folosite exclusiv pentru procesarea comenzilor și
              comunicarea cu clienții. Pentru mai multe informații, consultă
              Politica noastră de Confidențialitate.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">
              Disclaimer
            </p>
            <p>
              Acest site este un demo creat pentru scopuri de prezentare și
              testare. Nu sunt acceptate comenzi reale, iar tranzacțiile
              efectuate nu au valoare comercială.
            </p>
          </li>
          <li>
            <p className="inline font-semibold mb-1 text-gray-900">
              Legea aplicabilă
            </p>
            <p>
              Acești Termeni și Condiții sunt guvernați de legislația din
              România.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
