import { Program } from "../models/Program";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";

interface FetchResult {
    content: Program[];
    totalPages: number;
}

async function getPrograms(keyword?: string, page: number = 0): Promise<FetchResult> {
    const baseUrl = keyword
        ? `http://localhost:5050/program/search?keyword=${encodeURIComponent(keyword)}`
        : "http://localhost:5050/program";

    const separator = keyword ? "&" : "?";
    const url = `${baseUrl}${separator}size=3&sort=id,asc&page=${page}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch programs");

    const data = await res.json();

    return {
        content: data.content || [],
        totalPages: data.totalPages || 1
    };
}

export default async function ProgramsPage(props: {
    searchParams: Promise<{ keyword?: string; page?: string }> | { keyword?: string; page?: string };
}) {
    const resolvedParams = 'then' in props.searchParams ? await props.searchParams : props.searchParams;
    const keyword = resolvedParams?.keyword;

    // Loeme lehekülje numbri URL-ist. Kui seda seal pole, on lehekülg 0
    const page = Number(resolvedParams?.page) || 0;

    // Küsime andmed backendist, andes kaasa praeguse lehe ja keywordi
    const { content: programs, totalPages } = await getPrograms(keyword, page);

    return (
        <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Programmid</h1>

            <SearchBar />

            {programs.length === 0 ? (
                <p style={{ color: "gray", fontStyle: "italic" }}>
                    Otsingule &quot;{keyword}&quot; vastavaid programme ei leitud.
                </p>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

                    {programs.map((program) => (
                        <div
                            key={program.id}
                            style={{
                                border: "1px solid gray",
                                padding: "16px",
                                borderRadius: "8px",
                            }}
                        >
                            <h2>{program.title}</h2>
                            <p>{program.description}</p>
                            <p><strong>Hind:</strong> {program.pricePerStudent}€</p>
                            <p><strong>Kestus:</strong> {program.durationMinutes} min</p>
                            <p><strong>Asukoht:</strong> {program.location}</p>
                            <p><strong>Keel:</strong> {program.language}</p>
                            <p><strong>Sihtgrupp:</strong> {program.targetGroup}</p>
                            <p><strong>Grupi suurus:</strong> {program.minGroupSize} - {program.maxGroupSize}</p>
                            <p><strong>Staatus:</strong> {program.status}</p>
                        </div>
                    ))}

                    <Pagination page={page} totalPages={totalPages} />
                </div>
            )}
        </main>
    );
}