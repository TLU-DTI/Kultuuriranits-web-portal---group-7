"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

interface AddFeedbackProps {
    programId: number;
    personId: number;
    apiUrl: string | undefined;
}

export function AddFeedback({ programId, personId, apiUrl }: AddFeedbackProps) {
    const router = useRouter();
    const [text, setText] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [hoveredRating, setHoveredRating] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || rating === 0) {
            setError("Palun täida tekstiväli ja vali reiting!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${apiUrl}/feedback`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    text: text,
                    rating: rating,
                    program: { id: programId },
                    person: { id: personId }
                })
            });

            if (res.ok) {
                router.push(`/programs/${programId}`);
                router.refresh();
            } else {
                const errData = await res.json().catch(() => ({}));
                setError(errData.message || "Tagasiside salvestamine ebaõnnestus.");
            }
        } catch (err) {
            console.error("Viga tagasiside postitamisel:", err);
            setError("Serveriga ei saadud ühendust.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl">
                    {error}
                </div>
            )}

            {/* Tärnide valik */}
            <div>
                <label className="block text-sm font-extrabold text-gray-700 mb-2">
                    Hinnang (1–5 tärni)
                </label>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Star
                                className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Teksti ala */}
            <div>
                <label htmlFor="feedback-text" className="block text-sm font-extrabold text-gray-700 mb-2">
                    Sinu arvustus
                </label>
                <textarea
                    id="feedback-text"
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Kirjuta siia oma kogemusest antud programmiga..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium outline-none resize-y"
                ></textarea>
            </div>

            {/* Nupud */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                    Tühista
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-md shadow-blue-500/10 transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                    {loading ? "Salvestab..." : "Saada tagasiside"}
                </button>
            </div>
        </form>
    );
}