"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function LanguageFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set("language", value);
        } else {
            params.delete("language");
        }

        params.set("page", "0");

        router.push(`/programs?${params.toString()}`);
    };

    return (
        <select
            value={searchParams.get("language") || ""}
            onChange={(e) => handleChange(e.target.value)}
        >
            <option value="">Kõik keeled</option>
            <option value="ET">Eesti</option>
            <option value="EN">Inglise</option>
            <option value="RU">Vene</option>
        </select>
    );
}