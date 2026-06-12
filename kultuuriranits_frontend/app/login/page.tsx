"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const API_URL = process.env.NEXT_PUBLIC_BACK_URL || "http://localhost:5050";

            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // VÄGA OLULINE: salvestab sessiooniküpsise brauserisse
            });

            if (!res.ok) {
                // Kui backend tagastab 401 Unauthorized (vale parool või e-mail)
                throw new Error("Vale e-maili aadress või parool.");
            }

            const userData = await res.json();
            const role = userData.role?.name;

            switch (role) {
                case "ADMIN":
                    router.push("/admin");
                    break;
                case "TEACHER":
                    router.push("/");
                    break;
                case "CULTURAL_INSTITUTION":
                    router.push("/");
                    break;
                default:
                    router.push("/programs");
            }

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Midagi läks sisselogimisel valesti.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2 style={{ marginBottom: "20px" }}>Logi sisse</h2>

            {error && <p style={{ color: "red", backgroundColor: "#ffebee", padding: "10px", borderRadius: "4px" }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>E-mail</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div>
                    <label style={{ display: "block", marginBottom: "5px" }}>Parool</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px",
                        backgroundColor: loading ? "#ccc" : "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: loading ? "not-allowed" : "pointer",
                        marginTop: "10px",
                    }}
                >
                    {loading ? "Palun oota..." : "Logi sisse"}
                </button>
            </form>
        </div>
    );
}