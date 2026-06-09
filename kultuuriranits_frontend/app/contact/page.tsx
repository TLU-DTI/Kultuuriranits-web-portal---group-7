import { ContactForm } from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <main style={{ padding: "40px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Kontakt</h1>

      <p>E-post: info@kultuuriranits.ee</p>
      <p>Telefon: +372 500 0000</p>
      <p>Aadress: Narva mnt 1, 10151 Tallinn</p>
      <p>Tööaeg: E–R 9:00–17:00</p>

      {/* Emaili saatmise vorm */}
      <ContactForm />
    </main>
  );
}