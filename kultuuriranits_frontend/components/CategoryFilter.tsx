"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Category } from "../models/Category";

interface CategoryFilterProps {
    categories: Category[];
    currentCategoryId?: string;
}

export default function CategoryFilter({
    categories,
    currentCategoryId
}: CategoryFilterProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {

        const categoryId = e.target.value;

        // Võtab olemasolevad URL parameetrid kaasa
        const params = new URLSearchParams(
            searchParams.toString()
        );

        if (categoryId) {
            params.set("categoryId", categoryId);
        } else {
            params.delete("categoryId");
        }

        // Filtri muutmisel tagasi esimesele lehele
        params.set("page", "0");

        router.push(`?${params.toString()}`);
    };

    return (
        <div style={{ marginBottom: "15px" }}>

            <label
                htmlFor="category-select"
                style={{
                    marginRight: "10px",
                    fontWeight: "bold"
                }}
            >
                Kategooria:
            </label>

            <select
                id="category-select"
                value={currentCategoryId ?? ""}
                onChange={handleChange}
                style={{
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid gray"
                }}
            >
                <option value="">
                    Kõik kategooriad
                </option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name ??
                            `Kategooria ${category.id}`}
                    </option>
                ))}
            </select>

        </div>
    );
}