import Link from 'next/link';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa6';

export function Footer() {
  return (
    <footer className="bg-[#003399] text-white py-12 px-4 sm:px-6 lg:px-8 w-full mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Ülemine sektsioon */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12">
          {/* Peamine logo ja sotsiaalmeedia */}
          <div className="md:col-span-1 space-y-5">
            <h2 className="text-2xl font-semibold tracking-tight">
              Kultuuriranits
            </h2>

            {/* Sotsiaalmeedia ikoonid */}
            <div className="flex items-center gap-4 pt-1">
              <a
                href="#"
                className="text-white/85 hover:text-white transition-colors"
                aria-label="X"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="text-white/85 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="text-white/85 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="text-white/85 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">
              Info
            </h3>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/info" className="hover:text-white transition-colors">
                  Meist
                </Link>
              </li>

              <li>
                <Link href="/programs" className="hover:text-white transition-colors">
                  Kultuuriprogrammid
                </Link>
              </li>
            </ul>
          </div>

          {/* Privaatsus */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">
              Privaatsus
            </h3>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/tingimused" className="hover:text-white transition-colors">
                  Kasutustingimused
                </Link>
              </li>

              <li>
                <Link href="/privaatsus" className="hover:text-white transition-colors">
                  Isikuandmete töötlus
                </Link>
              </li>
            </ul>
          </div>

          {/* Õpetajatele */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">
              Õpetajatele
            </h3>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/juhendid" className="hover:text-white transition-colors">
                  Kuidas tellida
                </Link>
              </li>

              <li>
                <Link href="/kkk" className="hover:text-white transition-colors">
                  Korduvad küsimused
                </Link>
              </li>
            </ul>
          </div>

          {/* Kultuuriasutustele */}
          <div>
            <h3 className="font-medium text-lg border-b border-white/30 pb-1 mb-3 inline-block pr-8">
              Kultuuriasutustele
            </h3>

            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/programs/add" className="hover:text-white transition-colors">
                  Programmi lisamine
                </Link>
              </li>

              <li>
                <Link href="/partnerile" className="hover:text-white transition-colors">
                  Partnerluslepingud
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Alumine sektsioon */}
        <div className="border-t border-white/20 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-sm text-white/90">
          <div>
            <h4 className="font-semibold mb-2">Annikki Aruväli</h4>

            <p className="mb-2 italic">
              Kultuurihariduse ja ligipääsetavuse nõunik
            </p>

            <p className="text-white/80">+372 5199 6885</p>

            <a
              href="mailto:kultuuriranits@kul.ee"
              className="text-white/80 hover:text-white hover:underline"
            >
              kultuuriranits@kul.ee
            </a>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Kultuuriministeerium</h4>

            <p className="text-white/80">+372 628 2222</p>
            <p className="text-white/80">min@kul.ee</p>

            <p className="text-white/80 text-xs">
              Suur-Karja 23, 15076 Tallinn
            </p>
          </div>

          <div className="space-y-3 md:max-w-sm md:ml-auto w-full">
            <h4 className="font-semibold">Püsi kursis!</h4>

            <p className="text-xs text-white/80">
              Telli igakuine ülevaade uutest programmidest.
            </p>

            <button className="w-full bg-[#0066FF] hover:bg-[#0055DD] text-white font-medium py-2 px-4 rounded transition-colors text-center text-sm">
              Liitu uudiskirjaga!
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}