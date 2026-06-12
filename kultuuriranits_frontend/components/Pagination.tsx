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
        if (newPage >= 0 && newPage < totalPages) {
            const params = new URLSearchParams(
                searchParams.toString()
            );
            params.set("page", String(newPage));
            router.push(`?${params.toString()}`);
        }
    };

    const isFirstPage = page === 0;
    const isLastPage = page + 1 >= totalPages;

    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <button 
                disabled={isFirstPage} 
                onClick={() => changePage(page - 1)}
                className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all ${
                    isFirstPage 
                        ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed opacity-60" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
            >
                Eelmine
            </button>

            <span className="text-sm font-semibold text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                {page + 1} / {totalPages}
            </span>

            <button 
                disabled={isLastPage} 
                onClick={() => changePage(page + 1)}
                className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all ${
                    isLastPage 
                        ? "bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed opacity-60" 
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 cursor-pointer"
                }`}
            >
                Järgmine
            </button>
        </div>
    );
}