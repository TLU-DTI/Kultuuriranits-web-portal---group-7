import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#003399] text-white py-12 px-4 sm:px-6 lg:px-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* Ülemine sektsioon: Logo ja Lingid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12">
          
          {/* Peamine Logo ja Sotsiaalmeedia */}
<div className="md:col-span-1 space-y-4">
  
  {/* Logo */}
  <div className="inline-block bg-white p-3 rounded-sm shadow-sm max-w-[200px]">
    <img 
      src="../public/images/KulMin.jpg" alt="Kultuuriministeerium" className="h-12 w-auto object-contain"/>
  </div>

  {/* Kultuuriranits */}
  <h2 className="text-2xl font-semibold tracking-tight pt-2">Kultuuriranits</h2>
  
  {/* 3. Sotsiaalmeedia ikoonid */}
  <div className="flex space-x-4 text-xl pt-1">
    <a href="#" className="hover:opacity-80 transition-opacity" aria-label="X">
      <span className="font-bold text-lg">𝕏</span>
    </a>
    <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
      <span>📸</span>
    </a>
    <a href="#" className="hover:opacity-80 transition-opacity" aria-label="YouTube">
      <span>▶️</span>
    </a>
    <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
      <span className="font-bold">in</span>
    </a>
  </div>

</div>

          {/* Info */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">Info</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/info" className="hover:text-white transition-colors">Meist</Link></li>
              <li><Link href="/programs" className="hover:text-white transition-colors">Kultuuriprogrammid</Link></li>
            </ul>
          </div>

          {/* Privaatsus */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">Privaatsus</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/tingimused" className="hover:text-white transition-colors">Kasutustingimused</Link></li>
              <li><Link href="/privaatsus" className="hover:text-white transition-colors">Isikuandmete töötlus</Link></li>
            </ul>
          </div>

          {/* Õpetajatele */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">Õpetajatele</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/juhendid" className="hover:text-white transition-colors">Kuidas tellida</Link></li>
              <li><Link href="/kkk" className="hover:text-white transition-colors">Korduvad küsimused</Link></li>
            </ul>
          </div>

          {/* Kultuuriasutustele */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">Kultuuriasutustele</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/programs/add" className="hover:text-white transition-colors">Programmi lisamine</Link></li>
              <li><Link href="/partnerile" className="hover:text-white transition-colors">Partnerluslepingud</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-end text-sm text-white/90">

          {/* Kultuuriranitsa Kontakt */}
          <div>
            <h4 className="font-semibold mb-2">Annikki Aruväli</h4>
            <p className="mb-2"><i>Kultuurihariduse ja ligipääsetavuse nõunik</i></p>
            <p className="text-white/80">+372 5199 6885</p>
            <a href="mailto:kultuuriranits@kul.ee" className="text-white/80 hover:underline">
              kultuuriranits@kul.ee
            </a>
          </div>

          {/* Kultuuriministeeriumi Kontakt */}
          <div>
            <h4 className="font-semibold mb-2">Kultuuriministeerium</h4>
            <p className="text-white/80">+372 628 2222</p>
            <p className="text-white/80">min@kul.ee</p>
            <p className="text-white/80 text-xs">Suur-Karja 23, 15076 Tallinn</p>
          </div>

          {/* Uudiskiri */}
          <div className="space-y-3">
            <h4 className="font-semibold">Püsi kursis!</h4>
            <p className="text-xs text-white/80">Telli igakuine ülevaade uutest programmidest.</p>
            <button className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white font-medium py-2 px-4 rounded transition-colors text-center text-sm shadow-sm">
              Liitu uudiskirjaga!
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}