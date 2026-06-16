import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Notification } from "@/models/Notification";
import NotificationList from "@/components/NotificationList";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

async function getNotifications(): Promise<Notification[]> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        const res = await fetch(`${API_URL}/notification`, {
            headers: {
                Cookie: cookieString
            },
            cache: "no-store"
        });

        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga teavituste pärimisel serveris:", error);
        return [];
    }
}

async function getCurrentUser(): Promise<{ id: number } | null> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join("; ");

        const res = await fetch(`${API_URL}/me`, {
            headers: {
                Cookie: cookieString
            },
            cache: "no-store",
        });

        if (res.ok) return await res.json();
        return null;
    } catch (error) {
        return null;
    }
}

export default async function ReadNotificationsPage() {
    const [currentUser, notifications] = await Promise.all([
        getCurrentUser(),
        getNotifications()
    ]);

    if (!currentUser) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Päise ala koos navigeerimisega */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <p className="text-sm font-extrabold uppercase tracking-wider text-gray-500 mb-2">
                            Arhiiv
                        </p>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-700 tracking-tight">
                            Loetud teated
                        </h1>
                    </div>

                    {/* Tagasi nupp */}
                    <Link
                        href="/notifications"
                        className="px-5 py-2.5 text-sm font-bold text-blue-700 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Uued teated
                    </Link>
                </div>

                {/* Loetud teated */}
                <NotificationList
                    key="read-list"
                    initialNotifications={notifications}
                    currentStatusFilter="read"
                    showMarkAsReadButton={false}
                    emptyMessage="Siin kuvatakse teavitused, mille oled märkinud loetuks."
                />

            </section>
        </main>
    );
}