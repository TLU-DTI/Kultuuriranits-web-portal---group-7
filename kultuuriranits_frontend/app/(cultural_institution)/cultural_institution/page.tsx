"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  MessageSquare,
  BarChart3,
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  Star,
  UserRound,
  CalendarDays,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

import {
  InstitutionProgramCard,
  type InstitutionProgram,
} from "@/components/InstitutionProgramCard";
import { ProgramAddForm } from "@/components/ProgramAddForm";
import { getCategories } from "@/app/lib/category";

const CHART_COLORS = [
  "#2563eb",
  "#16a34a",
  "#f97316",
  "#9333ea",
  "#dc2626",
  "#0891b2",
];

type DashboardTab = "programs" | "feedback" | "statistics" | "addProgram";

type Organization = {
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  type?: string;
  phone?: string;
  email?: string;
};

type CurrentUser = {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  organization?: Organization | null;
  role?: {
    id: number;
    name: string;
  };
};

type ProgramResponse = {
  content?: InstitutionProgram[];
  totalPages?: number;
};

type FeedbackPerson = {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

type Feedback = {
  id: number;
  text: string;
  rating: number;
  createdAt?: string;
  program?: InstitutionProgram | null;
  person?: FeedbackPerson | null;
};

const API_URL = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5050";

const PROGRAMS_PER_PAGE = 4;

const categories = await getCategories();

const STATUS_ACTIVE = "Active";
const STATUS_INACTIVE = "Inactive";

const isProgramPublished = (status?: string | null) => {
  return (
    status?.toLowerCase() === "active" ||
    status?.toLowerCase() === "published" ||
    status?.toLowerCase() === "avalikustatud"
  );
};

const getNormalizedStatus = (status?: string | null) => {
  return isProgramPublished(status) ? STATUS_ACTIVE : STATUS_INACTIVE;
};

export default function CulturalInstitutionDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("programs");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [programs, setPrograms] = useState<InstitutionProgram[]>([]);
  const [search, setSearch] = useState("");
  const [publishedOnly, setPublishedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackProgramFilter, setFeedbackProgramFilter] = useState("all");
  const [feedbackRatingFilter, setFeedbackRatingFilter] = useState("all");
  const [feedbackSort, setFeedbackSort] = useState("newest");

  const statusChartData = useMemo(() => {
    const counts: Record<string, number> = {};

    programs.forEach((program) => {
      const status = getNormalizedStatus(program.status);
      counts[status] = (counts[status] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [programs]);

  const categoryChartData = useMemo(() => {
    const counts: Record<string, number> = {};

    programs.forEach((program) => {
      const category = program.category?.name || "Kategooria puudub";
      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [programs]);

  const priceChartData = useMemo(() => {
    return programs.map((program) => ({
      name:
        program.title.length > 18
          ? `${program.title.slice(0, 18)}...`
          : program.title,
      price: Number(program.pricePerStudent || 0),
    }));
  }, [programs]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDashboardData() {
      try {
        setLoading(true);
        setErrorMessage("");

        const meResponse = await fetch(`${API_URL}/me`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (meResponse.status === 401 || meResponse.status === 403) {
          setCurrentUser(null);
          setPrograms([]);
          setErrorMessage("Töölaua vaatamiseks pead olema sisse logitud.");
          return;
        }

        if (!meResponse.ok) {
          throw new Error(`Kasutaja päring ebaõnnestus: ${meResponse.status}`);
        }

        const userData: CurrentUser = await meResponse.json();
        setCurrentUser(userData);

        const organizationId = userData.organization?.id;

        if (!organizationId) {
          setPrograms([]);
          setErrorMessage("Kasutajaga ei ole seotud kultuuriasutust.");
          return;
        }

        const programsResponse = await fetch(
          `${API_URL}/program?page=0&size=200&sort=id,desc`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!programsResponse.ok) {
          throw new Error(
            `Programmide päring ebaõnnestus: ${programsResponse.status}`,
          );
        }

        const programsData: ProgramResponse | InstitutionProgram[] =
          await programsResponse.json();

        const allPrograms = Array.isArray(programsData)
          ? programsData
          : (programsData.content ?? []);

        const ownPrograms = allPrograms.filter((program) => {
          return program.organization?.id === organizationId;
        });

        setPrograms(ownPrograms);

        const feedbackResponse = await fetch(`${API_URL}/feedback`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        if (feedbackResponse.ok) {
          const feedbackData: Feedback[] = await feedbackResponse.json();
          setFeedbacks(feedbackData);
        } else {
          setFeedbacks([]);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Töölaua andmete laadimine ebaõnnestus:", error);
          setErrorMessage(error.message);
        }

        setPrograms([]);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      controller.abort();
    };
  }, []);

  const organizationId = currentUser?.organization?.id;

  const handleDeleteProgram = async (id: number, title: string) => {
    const confirmDelete = window.confirm(
      `Kas oled kindel, et soovid programmi "${title}" jäädavalt kustutada?`,
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/program/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setPrograms((prevPrograms) =>
          prevPrograms.filter((program) => program.id !== id),
        );

        alert("Programm edukalt kustutatud!");
      } else {
        const errorText = await res.text();
        alert(`Kustutamine ebaõnnestus: ${errorText || "Viga serveris"}`);
      }
    } catch (error) {
      console.error("Viga kustutamisel:", error);
      alert("Võrguviga programmi kustutamisel.");
    }
  };

  const handleToggleProgramVisibility = async (
    programToUpdate: InstitutionProgram,
  ) => {
    const isCurrentlyPublished = isProgramPublished(programToUpdate.status);

    const nextStatus = isCurrentlyPublished ? STATUS_INACTIVE : STATUS_ACTIVE;

    const confirmed = window.confirm(
      isCurrentlyPublished
        ? `Kas soovid muuta programmi "${programToUpdate.title}" mitteavalikuks?`
        : `Kas soovid muuta programmi "${programToUpdate.title}" avalikuks?`,
    );

    if (!confirmed) return;

    if (!programToUpdate.imageName) {
      alert(
        "Seda programmi ei saa olemasoleva update endpointiga muuta, sest programmil puudub pilt. Backend ootab update päringus imageFile osa.",
      );
      return;
    }

    try {
      const imageResponse = await fetch(
        `${API_URL}/program/${programToUpdate.id}/image`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        },
      );

      if (!imageResponse.ok) {
        alert("Olemasoleva pildi laadimine ebaõnnestus.");
        return;
      }

      const imageBlob = await imageResponse.blob();

      const updatedProgram = {
        ...programToUpdate,
        status: nextStatus,
      };

      const formData = new FormData();

      formData.append(
        "program",
        new Blob([JSON.stringify(updatedProgram)], {
          type: "application/json",
        }),
      );

      formData.append(
        "imageFile",
        imageBlob,
        programToUpdate.imageName || `program-${programToUpdate.id}.jpg`,
      );

      const res = await fetch(`${API_URL}/program/${programToUpdate.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert(`Staatuse muutmine ebaõnnestus: ${errorText || "Viga serveris"}`);
        return;
      }

      setPrograms((prevPrograms) =>
        prevPrograms.map((program) =>
          program.id === programToUpdate.id
            ? {
                ...program,
                status: nextStatus,
              }
            : program,
        ),
      );
    } catch (error) {
      console.error("Viga programmi staatuse muutmisel:", error);
      alert("Võrguviga programmi staatuse muutmisel.");
    }
  };

  const institutionName = currentUser?.organization?.name ?? "Minu asutus";

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        program.title.toLowerCase().includes(searchValue) ||
        program.description.toLowerCase().includes(searchValue) ||
        program.location.toLowerCase().includes(searchValue) ||
        program.targetGroups.some((group) =>
          group.toLowerCase().includes(searchValue.toLowerCase()),
        );

      const matchesPublished = publishedOnly
        ? isProgramPublished(program.status)
        : true;

      return matchesSearch && matchesPublished;
    });
  }, [programs, search, publishedOnly]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPrograms.length / PROGRAMS_PER_PAGE),
  );

  const paginatedPrograms = useMemo(() => {
    const start = (currentPage - 1) * PROGRAMS_PER_PAGE;
    const end = start + PROGRAMS_PER_PAGE;

    return filteredPrograms.slice(start, end);
  }, [filteredPrograms, currentPage]);

  const activeProgramsCount = programs.filter((program) =>
    isProgramPublished(program.status),
  ).length;

  const ownProgramIds = useMemo(() => {
    return new Set(programs.map((program) => program.id));
  }, [programs]);

  const institutionFeedbacks = useMemo(() => {
    return feedbacks
      .filter((feedback) => {
        const feedbackProgramId = feedback.program?.id;

        if (!feedbackProgramId) return false;

        return ownProgramIds.has(feedbackProgramId);
      })
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      });
  }, [feedbacks, ownProgramIds]);

  const filteredFeedbacks = useMemo(() => {
    let result = [...institutionFeedbacks];

    if (feedbackSearch.trim()) {
      const searchValue = feedbackSearch.toLowerCase();

      result = result.filter((feedback) => {
        const programTitle = feedback.program?.title?.toLowerCase() || "";
        const feedbackText = feedback.text?.toLowerCase() || "";
        const author = getFeedbackAuthor(feedback.person).toLowerCase();

        return (
          programTitle.includes(searchValue) ||
          feedbackText.includes(searchValue) ||
          author.includes(searchValue)
        );
      });
    }

    if (feedbackProgramFilter !== "all") {
      result = result.filter(
        (feedback) => String(feedback.program?.id) === feedbackProgramFilter,
      );
    }

    if (feedbackRatingFilter !== "all") {
      const rating = Number(feedbackRatingFilter);

      result = result.filter((feedback) => Number(feedback.rating) === rating);
    }

    result.sort((a, b) => {
      if (feedbackSort === "oldest") {
        return (
          new Date(a.createdAt || "").getTime() -
          new Date(b.createdAt || "").getTime()
        );
      }

      if (feedbackSort === "rating-high") {
        return Number(b.rating || 0) - Number(a.rating || 0);
      }

      if (feedbackSort === "rating-low") {
        return Number(a.rating || 0) - Number(b.rating || 0);
      }

      if (feedbackSort === "program-az") {
        return (a.program?.title || "").localeCompare(b.program?.title || "");
      }

      return (
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime()
      );
    });

    return result;
  }, [
    institutionFeedbacks,
    feedbackSearch,
    feedbackProgramFilter,
    feedbackRatingFilter,
    feedbackSort,
  ]);

  const feedbackProgramOptions = useMemo(() => {
    const map = new Map<number, string>();

    institutionFeedbacks.forEach((feedback) => {
      if (feedback.program?.id && feedback.program?.title) {
        map.set(feedback.program.id, feedback.program.title);
      }
    });

    return Array.from(map.entries()).map(([id, title]) => ({
      id,
      title,
    }));
  }, [institutionFeedbacks]);

  const averageFeedbackRating = useMemo(() => {
    if (institutionFeedbacks.length === 0) return 0;

    const sum = institutionFeedbacks.reduce(
      (total, feedback) => total + Number(feedback.rating || 0),
      0,
    );

    return sum / institutionFeedbacks.length;
  }, [institutionFeedbacks]);

  const programsWithFeedbackCount = useMemo(() => {
    return new Set(
      institutionFeedbacks
        .map((feedback) => feedback.program?.id)
        .filter(Boolean),
    ).size;
  }, [institutionFeedbacks]);

  const formatFeedbackDate = (date?: string) => {
    if (!date) return "Kuupäev puudub";

    return new Date(date).toLocaleDateString("et-EE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getFeedbackAuthor = (person?: FeedbackPerson | null) => {
    if (!person) return "Anonüümne kasutaja";

    const fullName =
      `${person.firstName || ""} ${person.lastName || ""}`.trim();

    return fullName || person.email || "Anonüümne kasutaja";
  };

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }

  function goToNextPage() {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-8">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-wider text-blue-700 mb-2">
              Kultuuriasutuse töölaud
            </p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {institutionName}
            </h1>

            <p className="mt-3 text-gray-600 max-w-2xl">
              Siin saad hallata oma kultuuriasutuse programme, vaadata
              tagasisidet ja jälgida statistikat.
            </p>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("programs")}
              className={`inline-flex items-center gap-2 px-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === "programs"
                  ? "text-blue-700 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Programmid
              <span className="inline-flex items-center justify-center min-w-6 h-6 rounded-full bg-gray-100 px-2 text-xs text-gray-600">
                {programs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("feedback")}
              className={`inline-flex items-center gap-2 px-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === "feedback"
                  ? "text-blue-700 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Tagasiside
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("statistics")}
              className={`inline-flex items-center gap-2 px-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === "statistics"
                  ? "text-blue-700 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Statistika
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("addProgram")}
              className={`inline-flex items-center gap-2 px-1 py-4 text-sm font-bold border-b-2 transition ${
                activeTab === "addProgram"
                  ? "text-blue-700 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-800"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Lisa uus programm
            </button>
          </div>
        </div>

        {activeTab === "programs" && (
          <>
            <div className="rounded-3xl bg-white border border-gray-200 p-4 md:p-5 shadow-sm mb-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col md:flex-row gap-4 md:items-center w-full lg:max-w-3xl">
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

                    <input
                      type="text"
                      placeholder="Otsi..."
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                    />
                  </div>

                  <label className="inline-flex items-center gap-3 text-sm font-semibold text-gray-700 whitespace-nowrap cursor-pointer">
                    <input
                      type="checkbox"
                      checked={publishedOnly}
                      onChange={(event) => {
                        setPublishedOnly(event.target.checked);
                        setCurrentPage(1);
                      }}
                      className="w-5 h-5 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    />
                    Avalikustatud
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("addProgram")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition shadow-sm"
                >
                  <PlusCircle className="w-4 h-4" />
                  Lisa uus programm
                </button>
              </div>
            </div>

            {loading && (
              <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center text-gray-500 font-medium">
                Laetakse programme...
              </div>
            )}

            {!loading && errorMessage && (
              <div className="rounded-3xl bg-white border border-red-100 shadow-sm p-8 mb-6">
                <h2 className="text-xl font-extrabold text-gray-900 mb-2">
                  Programme ei saanud laadida
                </h2>

                <p className="text-red-600 text-sm">{errorMessage}</p>
              </div>
            )}

            {!loading && !errorMessage && paginatedPrograms.length === 0 && (
              <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center">
                <div className="max-w-xl mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-5">
                    <BookOpen className="w-8 h-8" />
                  </div>

                  <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                    Programme ei ole veel kuvada
                  </h2>

                  <p className="text-gray-500 mb-6">
                    Selle kultuuriasutusega seotud programme ei leitud või need
                    ei vasta filtritele.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("addProgram")}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 transition"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Lisa esimene programm
                  </button>
                </div>
              </div>
            )}

            {!loading && paginatedPrograms.length > 0 && (
              <div className="space-y-5">
                {paginatedPrograms.map((program) => (
                  <InstitutionProgramCard
                    key={program.id}
                    program={program}
                    apiUrl={API_URL}
                    onDelete={handleDeleteProgram}
                    onToggleVisibility={handleToggleProgramVisibility}
                  />
                ))}
              </div>
            )}

            {!loading && filteredPrograms.length > 0 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                  Leht {currentPage} / {totalPages}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Eelmine
                  </button>

                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Järgmine
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "feedback" && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Tagasiside
              </h2>

              <p className="text-gray-500">
                Siin näed tagasisidet, mis on jäetud sinu kultuuriasutuse
                programmidele.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Tagasisidet kokku
                </p>

                <p className="mt-5 text-5xl font-extrabold text-gray-900">
                  {institutionFeedbacks.length}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Keskmine hinne
                </p>

                <div className="mt-5 flex items-end gap-2">
                  <p className="text-5xl font-extrabold text-gray-900">
                    {institutionFeedbacks.length > 0
                      ? averageFeedbackRating.toFixed(1)
                      : "—"}
                  </p>

                  {institutionFeedbacks.length > 0 && (
                    <div className="pb-2 flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-yellow-500" />
                      <span className="text-sm font-bold text-gray-500">
                        / 5
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Programme tagasisidega
                </p>

                <p className="mt-5 text-5xl font-extrabold text-gray-900">
                  {programsWithFeedbackCount}
                </p>
              </div>
            </div>

            {institutionFeedbacks.length === 0 ? (
              <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-5">
                  <MessageSquare className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                  Tagasisidet pole veel
                </h3>

                <p className="text-gray-500 max-w-xl mx-auto">
                  Kui õpetajad jätavad sinu kultuuriasutuse programmidele
                  hinnanguid või kommentaare, kuvatakse need siin.
                </p>
              </div>
            ) : (
              <>
                <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-4 md:p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />

                      <input
                        type="text"
                        placeholder="Otsi tagasisidet, programmi või õpetajat..."
                        value={feedbackSearch}
                        onChange={(event) =>
                          setFeedbackSearch(event.target.value)
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                      />
                    </div>

                    <select
                      value={feedbackProgramFilter}
                      onChange={(event) =>
                        setFeedbackProgramFilter(event.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
                    >
                      <option value="all">Kõik programmid</option>

                      {feedbackProgramOptions.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.title}
                        </option>
                      ))}
                    </select>

                    <select
                      value={feedbackRatingFilter}
                      onChange={(event) =>
                        setFeedbackRatingFilter(event.target.value)
                      }
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
                    >
                      <option value="all">Kõik hinded</option>
                      <option value="5">5 tärni</option>
                      <option value="4">4 tärni</option>
                      <option value="3">3 tärni</option>
                      <option value="2">2 tärni</option>
                      <option value="1">1 tärn</option>
                    </select>

                    <select
                      value={feedbackSort}
                      onChange={(event) => setFeedbackSort(event.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 cursor-pointer"
                    >
                      <option value="newest">Uuemad enne</option>
                      <option value="oldest">Vanemad enne</option>
                      <option value="rating-high">Kõrgem hinne enne</option>
                      <option value="rating-low">Madalam hinne enne</option>
                      <option value="program-az">Programm A-Z</option>
                    </select>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-gray-500">
                      Kuvan{" "}
                      <span className="font-bold text-gray-900">
                        {filteredFeedbacks.length}
                      </span>{" "}
                      tagasisidet
                    </p>

                    {(feedbackSearch ||
                      feedbackProgramFilter !== "all" ||
                      feedbackRatingFilter !== "all" ||
                      feedbackSort !== "newest") && (
                      <button
                        type="button"
                        onClick={() => {
                          setFeedbackSearch("");
                          setFeedbackProgramFilter("all");
                          setFeedbackRatingFilter("all");
                          setFeedbackSort("newest");
                        }}
                        className="text-sm font-extrabold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                      >
                        Puhasta filtrid
                      </button>
                    )}
                  </div>
                </div>

                {filteredFeedbacks.length === 0 ? (
                  <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto mb-5">
                      <MessageSquare className="w-8 h-8" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
                      Filtritele vastavat tagasisidet ei leitud
                    </h3>

                    <p className="text-gray-500 max-w-xl mx-auto">
                      Proovi otsingut muuta või puhasta filtrid, et näha kõiki
                      tagasisidesid.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {filteredFeedbacks.map((feedback) => (
                      <article
                        key={feedback.id}
                        className="bg-white border-2 border-black rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out overflow-hidden p-6 md:p-8"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 text-yellow-700 px-3 py-1 text-xs font-extrabold">
                                <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                {feedback.rating}/5
                              </span>

                              {feedback.program?.title && (
                                <span className="inline-flex rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
                                  {feedback.program.title}
                                </span>
                              )}
                            </div>

                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                              {feedback.program?.title || "Programm puudub"}
                            </h3>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <div className="inline-flex items-center gap-2">
                              <UserRound className="w-4 h-4" />
                              <span>{getFeedbackAuthor(feedback.person)}</span>
                            </div>

                            <div className="inline-flex items-center gap-2">
                              <CalendarDays className="w-4 h-4" />
                              <span>
                                {formatFeedbackDate(feedback.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
                          <p className="text-gray-700 leading-relaxed">
                            {feedback.text || "Kommentaar puudub."}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {activeTab === "addProgram" && (
          <section className="rounded-3xl bg-white border border-gray-200 shadow-sm p-10">
            <ProgramAddForm
              categories={categories}
              organizationId={organizationId}
            />
          </section>
        )}

        {activeTab === "statistics" && (
          <section className="space-y-6">
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                Statistika
              </h2>

              <p className="text-gray-500">
                Statistika põhineb hetkel laaditud kultuuriasutuse programmidel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Programme kokku
                </p>

                <p className="mt-5 text-5xl font-extrabold text-gray-900">
                  {programs.length}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Avalikustatud
                </p>

                <p className="mt-5 text-5xl font-extrabold text-gray-900">
                  {activeProgramsCount}
                </p>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">
                  Keskmine hind
                </p>

                <p className="mt-5 text-5xl font-extrabold text-gray-900">
                  {programs.length > 0
                    ? `${Math.round(
                        programs.reduce(
                          (sum, program) =>
                            sum + Number(program.pricePerStudent || 0),
                          0,
                        ) / programs.length,
                      )}€`
                    : "—"}
                </p>
              </div>
            </div>

            {programs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-4" />

                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  Statistikat pole veel kuvada
                </h3>

                <p className="text-gray-500">
                  Kui kultuuriasutusel on programmid olemas, kuvatakse siin
                  graafikud.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    Programmid staatuse järgi
                  </h3>

                  <p className="text-sm text-gray-500 mb-6">
                    Näitab, mitu programmi on igas staatuses.
                  </p>

                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={statusChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis allowDecimals={false} stroke="#6b7280" />
                        <Tooltip />
                        <Bar
                          dataKey="value"
                          fill="#2563eb"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    Programmid kategooriate järgi
                  </h3>

                  <p className="text-sm text-gray-500 mb-6">
                    Näitab programmide jaotust kategooriate kaupa.
                  </p>

                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie
                          data={categoryChartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={110}
                          label
                        >
                          {categoryChartData.map((entry, index) => (
                            <Cell
                              key={`category-${entry.name}-${index}`}
                              fill={CHART_COLORS[index % CHART_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="xl:col-span-2 rounded-3xl bg-white border border-gray-200 shadow-sm p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">
                    Programmi hind õpilase kohta
                  </h3>

                  <p className="text-sm text-gray-500 mb-6">
                    Võrdleb kultuuriasutuse programmide hindu.
                  </p>

                  <div className="h-[360px]">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={priceChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar
                          dataKey="price"
                          fill="#16a34a"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}