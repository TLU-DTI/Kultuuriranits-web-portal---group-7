// app/programs/SearchBar.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Hoiame kasutaja sisestatud teksti staatuses
    const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

    // useEffect käivitub iga kord, kui 'keyword' muutub (ehk kasutaja trükib)
    useEffect(() => {
        // Kui kasutaja trükib, lükkame päringu tegemist 300ms edasi
        const delayDebounceFn = setTimeout(() => {
            if (keyword.trim()) {
                // router.replace ei tekita brauseri ajaloos iga tähe jaoks uut lehte
                router.replace(`/programs?keyword=${encodeURIComponent(keyword.trim())}`);
            } else {
                // Kui kast on tühi, näitame jälle kõiki
                router.replace("/programs");
            }
        }, 300); // 300ms ooteaeg

        // Kui kasutaja vajutab uut klahvi enne 300ms täitumist, tühistatakse eelmine taimer
        return () => clearTimeout(delayDebounceFn);
    }, [keyword, router]);

    return (
        <div style={{ marginBottom: "25px" }}>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Otsi programmi (tulemused ilmuvad trükkimise ajal)..."
                style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    maxWidth: "400px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
            />
        </div>
    );
}