import { Program } from "../models/Program"

async function getPrograms(): Promise<Program[]> {
    const res = await fetch("http://localhost:5050/program", {
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Failed to fetch programs")
    }

    return res.json()
}

export default async function ProgramsPage() {
    const programs = await getPrograms()

    return (
        <main style={{ padding: "20px" }}>
            <h1>Programmid</h1>

            {programs.map((program) => (
                <div
                    key={program.id}
                    style={{
                        border: "1px solid gray",
                        padding: "16px",
                        marginBottom: "16px",
                        borderRadius: "8px",
                    }}
                >
                    <h2>{program.title}</h2>

                    <p>{program.description}</p>

                    <p>
                        <strong>Hind:</strong> {program.pricePerStudent}€
                    </p>

                    <p>
                        <strong>Kestus:</strong> {program.durationMinutes} min
                    </p>

                    <p>
                        <strong>Asukoht:</strong> {program.location}
                    </p>

                    <p>
                        <strong>Keel:</strong> {program.language}
                    </p>

                    <p>
                        <strong>Sihtgrupp:</strong> {program.targetGroup}
                    </p>

                    <p>
                        <strong>Grupi suurus:</strong>{" "}
                        {program.minGroupSize} - {program.maxGroupSize}
                    </p>

                    <p>
                        <strong>Staatus:</strong> {program.status}
                    </p>
                </div>
            ))}
        </main>
    )
}