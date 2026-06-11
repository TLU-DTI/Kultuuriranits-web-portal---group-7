import { ContactForm } from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[80vh] flex flex-col justify-center">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Kontakt
        </h1>
        <p className="text-lg text-gray-600">
          Küsimuste või ettepanekute korral kirjuta meile otse või kasuta mugavat kontaktivormi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="font-extrabold text-xl text-gray-900 mb-4">
              Kultuuriministeeriumi üldkontakt
            </h2>
            <div className="space-y-3 text-gray-600 text-sm pl-4 border-l-2 border-blue-600">
              <p>
                <span className="font-semibold text-gray-900">Telefon:</span> +372 628 2222
              </p>
              <p>
                <span className="font-semibold text-gray-900">E-post:</span>{" "}
                <a href="mailto:min@kul.ee" className="text-blue-600 hover:underline">
                  min@kul.ee
                </a>
              </p>
              <p>
                <span className="font-semibold text-gray-900">Aadress:</span> Suur-Karja 23, 15076 Tallinn
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="font-extrabold text-xl text-gray-900">
              Annikki Aruväli
            </h2>
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mt-1 mb-4">
              Kultuurihariduse ja ligipääsetavuse nõunik
            </p>
            <div className="space-y-3 text-gray-600 text-sm pl-4 border-l-2 border-blue-600">
              <p>
                <span className="font-semibold text-gray-900">Telefon:</span> +372 5199 6885
              </p>
              <p>
                <span className="font-semibold text-gray-900">E-post:</span>{" "}
                <a href="mailto:annikki.aruvali@kul.ee" className="text-blue-600 hover:underline">
                  annikki.aruvali@kul.ee
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-2xl p-8 sm:p-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Saada meile sõnum</h2>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}