import { cookies } from "next/headers";
import { Material } from "@/models/Material";
import MaterialList from "@/components/MaterialList";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

interface User {
    id: number;
    role: string;
}

async function getMaterials(): Promise<Material[]> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        const res = await fetch(`${API_URL}/material`, {
            headers: { Cookie: cookieString },
            cache: "no-store"
        });

        return res.ok ? await res.json() : [];
    } catch (error) {
        return [];
    }
}

async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

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

export default async function MaterialsPage() {
    const [currentUser, materials] = await Promise.all([
        getCurrentUser(),
        getMaterials()
    ]);

    const isAdmin = currentUser?.role?.name === "ADMIN";

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Õppematerjalid
                        </h1>
                    </div>
                </div>
                <MaterialList
                    initialMaterials={materials}
                    isAdmin={isAdmin}
                />

            </section>
        </main>
    );
}