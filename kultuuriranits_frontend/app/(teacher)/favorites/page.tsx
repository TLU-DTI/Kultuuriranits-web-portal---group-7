import { Favorites } from "../../../models/Favorites";
import { RemoveFavorites } from "../../../components/RemoveFavorites";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

async function getFavorites(): Promise<Favorites[]> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore.toString();

        const res = await fetch(`${API_URL}/favorites`, {
            headers: {
                Cookie: cookieString
            }, cache: "no-store"
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
        <div style={{ padding: "40px" }}>
            <h1>Minu Lemmikud</h1>
            {favorites.length === 0 ? (<p>Lemmikuid veel pole.</p>) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {favorites.map((fav) => (
                        <li key={fav.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "400px" }}>
                            <div>
                                <p style={{ margin: 0, fontWeight: "bold" }}>{fav.program?.title || "Nimetu programm"}</p>
                            </div>
                            <RemoveFavorites favoriteId={fav.id} apiUrl={API_URL} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}