import { Favorites } from "../../../models/Favorites";
import { RemoveFavorites } from "../../../components/RemoveFavorites";
import { ProgramCard } from "../../../components/ProgramCard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

async function getFavorites(): Promise<Favorites[]> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(`${API_URL}/favorites`, {
      headers: {
        Cookie: cookieString
      },
      cache: "no-store"
    });

    return res.ok ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

async function getCurrentUser(): Promise<{ id: number } | null> {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();

    const res = await fetch(`${API_URL}/me`, {
      headers: { Cookie: cookieString },
      cache: "no-store",
    });

    if (res.ok) return await res.json();
    return null;
  } catch (error) {
    return null;
  }
}

export default async function GetFavoritesPage() {
  const [currentUser, favorites] = await Promise.all([
    getCurrentUser(),
    getFavorites()
  ]);

  if (!currentUser) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-extrabold uppercase tracking-wider text-blue-700 mb-2">
            Kasutaja paneel
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Minu lemmikud
          </h1>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center">
            <div className="max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Lemmikuid veel pole
              </h2>
              <p className="text-gray-500 mb-6">
                Sinu salvestatud programmid ilmuvad siia.
              </p>
              <Link
                href="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
              >
                Avasta programme
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {favorites.map((fav) => {
              if (!fav.program) return null;
              return (
                <ProgramCard
                  key={fav.id}
                  program={fav.program}
                  apiUrl={API_URL}
                  actions={
                    <RemoveFavorites
                      favoriteId={fav.id}
                      apiUrl={API_URL}
                    />
                  }
                />
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
