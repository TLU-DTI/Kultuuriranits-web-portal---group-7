"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ page, totalPages }: { page: number, totalPages: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (newNumber: number) => {
        const keyword = searchParams.get("keyword") || "";
        const keywordParam = keyword ? `&keyword=${keyword}` : "";

        router.push(`/programs?page=${newNumber}${keywordParam}`);
    };

    return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginTop: "20px" }}>
            <button disabled={page === 0} onClick={() => changePage(page - 1)}> Eelmine</button>
            <span>{page + 1} / {totalPages}</span>
            <button disabled={page + 1 >= totalPages} onClick={() => changePage(page + 1)}> Järgmine</button>
        </div>
    );
}