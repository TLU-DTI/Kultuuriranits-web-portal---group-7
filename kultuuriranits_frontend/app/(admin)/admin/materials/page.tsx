import { BookOpen, Clock, Settings } from "lucide-react";

export default function AdminLearningMaterialsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wider text-blue-700 mb-2">
            Administraatori vaade
          </p>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Õppematerjalid
          </h1>

          <p className="mt-3 text-gray-600 max-w-3xl">
            Siia tuleb õppematerjalide haldamise vaade, kus administraator saab
            tulevikus õppematerjale vaadata, muuta ja korrastada.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-8 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-5">
              <BookOpen className="w-7 h-7" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Õppematerjalide haldamise vaade on arendamisel
            </h2>

            <p className="mt-3 text-sm md:text-base text-blue-100 max-w-2xl leading-relaxed">
              See leht on hetkel placeholder. Hiljem lisandub siia
              õppematerjalide nimekiri koos otsingu, filtrite ja haldamise
              võimalustega.
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                  <Settings className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-black text-gray-900">
                  Tulevane funktsionaalsus
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Administraator saab siin tulevikus õppematerjale hallata ja
                  nende infot korrastada.
                </p>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-gray-50 p-6">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-black text-gray-900">
                  Hetkeseis
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  Vaade on ette valmistatud, kuid andmete kuvamine ja backendiga
                  ühendamine lisatakse hiljem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}