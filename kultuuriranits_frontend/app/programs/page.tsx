import { Program } from "../../models/Program";
import { SearchBar } from "../../components/SearchBar";
import { Pagination } from "../../components/Pagination";
import { Sort } from "../../components/Sort";
import { Category } from "../../models/Category";
import { AdvancedFilters } from "../../components/AdvancedFilter";
import { Organization } from "../../models/Organization";
import { TeacherProgramActions } from "../../components/TeacherProgramActions";
import { ProgramCard } from "../../components/ProgramCard";
import { getCurrentUser } from "../lib/auth";
import { getUserFavorites } from "../lib/favorites";

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
    const res = await fetch(`${API_URL}/category`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch (error) {
    console.error("Viga kategooriate pärimisel backendist:", error);
    return [];
  }
}

async function getOrganizations(): Promise<Organization[]> {
  try {
    const res = await fetch(`${API_URL}/organization`, { cache: "no-store" });
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
    const params = new URLSearchParams({ page: String(page), size: String(size), sort });

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

    const res = await fetch(`${baseUrl}?${params.toString()}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Backend tagastas vea staatuse: ${res.status}`);
      return { content: [], totalPages: 1 };
    }

    const data = await res.json();
    return { content: data.content ?? [], totalPages: data.totalPages ?? 1 };
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

  const [programData, categories, organizations, currentUser] = await Promise.all([
    getPrograms(
      keyword, page, sort, size, categoryId, organizationId, targetGroup,
      date, county, location, duration, minDurationMinutes, maxDurationMinutes,
      minGroupSize, maxGroupSize, language, wheelchair, specialNeeds,
      minPricePerStudent, maxPricePerStudent, outdoor
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

        <AdvancedFilters categories={categories} organizations={organizations} />
      </div>

      {programs.length === 0 ? (
        <div className="p-8 bg-gray-50 border border-gray-100 rounded-2xl text-gray-600 text-center">
          Andmeid ei õnnestunud laadida või ühtegi programmi ei leitud. Veendu,
          et andmebaas ja backend töötavad.
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-8">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                apiUrl={API_URL}
                actions={
                  isTeacher && currentUser ? (
                    <TeacherProgramActions
                      programId={program.id}
                      personId={currentUser.id}
                      favorites={userFavorites}
                      apiUrl={API_URL}
                    />
                  ) : undefined
                }
              />
            ))}
          </div>

          <div className="mt-12">
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </>
      )}
    </main>
  );
}