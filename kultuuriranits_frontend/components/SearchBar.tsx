"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {

    const router = useRouter();
    const searchParams = useSearchParams();

    // Algväärtus URL-ist
    const [keyword, setKeyword] = useState(
        searchParams.get("keyword") || ""
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            const params = new URLSearchParams(
                searchParams.toString()
            );

            const trimmedKeyword = keyword.trim();
            if (trimmedKeyword) {
                params.set("keyword", trimmedKeyword);
            } else {
                params.delete("keyword");
            }
            params.set("page", "0");

            // Uuendab URL-i ilma refreshita
            router.replace(`?${params.toString()}`);

        }, 300);

        return () => clearTimeout(timeout);

    }, [keyword]);

    return (
        <div style={{ marginBottom: "25px" }}>

            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Otsi programmi..."
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "10px 14px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "16px"
                }}
            />

        </div>
    );
}