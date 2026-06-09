"use client";

import { useRouter } from "next/navigation";

interface RemoveFavoriteButtonProps {
    favoriteId: number;
    apiUrl: string | undefined;
}

export function RemoveFavorites({ favoriteId, apiUrl }: RemoveFavoriteButtonProps) {
    const router = useRouter();

    const handleRemove = async () => {
        try {
            const res = await fetch(`${apiUrl}/favorites/${favoriteId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Lemmiku eemaldamine ebaõnnestus.");
            }
        } catch (error) {
            console.error("Viga lemmiku eemaldamisel:", error);
        }
    };

    return (
        <button
            onClick={handleRemove}
            style={{
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer"
            }}
        >
            🗑️ Kustuta lemmikust
        </button>
    );
}