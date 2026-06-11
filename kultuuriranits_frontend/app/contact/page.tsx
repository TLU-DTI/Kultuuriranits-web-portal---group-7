import { ContactForm } from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-center text-5xl font-bold mb-16">Kontakt</h1>

      {/* Kaks kontaktikaarti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

        <div className="border border-gray-200 rounded-xl p-8">
          <h2 className="font-bold text-xl mb-6">Kultuuriministeeriumi üldkontakt</h2>
          <p className="mb-4">+372 628 2222</p>
          <p className="mb-4">min@kul.ee</p>
          <p>Suur-Karja 23, 15076 Tallinn</p>
        </div>

        <div className="border border-gray-200 rounded-xl p-8">
          <h2 className="font-bold text-xl mb-6 text-center">Kultuurihariduse ja ligipääsetavuse nõunik</h2>
          <p className="mb-4">Annikki Aruväli</p>
          <p className="mb-4">+372 5199 6885</p>
          <p>annikki.aruvali@kul.ee</p>
        </div>

      </div>

      {/* Kontaktivorm kaardis */}
      <div className="border border-gray-200 rounded-xl p-8">
        <h2 className="font-bold text-xl mb-2">Kas soovid küsida midagi konkreetset?</h2>
        <p className="text-gray-500 text-sm mb-6">Täida allolev vorm ja vastame sulle esimesel võimalusel.</p>
        <ContactForm />
      </div>

    </main>
  );
}
