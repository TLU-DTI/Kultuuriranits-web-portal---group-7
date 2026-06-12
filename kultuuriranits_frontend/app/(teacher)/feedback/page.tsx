import { Feedback } from "../../../models/Feedback";
import { RemoveFeedback } from "../../../components/RemoveFeedback";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Star, MessageSquare } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

async function getFeedback(): Promise<Feedback[]> {
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore.toString();
        const res = await fetch(`${API_URL}/feedback`, {
            headers: {
                Cookie: cookieString
            },
            cache: "no-store"
        });
        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga tagasiside pärimisel backendist:", error);
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

export default async function getFeedbackPage() {
    const [currentUser, allFeedback] = await Promise.all([
        getCurrentUser(),
        getFeedback()
    ]);

    if (!currentUser) {
        redirect("/login");
    }

    const userFeedback = allFeedback.filter((fb) => {
        const feedbackUserId = fb.person?.id
        return feedbackUserId === currentUser.id;
    });

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900">
                        Minu tagasiside
                    </h1>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                        Siin on kõik sinu poolt kultuuriprogrammidele jäetud arvustused ja hinnangud.
                    </p>
                </div>
            </div>
            
            {userFeedback.length === 0 ? (
                <div className="p-8 bg-gray-50 border border-gray-150 rounded-2xl text-center">
                    <p className="text-sm font-medium text-gray-500">
                        Sa ei ole veel ühelegi programmile tagasisidet jätnud.
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                    {userFeedback.map((fb) => (
                        <div
                            key={fb.id}
                            className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
                        >
                            <div>
                                <h3 className="font-bold text-base text-gray-900 mb-2 tracking-tight">
                                    {fb.program?.title || "Nimetu programm"}
                                </h3>
                                <div className="flex items-center gap-0.5 mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= (fb.rating || 0)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-gray-200"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs font-bold text-gray-400 ml-1.5 mt-0.5">
                                        ({fb.rating}/5)
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100 italic">
                                    {`"${fb.text}"`}
                                </p>
                            </div>
                            <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
                                <RemoveFeedback feedbackId={fb.id} apiUrl={API_URL} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}