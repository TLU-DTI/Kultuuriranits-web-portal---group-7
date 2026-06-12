"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Program } from "@/models/Program";
import { Category } from "@/models/Category";

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;
interface Props {
    program: Program;
    categories: Category[];
}

export function ProgramEditForm({ program, categories }: Props) {
    const router = useRouter();

    const [title, setTitle] = useState(program.title ?? "");
    const [description, setDescription] = useState(program.description ?? "");
    const [price, setPrice] = useState(program.pricePerStudent?.toString() ?? "0");
    const [duration, setDuration] = useState(program.durationMinutes?.toString() ?? "0");
    const [targetGroup, setTargetGroup] = useState(program.targetGroup ?? "");
    const [minGroupSize, setMinGroupSize] = useState(program.minGroupSize?.toString() ?? "1");
    const [maxGroupSize, setMaxGroupSize] = useState(program.maxGroupSize?.toString() ?? "25");
    const [location, setLocation] = useState(program.location ?? "");
    const [language, setLanguage] = useState(program.language ?? "Eesti");
    const [status, setStatus] = useState(program.status ?? "PENDING");
    const [categoryId, setCategoryId] = useState(program.category?.id?.toString() ?? "");

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData();

            const programData = {
                id: program.id,
                title: title,
                description: description,
                pricePerStudent: parseFloat(price),
                durationMinutes: parseInt(duration),
                targetGroup: targetGroup,
                minGroupSize: parseInt(minGroupSize),
                maxGroupSize: parseInt(maxGroupSize),
                location: location,
                language: language,
                status: status,
                category: categoryId ? { id: parseInt(categoryId) } : null
            };

            formData.append(
                "program",
                new Blob([JSON.stringify(programData)], { type: "application/json" })
            );

            if (imageFile) {
                formData.append("imageFile", imageFile);
            } else {
                formData.append("imageFile", new Blob([], { type: "application/octet-stream" }));
            }

            const res = await fetch(`${API_URL}/program/${program.id}`, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });

            if (res.ok) {
                setMessage("Programm edukalt uuendatud!");
                router.refresh();
                setTimeout(() => router.push("/cultural_institution"), 1500);
            } else {
                const errorText = await res.text();
                setMessage(`Viga: ${errorText || "Uuendamine ebaõnnestus"}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("Võrguviga bäkendiga ühendumisel.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px", paddingBottom: "4px" }}>
            {message && <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#f0f0f0", fontWeight: "bold" }}>{message}</div>}

            {/* Pealkiri ja Staatus kõrvuti */}
            <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Programmi pealkiri</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Staatus</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "white" }}>
                        <option value="Active">ACTIVE</option>
                        <option value="Inactive">INACTIVE</option>
                    </select>
                </div>
            </div>

            {/* Kategooria valik */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Kategooria</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "white" }}>
                    <option value="">-- Vali kategooria --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Kirjeldus */}
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Kirjeldus</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
            </div>

            {/* Hind, Kestus, Keel */}
            <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Hind õpilasele (€)</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Kestus (min)</label>
                    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Keel</label>
                    <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
            </div>

            {/* Sihtgrupp ja Asukoht */}
            <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Sihtgrupp (nt: 1.-3. klass)</label>
                    <input type="text" value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Asukoht / Aadress</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
            </div>

            {/* Grupi suurused */}
            <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Minimaalne grupi suurus</label>
                    <input type="number" value={minGroupSize} onChange={(e) => setMinGroupSize(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Maksimaalne grupi suurus</label>
                    <input type="number" value={maxGroupSize} onChange={(e) => setMaxGroupSize(e.target.value)} required style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
                </div>
            </div>

            {/* Pildifaili üleslaadimine */}
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontWeight: "bold" }}>Programmi pilt</label>
                <input type="file" accept="image/*" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} style={{ padding: "5px" }} />
                <small style={{ color: "#666" }}>Vali uus pilt ainult siis, kui soovid vana asendada.</small>
            </div>

            {/* Nupp */}
            <button type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: loading ? "#94d3a2" : "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontWeight: "bold", marginTop: "10px" }}>
                {loading ? "Salvestab..." : "Salvesta muudatused"}
            </button>
        </form>
    );
}