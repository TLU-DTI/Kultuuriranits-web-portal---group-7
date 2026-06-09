export default function ContactPage() {
  return (
    <main>
      <h1>Kontakt</h1>

      <p>E-post: info@kultuuriranits.ee</p>
      <p>Telefon: +372 500 0000</p>
      <p>Aadress: Narva mnt 1, 10151 Tallinn</p>
      <p>Tööaeg: E–R 9:00–17:00</p>

      <div>
        <label htmlFor="name">Nimi  </label>
        <input id="name" type="text" placeholder="Sinu nimi" />
      </div>

      <div>
        <label htmlFor="email">E-post  </label>
        <input id="email" type="email" placeholder="sinu@email.ee" />
      </div>

      <div>
        <label htmlFor="subject">Teema  </label>
        <input id="subject" type="text" placeholder="Millest soovid kirjutada?" />
      </div>

      <div>
        <label htmlFor="message">Sõnum  </label>
        <textarea id="message" rows={5} placeholder="Kirjuta oma sõnum siia..." />
      </div>

      <button>Saada sõnum</button>
    </main>
  );
}
