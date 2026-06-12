"use client";

import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

type RemoveFavoritesProps = {
  favoriteId: number;
  apiUrl: string | undefined;
};

export function RemoveFavorites({
  favoriteId,
  apiUrl,
}: RemoveFavoritesProps) {
  const router = useRouter();

  async function handleRemoveFavorite() {
    try {
      const res = await fetch(`${apiUrl}/favorites/${favoriteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Lemmikust eemaldamine ebaõnnestus");
      }

      router.refresh();
    } catch (error) {
      console.error("Viga lemmikust eemaldamisel:", error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemoveFavorite}
      aria-label="Eemalda lemmikutest"
      title="Eemalda lemmikutest"
      className="w-11 h-11 rounded-full bg-white/95 border border-red-100 shadow-md flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer"
    >
      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
    </button>
  );
}