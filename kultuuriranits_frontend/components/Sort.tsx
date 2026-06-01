"use client";
import { useRouter, useSearchParams } from "next/navigation";


// router --> lubab muuta URL-i ja navigeerida lehtede vahel
// searchParams --> lubab lugeda ja muuta URL-i päringus olevaid parameetreid

const SORT_OPTIONS = [
    {
        label: "Uuemad enne",
        value: "id,desc"
    },
    {
        label: "Vanemad enne",
        value: "id,asc"
    },
    {
        label: "A-Z (Pealkiri)",
        value: "title,asc"
    },
    {
        label: "Z-A (Pealkiri)",
        value: "title,desc"
    },
    {
        label: "Hind kasvavalt",
        value: "pricePerStudent,asc"
    },
    {
        label: "Hind kahanevalt",
        value: "pricePerStudent,desc"
    },
    {
        label: "Kestus kasvavalt",
        value: "durationMinutes,asc"
    },
    {
        label: "Kestus kahanevalt",
        value: "durationMinutes,desc"
    }
];

const PAGE_SIZES = [1, 2, 3, 4];

export function Sort() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const currentSize =
        Number(searchParams.get("size")) || 3; // algväärtus 3 

    const currentSort =
        searchParams.get("sort") || "id,desc"; // algväärtus "id,desc" (uusimad enne)

    const updateParams = (
        key: string, // nt "size" või "sort"
        value: string // nt "4" või "title,asc"
    ) => {

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set(key, value);

        params.set("page", "0");

        router.push(`?${params.toString()}`);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
                alignItems: "center",
                margin: "16px 0"
            }}
        >

            {/* Tulemusi lehel */}
            <div>

                <label
                    style={{
                        display: "block",
                        marginBottom: "4px",
                        fontWeight: "bold"
                    }}
                >
                    Tulemusi lehel
                </label>

                <select
                    value={currentSize}
                    onChange={(e) =>
                        updateParams(
                            "size",
                            e.target.value
                        )
                    }
                >

                    {PAGE_SIZES.map((size) => (
                        <option
                            key={size}
                            value={size}
                        >
                            {size} lehel
                        </option>
                    ))}

                </select>

            </div>

            {/* Sorteerimine */}
            <div>

                <label
                    style={{
                        display: "block",
                        marginBottom: "4px",
                        fontWeight: "bold"
                    }}
                >
                    Sorteeri
                </label>

                <select
                    value={currentSort}
                    onChange={(e) =>
                        updateParams(
                            "sort",
                            e.target.value
                        )
                    }
                >

                    {SORT_OPTIONS.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}

                </select>

            </div>

        </div>
    );
}