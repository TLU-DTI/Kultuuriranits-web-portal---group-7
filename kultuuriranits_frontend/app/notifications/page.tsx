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
            headers: { Cookie: cookieString },
            cache: "no-store",
        });

        if (res.ok) return await res.json();
        return null;
    } catch (error) {
        return null;
    }
}

export default async function NotificationsPage() {
    const [currentUser, notifications] = await Promise.all([
        getCurrentUser(),
        getNotifications()
    ]);

    if (!currentUser) redirect("/login");

    return (
        <main className="min-h-screen bg-gray-50 py-10">
            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Minu teated</h1>
                    </div>
                    <Link href="/notifications/read" className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                        Vaata loetud teateid
                    </Link>
                </div>

                {/* Lugemata teated */}
                <NotificationList
                    key="unread-list"
                    initialNotifications={notifications}
                    currentStatusFilter="unread"
                    showMarkAsReadButton={true}
                    emptyMessage="Kõik sinule suunatud teated on loetud või kustutatud."
                />

            </section>
        </main>
    );
}