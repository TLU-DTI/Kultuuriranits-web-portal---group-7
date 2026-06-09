"use client";

import { useRouter } from "next/navigation";

interface AddFavoriteButtonProps {
    programId: number;
    personId: number;
    apiUrl: string | undefined;
}

export function AddFavorites({ programId, personId, apiUrl }: AddFavoriteButtonProps) {
    const router = useRouter();

    const handleAdd = async () => {
        try {
            const res = await fetch(`${apiUrl}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    program: { id: programId },
                    person: { id: personId }
                })
            });

            if (res.ok) {
                /* alert("Programm lisatud lemmikutesse!"); */
                router.refresh();
            } else {
                alert("Lemmiku lisamine ebaõnnestus.");
            }
        } catch (error) {
            console.error("Viga lemmiku lisamisel:", error);
        }
    };

    return (
        <button
            onClick={handleAdd}
            style={{
                backgroundColor: "#2263c5",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "4px",
                cursor: "pointer"
            }}
        >
            Lisa lemmikuks
        </button>
    );
}