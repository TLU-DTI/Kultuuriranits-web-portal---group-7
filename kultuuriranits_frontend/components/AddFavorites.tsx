"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

type AddFavoritesProps = {
  programId: number;
  personId: number;
  apiUrl: string | undefined;
};

export function AddFavorites({
  programId,
  personId,
  apiUrl,
}: AddFavoritesProps) {
  const router = useRouter();

  async function handleAddFavorite() {
    try {
      const res = await fetch(`${apiUrl}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          program: { id: programId },
          person: { id: personId },
        }),
      });

      if (!res.ok) {
        throw new Error("Lemmikuks lisamine ebaõnnestus");
      }

      router.refresh();
    } catch (error) {
      console.error("Viga lemmikuks lisamisel:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddFavorite}
      aria-label="Lisa lemmikuks"
      title="Lisa lemmikuks"
      className="w-11 h-11 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
    >
      <Heart className="w-5 h-5 text-blue-600" />
    </button>
  );
}