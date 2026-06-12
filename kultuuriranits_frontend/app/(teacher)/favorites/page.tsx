import { Favorites } from "../../../models/Favorites";
import { RemoveFavorites } from "../../../components/RemoveFavorites";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

async function getFavorites(): Promise<Favorites[]> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore.toString();

        const res = await fetch(`${API_URL}/favorites`, {
            headers: { Cookie: cookieString },
            cache: "no-store"
        });

        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga lemmikute pärimisel backendist:", error);
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
    } catch {
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
        <main className="max-w-5xl mx-auto px-6 py-8">

            {/* Päis */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="bg-red-100 rounded-2xl p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">Mu lemmikud</h1>
                        <p className="text-gray-500 text-sm">Sinu salvestatud kultuuriprogrammid ({favorites.length})</p>
                    </div>
                </div>
                <Link
                    href="/programs"
                    className="border border-gray-300 rounded-xl px-5 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                    Otsi uusi programme
                </Link>
            </div>

            <hr className="mb-8" />

            {/* Tühi olek */}
            {favorites.length === 0 && (
                <div className="border border-gray-200 rounded-2xl py-20 flex flex-col items-center text-center px-6">
                    <div className="bg-gray-100 rounded-full p-5 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold mb-3">Sul pole veel lemmikprogramme</h2>
                    <p className="text-gray-500 text-sm max-w-sm mb-8">
                        Sirvi kultuuriprogramme ja vajuta südamekest, et salvestada need siia nimekirja. Nii leiad need hiljem kiiresti üles.
                    </p>
                    <Link
                        href="/programs"
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Sirvi programme
                    </Link>
                </div>
            )}

            {/* Lemmikute nimekiri */}
            {favorites.length > 0 && (
                <div className="flex flex-col gap-4">
                    {favorites.map((fav) => {
                        const p = fav.program;
                        return (
                            <div key={fav.id} className="border border-gray-200 rounded-xl overflow-hidden flex">

                                {/* Pilt */}
                                {p?.imageName ? (
                                    <Image
                                        src={`${API_URL}/program/${p.id}/image`}
                                        alt={p.title}
                                        className="w-48 h-full object-cover shrink-0"
                                        width={192}
                                        height={192}
                                    />
                                ) : (
                                    <div className="w-48 shrink-0 bg-gray-100 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M3.75 3h16.5A2.25 2.25 0 0122.5 5.25v13.5A2.25 2.25 0 0120.25 21H3.75A2.25 2.25 0 011.5 18.75V5.25A2.25 2.25 0 013.75 3z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Info */}
                                <div className="flex-1 p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <h2 className="font-bold text-lg">{p?.title || "Nimetu programm"}</h2>
                                            {p?.category && (
                                                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full shrink-0">{p.category.name}</span>
                                            )}
                                        </div>
                                        {p?.description && (
                                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{p.description}</p>
                                        )}
                                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                            {p?.location && (
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>
                                                    {p.location}
                                                </span>
                                            )}
                                            {p?.durationMinutes && (
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {p.durationMinutes} min
                                                </span>
                                            )}
                                            {p?.language && (
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                                                    </svg>
                                                    {p.language}
                                                </span>
                                            )}
                                            {p?.targetGroup && (
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                                    </svg>
                                                    {p.targetGroup}
                                                </span>
                                            )}
                                            {p?.minGroupSize && p?.maxGroupSize && (
                                                <span className="flex items-center gap-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                                    </svg>
                                                    {p.minGroupSize} kuni {p.maxGroupSize} õpilast
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {p?.pricePerStudent != null && (
                                            <span className="font-semibold text-gray-800">{p.pricePerStudent} € / õpilane</span>
                                        )}
                                        <RemoveFavorites favoriteId={fav.id} apiUrl={API_URL} />
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            )}

        </main>
    );
}
