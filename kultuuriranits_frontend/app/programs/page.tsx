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
import { MapPin, Clock, Users, Globe } from "lucide-react";
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
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Leia klassile{" "}
          <span className="text-blue-600">sobivaim</span>{" "}
          kultuuriprogramm
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Leia kiiresti koolile sobivad kultuuriprogrammid. Tutvu programmidega
          ning vali klassile sobivaim õppekäik.
        </p>
      </section>

      <section className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">
          <div className="w-full">
            <SearchBar />
          </div>

          <AdvancedFilters
            categories={categories}
            organizations={organizations}
          />
        </div>
      </section>

      <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Kõik programmid
          </h2>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">
            Näitan {resultsText}
          </p>
        </div>

        <Sort />
      </section>

      {programs.length === 0 ? (
        <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl text-gray-600 text-center">
          Andmeid ei õnnestunud laadida või ühtegi programmi ei leitud. Veendu,
          et andmebaas ja backend töötavad.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {programs.map((program) => {
              const infoItems = [
                {
                  label: "Asukoht",
                  value: program.location || "Pole täpsustatud",
                  icon: MapPin,
                },
                {
                  label: "Kestus",
                  value: program.durationMinutes
                    ? `${program.durationMinutes} min`
                    : "Pole täpsustatud",
                  icon: Clock,
                },
                {
                  label: "Grupi suurus",
                  value:
                    program.minGroupSize && program.maxGroupSize
                      ? `${program.minGroupSize} - ${program.maxGroupSize} õpilast`
                      : "Pole täpsustatud",
                  icon: Users,
                },
                {
                  label: "Keel",
                  value: program.language || "Pole täpsustatud",
                  icon: Globe,
                },
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

                  <div className="w-full md:w-[300px] lg:w-[330px] shrink-0 bg-gray-50 flex items-center justify-center">
                    <img
                      src={`${API_URL}/program/${program.id}/image`}
                      alt={program.title}
                      className="w-full h-64 md:h-full object-contain p-4"
                    />
                  </div>

                  <div className="flex-1 p-6 md:p-7 lg:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pr-16">
                        <div className="flex flex-wrap items-center gap-2">
                          {program.category && (
                            <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                              {program.category.name ??
                                `Kategooria ${program.category.id}`}
                            </span>
                          )}
                        </div>

                        <span className="hidden sm:inline-flex bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-extrabold whitespace-nowrap">
                          {program.pricePerStudent}€ / õpilane
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3 pr-16">
                        {program.title}
                      </h2>

                      <p className="text-gray-600 text-base leading-relaxed mb-6 line-clamp-2 max-w-3xl">
                        {program.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6 auto-rows-fr">
                        {infoItems.map((item) => {
                          const Icon = item.icon;

                          return (
                            <div
                              key={item.label}
                              className="h-full min-h-[112px] bg-blue-50 border border-blue-100 rounded-2xl px-4 py-4 shadow-sm flex flex-col"
                            >
                              <div className="flex items-center gap-2 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-white border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4 text-blue-600" />
                                </div>

                                <p className="text-[11px] font-black text-blue-600 uppercase tracking-wide leading-tight">
                                  {item.label}
                                </p>
                              </div>

                              <p className="text-sm font-black text-gray-950 leading-snug break-words mt-auto">
                                {item.value}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-2">
                        {program.targetGroup && (
                          <span className="border border-blue-100 bg-white text-gray-700 px-3 py-1 rounded-md text-xs font-bold">
                            {program.targetGroup}
                          </span>
                        )}
                      </div>

                      <Link
                        href={`/programs/${program.id}`}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                      >
                        Vaata
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