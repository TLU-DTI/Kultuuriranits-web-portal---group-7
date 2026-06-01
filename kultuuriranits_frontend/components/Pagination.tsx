"use client";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    page: number;
    totalPages: number;
}

export function Pagination({
    page,
    totalPages
}: PaginationProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (newPage: number) => {

        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set("page", String(newPage));

        router.push(`?${params.toString()}`);
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginTop: "20px"
            }}
        >

            <button disabled={page === 0} onClick={() => changePage(page - 1)}>
                Eelmine
            </button>

            <span>
                {page + 1} / {totalPages}
            </span>

            <button disabled={page + 1 >= totalPages} onClick={() => changePage(page + 1)}>
                Järgmine
            </button>

        </div>
    );
}