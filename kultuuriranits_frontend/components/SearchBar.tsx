"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

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

            router.replace(`?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeout);
    }, [keyword, searchParams, router]);

    return (
        <div className="w-full">
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
                    border: "1px solid #ccc"
                }}
            />
        </div>
    );
}