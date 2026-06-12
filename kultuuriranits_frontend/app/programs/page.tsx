import { Program } from "../../models/Program";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { Category } from "../../models/Category";
import { AdvancedFilters } from "../../components/AdvancedFilter";
import { Organization } from "../../models/Organization";
import Link from "next/link";

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
    // price?: string;
    duration?: string;
    minDurationMinutes?: string,
    maxDurationMinutes?: string,
    minGroupSize?: string;
    maxGroupSize?: string;
    language?: string;
    wheelchair?: string;
    specialNeeds?: string;
    minPricePerStudent?: string;
    maxPricePerStudent?: string;
    outdoor?: string;
}

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
    // price?: string,
    duration?: string,
    minDurationMinutes?: string,
    maxDurationMinutes?: string,
    minGroupSize?: string,
    maxGroupSize?: string,
    language?: string,
    wheelchair?: string,
    specialNeeds?: string,
    minPricePerStudent?: string,
    maxPricePerStudent?: string,
    outdoor?: string,
): Promise<FetchResult> {
    try {
        const baseUrl = `${API_URL}/program/searchall`;

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
        //  if (price) params.set("price", price);
        if (duration) params.set("durationMinutes", duration);
        if (minDurationMinutes) params.set("minDurationMinutes", minDurationMinutes);
        if (maxDurationMinutes) params.set("maxDurationMinutes", maxDurationMinutes);
        if (minGroupSize) params.set("minGroupSize", minGroupSize);
        if (maxGroupSize) params.set("maxGroupSize", maxGroupSize);
        if (language) params.set("language", language);
        if (wheelchair) params.set("wheelchair", wheelchair);
        if (specialNeeds) params.set("specialNeeds", specialNeeds);
        if (minPricePerStudent)
          params.set("minPricePerStudent", minPricePerStudent);
        if (maxPricePerStudent)
          params.set("maxPricePerStudent", maxPricePerStudent);
        if (outdoor) params.set("outdoor", outdoor);


        const res = await fetch(
          
            `${baseUrl}?${params.toString()}`,
            { cache: "no-store" }
        );
        console.log(`${baseUrl}?${params.toString()}`)
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
    // const price = params.pricePerStudent;
    const duration = params.duration;
    const minDurationMinutes = params.minDurationMinutes;
    const maxDurationMinutes = params.maxDurationMinutes;
    const minGroupSize = params.minGroupSize;
    const maxGroupSize = params.maxGroupSize;
    const language = params.language;

    const wheelchair = params.wheelchair;
    const specialNeeds = params.specialNeeds;
    const maxPricePerStudent = params.maxPricePerStudent;
    const minPricePerStudent = params.minPricePerStudent;
    const outdoor = params.outdoor;
    const organizationId = params.organizationId;
    const [programData, categories, organizations] = await Promise.all([
        getPrograms(
          keyword,
          page,
          sort,
          size,
          categoryId,
          organizationId,
          targetGroup,
          date,
          county,
          location,
          //   price,
          duration,
          minDurationMinutes,
          maxDurationMinutes,
          minGroupSize,
          maxGroupSize,
          language,
          wheelchair,
          specialNeeds,
          minPricePerStudent,
          maxPricePerStudent,
          outdoor,
        ),
        getCategories(),
        getOrganizations()
    ]);

    const { content: programs, totalPages } = programData;

    const resultsText = programs.length === 1 ? "1 tulemus" : `${programs.length} tulemust`;

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-8">
                Programmid
            </h1>

            <div className="flex flex-col gap-4 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                    <div className="shrink-0">
                        <span className="text-sm font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 block">
                            {resultsText}
                        </span>
                    </div>
                    
                    <div className="flex-1 w-full max-w-xl">
                        <SearchBar />
                    </div>
                    
                    <div className="shrink-0">
                        <Sort />
                    </div>
                </div>

                <AdvancedFilters
                    categories={categories}
                    organizations={organizations}
                />
            </div>

            {programs.length === 0 ? (
                <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl text-gray-600 text-center">
                    Andmeid ei õnnestunud laadida või ühtegi programmi ei leitud. Veendu, et andmebaas ja backend töötavad.
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-8">
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
                                    className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-center hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="w-full md:w-2/5 shrink-0 flex items-center justify-center bg-gray-50 rounded-xl p-2 h-56 md:h-72">
                                        <img
                                            src={`${API_URL}/program/${program.id}/image`}
                                            alt={program.title}
                                            className="w-full h-full object-contain rounded-xl"
                                        />
                                    </div>

                                    <div className="flex-1 w-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                {program.category && (
                                                    <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                                                        {program.category.name ?? `Kategooria ${program.category.id}`}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-3">
                                                {program.title}
                                            </h2>

                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {program.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs border-t border-gray-50 pt-4 mb-6">
                                            {details.map(([label, value]) => (
                                                <p key={label} className="text-gray-600">
                                                    <strong className="text-gray-900 font-semibold">{label}:</strong> {value}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="pt-2">
                                            <Link 
                                                href={`/programs/${program.id}`}
                                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                                            >
                                                Detailvaade
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <Pagination
                            page={page}
                            totalPages={totalPages}
                        />
                    </div>
                </>
            )}
        </main>
    );
}