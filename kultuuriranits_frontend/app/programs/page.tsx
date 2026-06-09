import { Program } from "../../models/Program";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { Category } from "../../models/Category";
import { AdvancedFilters } from "../../components/AdvancedFilter";
import { Organization } from "../../models/Organization";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

interface FetchResult {
    content: Program[];
    totalPages: number;
}

interface SearchParams {
    keyword?: string;
    page?: string;
    sort?: string;
    size?: string;
    categoryId?: string;
    organizationId?: string;
    targetGroup?: string;
    date?: string;
    county?: string;
    location?: string;
    price?: string;
    duration?: string;
    groupSize?: string;
    languages?: string;
    wheelchair?: string;
    specialNeeds?: string;
    outdoor?: string;
}

// GET category
async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/category`, {
            cache: "no-store"
        });
        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga kategooriate pärimisel backendist:", error);
        return [];
    }
}

//Organization fetch
async function getOrganizations() {
    try {
        const res = await fetch(`${API_URL}/organization`, {
            cache: "no-store"
        });

        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga organisatsioonide pärimisel backendist:", error);
        return [];
    }
}

// GET programs (või search)
async function getPrograms(
    keyword?: string,
    page = 0,
    sort = "id,asc",
    size = 3,
    categoryId?: string,
    organizationId?: string,
    targetGroup?: string,
    date?: string,
    county?: string,
    location?: string,
    price?: string,
    duration?: string,
    groupSize?: string,
    languages?: string,
    wheelchair?: string,
    specialNeeds?: string,
    outdoor?: string,
): Promise<FetchResult> {
    try {
        const baseUrl = `${API_URL}/program${keyword ? "/search" : ""}`;

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort
        });

        if (keyword) params.set("keyword", keyword);
        if (categoryId) params.set("categoryId", categoryId);
        if (organizationId) params.set("organizationId", organizationId);
        if (targetGroup) params.set("targetGroup", targetGroup);
        if (date) params.set("date", date);
        if (county) params.set("county", county);
        if (location) params.set("location", location);
        if (price) params.set("price", price);
        if (duration) params.set("duration", duration);
        if (groupSize) params.set("groupSize", groupSize);
        if (languages) params.set("languages", languages);
        if (wheelchair) params.set("wheelchair", wheelchair);
        if (specialNeeds) params.set("specialNeeds", specialNeeds);
        if (outdoor) params.set("outdoor", outdoor);

        const res = await fetch(
            `${baseUrl}?${params.toString()}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error(`Backend tagastas vea staatuse: ${res.status}`);
            return { content: [], totalPages: 1 };
        }

        const data = await res.json();

        return {
            content: data.content ?? [],
            totalPages: data.totalPages ?? 1
        };
    } catch (error) {
        console.error("Ei saanud Spring Boot backendiga ühendust (getPrograms):", error);
        return { content: [], totalPages: 1 };
    }
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
    const targetGroup = params.targetGroup;
    const date = params.date;
    const county = params.county;
    const location = params.location;
    const price = params.price;
    const duration = params.duration;
    const groupSize = params.groupSize;
    const languages = params.languages;
    const wheelchair = params.wheelchair;
    const specialNeeds = params.specialNeeds;
    const outdoor = params.outdoor;
    const organizationId = params.organizationId;
    const [programData, categories, organizations] = await Promise.all([
        getPrograms(keyword, page, sort, size, categoryId, organizationId, targetGroup, date, county, location, price, duration, groupSize, languages, wheelchair, specialNeeds, outdoor),
        getCategories(),
        getOrganizations()
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
                    <div style={{ flex: 1, minWidth: "200px" }}>
                        <SearchBar />
                    </div>
                    <Sort />
                </div>

                <AdvancedFilters
                    categories={categories}
                    organizations={organizations}
                />

            </div>

            {/* Tulemused */}
            {programs.length === 0 ? (
                <p style={{ padding: "20px", background: "#f5f5f5", borderRadius: "5px" }}>
                    Andmeid ei õnnestunud laadida või ühtegi programmi ei leitud. Veendu, et andmebaas ja backend töötavad.
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
                                            {program.category.name ?? `Kategooria ${program.category.id}`}
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