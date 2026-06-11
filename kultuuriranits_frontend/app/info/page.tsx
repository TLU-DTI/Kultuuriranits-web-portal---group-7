export default function InfoPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* Pealkiri keskel */}
      <h1 className="text-center text-5xl font-bold mb-12">Info</h1>

      {/* Sissejuhatus */}
      <p className="mb-4">
        Kultuuriranits on Kultuuriministeeriumi eestvedamisel loodud toetusmeede, mille eesmärk on
        tagada laste ja noorte osalemine kultuurielus, kultuuri hindava publiku järelkasv ning
        soodsad tingimused kultuuris osalemiseks. Pearaha alusel määratud toetus võimaldab igal
        lapsel külastada kooli õppekavaga seotult vähemalt ühte kultuuriasutust aastas, aidates
        omandada nii riikliku õppekavaga ettenähtud ainepädevusi kui ka kasvada loovateks ja
        mitmekülgseteks isiksusteks.
      </p>
      <p className="mb-12">
        Iga kalendriaasta alguses liigub kultuuriranitsa toetus KOV toetusfondi kaudu koolidesse.
        2026. aasta toetus on samas eelarvemahus kui 2025. aastal ning on määratud igale Eesti
        1.–9. klassi õpilasele, sh hariduslike erivajadustega ning koduõppel olevatele õpilastele.
        Koolid peavad jälgima, et toetus jõuaks iga õpilaseni, kui õpilase elukoht ja üldine
        õppetöö korraldus seda võimaldab.
      </p>

      {/* Kolm veergu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        <div>
          <h2 className="font-bold text-lg mb-3">Kultuuriranits on mõeldud:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>õpilase mitmekülgse kultuurikogemuse teadlikuks ja süsteemseks kujundamiseks terve põhikooli õpikaare jooksul;</li>
            <li>laste ja noorte kultuurikogemuse suurendamiseks, st et valitud osa õppekavast omandatakse kultuuriasutustes;</li>
            <li>igale Eesti põhikoolis õppivale lapsele minimaalselt ühe kultuurikogemuse tagamiseks õppeaastas.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Toetusmeetme kasutamise tingimused:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>õppekäik peab toimuma kultuuri- või mäluasutusse (muuseumisse, teatrisse, kontserdile, kinno või näitusele, sh teadus- või elamuskeskustesse);</li>
            <li>toetatud on ka õppekäigud teistesse kultuuriasutustesse nagu raamatukogu, kultuurimaja, rahvamaja jne, eeldusel, et seal on korraldatud õpilastele suunatud ja õppekavaga seotud kultuuriüritus või haridusprogramm;</li>
            <li>kultuuriranitsa tegevustes osalemine on õpilasele kohustuslik, kuna on seotud õppekavaga;</li>
            <li>kool tohib kultuuriranitsa õppekäigule ise juurde maksta ja/või kombineerida muude toetusmeetmetega. Täpsemat infot leiab <a href="https://hm.ee/oppekavad#kas-klassis-voib-kog" className="underline">Haridus- ja teadusministeeriumi kodulehelt</a>;</li>
            <li>toetus sobib ka kultuuriasutuse külastuse transpordikulude katmiseks;</li>
            <li>ei tohi kasutada koolis kohapeal toimuvate kultuuriürituste, aktuste, vabatahtliku osalemisega klassiekskursioonide ega huvitegevuse puhul.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-3">Soovitused:</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Külastatavasse asutusse õppekäiku broneerides soovitame märkida, et külastuse eest tasumiseks kasutatakse Kultuuriranitsa toetusmeedet.</li>
            <li>
              Lisaks Kultuuriranitsa toetusmeetmele on koolil võimalik eraldi taotleda etenduskunstide
              regionaalse kättesaadavuse toetust <a href="https://rahvakultuur.ee/toetused/toetusmeetmed/etenduskunstide-regionaalse-kattesaadavuse-toetused-teater-maal/" className="underline">Teater maal</a> (alamsuund Lapsed teatrisse) teatrikülastuste transpordikulude katmiseks.
              Lapsed teatrisse toetuse tingimuste ja taotlemise kohta saab infot oma piirkonna <a href="https://rahvakultuur.ee/kontakt/" className="underline">rahvakultuurispetsialistilt</a>.
            </li>
          </ul>
        </div>

      </div>

      <hr className="mb-12" />

      {/* Lugemist */}
      <h2 className="font-bold text-xl mb-4">Lugemist:</h2>
      <p className="font-bold mb-2">
        Kultuuriminister eraldas erakorraliselt pool miljonit eurot laste ja noorte kultuurihariduse toetamiseks
      </p>
      <p className="mb-4">
        2026. aastaks eraldas kultuuriminister Heidy Purga erakorraliselt pool miljonit eurot kultuuri
        ja hariduse koostöö toetamiseks. Lisarahastuse eest saavad Kultuuriministeeriumi haldusala
        asutused pakkuda koolidele õppekavaga seotud tasuta kultuurikülastusi, et jätkuvalt toetada
        õppekäikude toimumist.
      </p>
      <p className="mb-2">
        <a href="https://www.kul.ee/uudised/kultuuriministeerium-voimaldab-54-000-opilasele-tasuta-kultuurikulastuse" className="underline">
          Kultuuriministeerium võimaldab 54 000 õpilasele tasuta kultuurikülastuse
        </a>
      </p>
      <p className="mb-12">
        <a href="https://www.opleht.ee/2025/09/kooliopilase-ranitsas-on-ruumi-ka-kultuurile/" className="underline">
          Kooliõpilase ranitsas on ruumi ka kultuurile
        </a>
        <br />
        Kultuurihariduse ja ligipääsetavuse nõunik <strong>Annikki Aruväli</strong> kirjutab
        23.09.2025 Õpetajate Lehes Kultuuriranitsa kasutamise võimalustest ja tagasisidest.
      </p>

      {/* Vaheanalüüsid */}
      <h2 className="font-bold text-xl mb-4">Vaheanalüüsid:</h2>
      <ul className="list-disc list-inside space-y-2 mb-12">
        <li>
          <a href="https://www.kul.ee/sites/default/files/documents/2025-11/Kultuuriranitsa%20vaheanal%C3%BC%C3%BCs%202025.pdf" className="underline">
            Kultuuriranitsa vaheanalüüs 2025 (PDF)
          </a>
        </li>
        <li>
          <a href="https://www.kul.ee/sites/default/files/documents/2024-05/%C3%95pilaste%20kultuuris%20osalemise%20uuring%20L%C3%95PPARUANNE_2024.pdf" className="underline">
            3.–9. klasside õpilaste kultuuris osalemise uuring 2024 (PDF)
          </a>
        </li>
      </ul>

      {/* Kultuuriministeeriumi kaart */}
      <div className="block border border-gray-200 rounded-xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg mb-3">Uuri rohkem kultuuriministeeriumi kodulehelt</h3>
          <p className="text-blue-700 italic">
            <a
              href="https://www.kul.ee/asutus-uudised-ja-rahastamine/rahastamine/kultuuriranits"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
            >
              Kliki siia!
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3 text-blue-900 font-semibold shrink-0 ml-8">
          <img src="https://www.kul.ee/sites/default/files/KULTUURIMINISTEERIUM_EST.svg" alt="Kultuuriministeerium" className="h-12" />
        </div>
      </div>
    </main>
  );
}