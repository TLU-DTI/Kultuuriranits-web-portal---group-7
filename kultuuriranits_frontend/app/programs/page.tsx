import { Program } from "../../models/Program";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { Category } from "../../models/Category";
import { AdvancedFilters } from "../../components/AdvancedFilter";
import { Organization } from "../../models/Organization";
import { TeacherProgramActions } from "../../components/TeacherProgramActions";
import { getCurrentUser } from "../lib/auth";
import { getUserFavorites } from "../lib/favorites";
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
    duration?: string;
    minDurationMinutes?: string;
    maxDurationMinutes?: string;
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
            cache: "no-store",
        });

        return res.ok ? await res.json() : [];
    } catch (error) {
        console.error("Viga kategooriate pärimisel backendist:", error);
        return [];
    }
}

async function getOrganizations(): Promise<Organization[]> {
    try {
        const res = await fetch(`${API_URL}/organization`, {
            cache: "no-store",
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
    outdoor?: string
): Promise<FetchResult> {
    try {
        const baseUrl = `${API_URL}/program/searchall`;

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort,
        });

        if (keyword) params.set("keyword", keyword);
        if (categoryId) params.set("categoryId", categoryId);
        if (organizationId) params.set("organizationId", organizationId);
        if (targetGroup) params.set("targetGroup", targetGroup);
        if (date) params.set("date", date);
        if (county) params.set("county", county);
        if (location) params.set("location", location);
        if (duration) params.set("durationMinutes", duration);
        if (minDurationMinutes) params.set("minDurationMinutes", minDurationMinutes);
        if (maxDurationMinutes) params.set("maxDurationMinutes", maxDurationMinutes);
        if (minGroupSize) params.set("minGroupSize", minGroupSize);
        if (maxGroupSize) params.set("maxGroupSize", maxGroupSize);
        if (language) params.set("language", language);
        if (wheelchair) params.set("wheelchair", wheelchair);
        if (specialNeeds) params.set("specialNeeds", specialNeeds);
        if (minPricePerStudent) params.set("minPricePerStudent", minPricePerStudent);
        if (maxPricePerStudent) params.set("maxPricePerStudent", maxPricePerStudent);
        if (outdoor) params.set("outdoor", outdoor);

        const res = await fetch(`${baseUrl}?${params.toString()}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Backend tagastas vea staatuse: ${res.status}`);
            return { content: [], totalPages: 1 };
        }

        const data = await res.json();

        return {
            content: data.content ?? [],
            totalPages: data.totalPages ?? 1,
        };
    } catch (error) {
        console.error("Ei saanud Spring Boot backendiga ühendust (getPrograms):", error);
        return { content: [], totalPages: 1 };
    }
}

export default async function ProgramsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    const keyword = params.keyword;
    const page = Number(params.page) || 0;
    const sort = params.sort || "id,desc";
    const size = Number(params.size) || 3;
    const categoryId = params.categoryId;
    const organizationId = params.organizationId;
    const targetGroup = params.targetGroup;
    const date = params.date;
    const county = params.county;
    const location = params.location;
    const duration = params.duration;
    const minDurationMinutes = params.minDurationMinutes;
    const maxDurationMinutes = params.maxDurationMinutes;
    const minGroupSize = params.minGroupSize;
    const maxGroupSize = params.maxGroupSize;
    const language = params.language;
    const wheelchair = params.wheelchair;
    const specialNeeds = params.specialNeeds;
    const minPricePerStudent = params.minPricePerStudent;
    const maxPricePerStudent = params.maxPricePerStudent;
    const outdoor = params.outdoor;

    const [programData, categories, organizations, currentUser] =
        await Promise.all([
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
                outdoor
            ),
            getCategories(),
            getOrganizations(),
            getCurrentUser(),
        ]);

    const isTeacher = currentUser?.role?.name === "TEACHER";
    const userFavorites = isTeacher ? await getUserFavorites() : [];

    const { content: programs, totalPages } = programData;

    const resultsText =
        programs.length === 1 ? "1 tulemus" : `${programs.length} tulemust`;

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    Andmeid ei õnnestunud laadida või ühtegi programmi ei leitud. Veendu,
                    et andmebaas ja backend töötavad.
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
                                    `${program.minGroupSize} - ${program.maxGroupSize}`,
                                ],
                            ];

                            return (
                                <div
                                    key={program.id}
                                    className="relative bg-white border-2 border-black rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out overflow-hidden flex flex-col md:flex-row min-h-[280px]"
                                >

                                    {isTeacher && currentUser && (
                                        <div className="absolute top-5 right-5 z-10">
                                            <TeacherProgramActions
                                                programId={program.id}
                                                personId={currentUser.id}
                                                favorites={userFavorites}
                                                apiUrl={API_URL}
                                            />
                                        </div>
                                    )}

                                    <div className="w-full md:w-[300px] lg:w-[330px] shrink-0 bg-gray-50">
                                        <img
                                            src={`${API_URL}/program/${program.id}/image`}
                                            alt={program.title}
                                            className="w-full h-64 md:h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 p-6 md:p-7 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pr-14">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {program.category && (
                                                        <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                                                            {program.category.name ?? `Kategooria ${program.category.id}`}
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="hidden sm:inline-flex bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-extrabold">
                                                    {program.pricePerStudent}€ / õpilane
                                                </span>
                                            </div>

                                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3 pr-14">
                                                {program.title}
                                            </h2>

                                            <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                                                {program.description}
                                            </p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                                                <div className="bg-blue-50 border border-sky-100 rounded-xl px-4 py-3">
                                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                                                        Asukoht
                                                    </p>
                                                    <p className="text-sm font-extrabold text-gray-800">
                                                        {program.location}
                                                    </p>
                                                </div>

                                                <div className="bg-blue-50 border border-sky-100 rounded-xl px-4 py-3">
                                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                                                        Kestus
                                                    </p>
                                                    <p className="text-sm font-extrabold text-gray-800">
                                                        {program.durationMinutes} min
                                                    </p>
                                                </div>

                                                <div className="bg-blue-50 border border-sky-100 rounded-xl px-4 py-3">
                                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                                                        Grupi suurus
                                                    </p>
                                                    <p className="text-sm font-extrabold text-gray-800">
                                                        {program.minGroupSize} - {program.maxGroupSize} õpilast
                                                    </p>
                                                </div>

                                                <div className="bg-blue-50 border border-sky-100 rounded-xl px-4 py-3">
                                                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                                                        Keel
                                                    </p>
                                                    <p className="text-sm font-extrabold text-gray-800">
                                                        {program.language}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <div className="flex flex-wrap gap-2">
                                                {program.targetGroup && (
                                                    <span className="border border-sky-100 bg-white text-gray-700 px-3 py-1 rounded-md text-xs font-bold">
                                                        {program.targetGroup}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                href={`/programs/${program.id}`}
                                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                                            >
                                                Vaata ja broneeri
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12">
                        <Pagination page={page} totalPages={totalPages} />
                    </div>
                </>
            )}
        </main>
    );
}