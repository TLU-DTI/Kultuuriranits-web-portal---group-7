import { ContactForm } from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-center text-5xl font-bold mb-16">Kontakt</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

        {/* Vasak veerg: kaks kontaktikaarti teineteise all */}
        <div className="flex flex-col gap-6">

          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-black text-lg text-gray-900 mb-5">Kultuuriministeeriumi üldkontakt</h2>

            <div className="space-y-4 border-l-2 border-blue-600 pl-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">Telefon:</span>
                <span className="text-gray-600">+372 628 2222</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">E-post:</span>
                <a href="mailto:min@kul.ee" className="text-blue-600 hover:underline">min@kul.ee</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">Aadress:</span>
                <span className="text-gray-600">Suur-Karja 23, 15076 Tallinn</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm p-6">
            <h2 className="font-black text-lg text-gray-900 mb-1">Annikki Aruväli</h2>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-5">
              Kultuurihariduse ja ligipääsetavuse nõunik
            </p>

            <div className="space-y-4 border-l-2 border-blue-600 pl-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">Telefon:</span>
                <span className="text-gray-600">+372 5199 6885</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">E-post:</span>
                <a href="mailto:annikki.aruvali@kul.ee" className="text-blue-600 hover:underline">annikki.aruvali@kul.ee</a>
              </div>
            </div>
          </div>

        </div>

        {/* Parem veerg: kontaktivorm */}
        <ContactForm />

      </div>
    </main>
  );
}