import { Program } from "../../models/Program";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { CategoryFilter } from "../../components/CategoryFilter";
import { Category } from "../../models/Category";
const API_URL = process.env.NEXT_PUBLIC_BACK_URL;


interface FetchResult {
    content: Program[];
    totalPages: number;
}

// URL Query parameetrid
interface SearchParams {
    keyword?: string;
    page?: string;
    sort?: string;
    size?: string;
    categoryId?: string;
}

// GET category
async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/category`, {
            cache: "no-store"
        });

        return res.ok ? await res.json() : [];
    } catch {
        return [];
    }
}

// Programmide päring
async function getPrograms(
    keyword?: string,
    page = 0,
    sort = "id,asc",
    size = 3,
    categoryId?: string,
): Promise<FetchResult> {

    const baseUrl =
        `${API_URL}/program${keyword ? "/search" : ""}`;

    // URL parameetrid
    const params = new URLSearchParams({
        page: String(page),
        size: String(size),
        sort
    });

    if (keyword) {
        params.set("keyword", keyword);
    }

    if (categoryId) {
        params.set("categoryId", categoryId);
    }

    const res = await fetch(
        `${baseUrl}?${params.toString()}`,
        { cache: "no-store" }
    );

    if (!res.ok) {
        throw new Error("Programmide laadimine ebaõnnestus");
    }

    const data = await res.json();

    return {
        content: data.content ?? [],
        totalPages: data.totalPages ?? 1
    };
}

export default async function ProgramsPage({
    searchParams
}: {
    searchParams: Promise<SearchParams>;
}) {

    const params = await searchParams;

    const keyword = params.keyword;
    const page = Number(params.page) || 0;
    const sort = params.sort || "id,desc";
    const size = Number(params.size) || 3;
    const categoryId = params.categoryId;

    const [programData, categories] = await Promise.all([
        getPrograms(keyword, page, sort, size, categoryId),
        getCategories()
    ]);

    const { content: programs, totalPages } = programData;

    return (
        <main
            style={{
                padding: "20px",
                maxWidth: "800px",
                margin: "0 auto"
            }}
        >
            <h1>Programmid</h1>

            {/* Otsing + sorteerimine + filter */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            minWidth: "200px"
                        }}
                    >
                        <SearchBar />
                    </div>

                    <Sort />
                </div>

                <CategoryFilter
                    categories={categories}
                    currentCategoryId={categoryId}
                />
            </div>

            {/* Tulemused */}
            {programs.length === 0 ? (
                <p>
                    Otsingule või valitud kategooriale vastavaid programme ei
                    leitud.
                </p>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}
                    >
                        {programs.map((program) => {

                            const details = [
                                ["Hind", `${program.pricePerStudent}€`],
                                ["Kestus", `${program.durationMinutes} min`],
                                ["Asukoht", program.location],
                                ["Keel", program.language],
                                ["Sihtgrupp", program.targetGroup],
                                [
                                    "Grupi suurus",
                                    `${program.minGroupSize} - ${program.maxGroupSize}`
                                ],
                                ["Staatus", program.status]
                            ];

                            return (
                                <div
                                    key={program.id}
                                    style={{
                                        border: "1px solid gray",
                                        padding: "16px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <h2>{program.title}</h2>
                                    <img
                                        src={`${API_URL}/program/${program.id}/image`}
                                        alt={program.title}
                                        style={{
                                            width: "100%",
                                            height: "250px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginBottom: "12px"
                                        }}
                                    />

                                    {program.category && (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: "#e0e0e0",
                                                padding: "4px 8px",
                                                borderRadius: "4px",
                                                fontSize: "12px",
                                                marginBottom: "10px",
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {program.category.name ??
                                                `Kategooria ${program.category.id}`}
                                        </span>
                                    )}

                                    <p>{program.description}</p>

                                    {details.map(([label, value]) => (
                                        <p key={label}>
                                            <strong>{label}:</strong> {value}
                                        </p>
                                    ))}
                                </div>
                            );
                        })}
                    </div>

                    <Pagination
                        page={page}
                        totalPages={totalPages}
                    />
                </>
            )}
        </main>
    );
}