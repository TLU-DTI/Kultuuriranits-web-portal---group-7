"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const counties = [
    "Kõik piirkonnad",
    "Harjumaa",
    "Hiiumaa",
    "Ida-Virumaa",
    "Jõgevamaa",
    "Järvamaa",
    "Läänemaa",
    "Lääne-Virumaa",
    "Põlvamaa",
    "Pärnumaa",
    "Raplamaa",
    "Saaremaa",
    "Tartumaa",
    "Valgamaa",
    "Viljandimaa",
    "Võrumaa",
];

const targetGroups = [
    "Vali...",
    "Lasteaed",
    "I kooliaste",
    "II kooliaste",
    "III kooliaste",
    "Gümnaasium",
];

const locations = [
    "Kõik toimumiskohad",
    "Muuseum",
    "Teater",
    "Raamatukogu",
    "Koolis kohapeal",
    "Välitingimustes",
    "Veebis",
];

const prices = [
    "Kõik hinnad",
    "Tasuta",
    "Kuni 5 €",
    "Kuni 10 €",
    "Üle 10 €",
];

const durations = [
    "Kõik",
    "Kuni 45 min",
    "45-90 min",
    "Üle 90 min",
];

const groupSizes = [
    "Kõik suurused",
    "Kuni 15 õpilast",
    "Kuni 30 õpilast",
    "Üle 30 õpilase",
];

interface AdvancedFiltersProps {
    categories: {
        id: number;
        name: string;
    }[];

    organizations: {
        id: number;
        name: string;
        address?: string;
        city?: string;
        state?: string;
        type?: string;
        phone?: string;
        email?: string;
    }[];
}

export function AdvancedFilters({ categories, organizations }: AdvancedFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (
            value &&
            value !== "Vali..." &&
            value !== "Kõik piirkonnad" &&
            value !== "Kõik toimumiskohad" &&
            value !== "Kõik hinnad" &&
            value !== "Kõik" &&
            value !== "Kõik suurused"
        ) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set("page", "0");

        router.push(`/programs?${params.toString()}`);
    };

    const updateCheckbox = (key: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());

        if (checked) {
            params.set(key, "true");
        } else {
            params.delete(key);
        }

        params.set("page", "0");

        router.push(`/programs?${params.toString()}`);
    };

    const updateLanguage = (language: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentLanguages = params.get("languages")?.split(",").filter(Boolean) || [];

        let newLanguages: string[];

        if (checked) {
            newLanguages = [...currentLanguages, language];
        } else {
            newLanguages = currentLanguages.filter((item) => item !== language);
        }

        if (newLanguages.length > 0) {
            params.set("languages", newLanguages.join(","));
        } else {
            params.delete("languages");
        }

        params.set("page", "0");

        router.push(`/programs?${params.toString()}`);
    };

    const clearFilters = () => {
        router.push("/programs");
    };

    const selectedLanguages = searchParams.get("languages")?.split(",") || [];

    const labelStyle: React.CSSProperties = {
        display: "block",
        marginBottom: "8px",
        fontWeight: 500,
    };

    const inputStyle: React.CSSProperties = {
        width: "100%",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid #ddd",
        fontSize: "14px",
        backgroundColor: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
    };

    const checkboxLabelStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginBottom: "16px",
                    boxShadow: "0 4px 8px rgba(37, 99, 235, 0.25)",
                }}
            >
                {isOpen ? "Peida filtrid" : "Näita filtreid"}
            </button>

            {isOpen && (
                <div
                    style={{
                        border: "1px solid black",
                        borderRadius: "24px",
                        padding: "32px",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                        backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "24px",
                        }}
                    >
                        <div></div>

                        <button
                            type="button"
                            onClick={clearFilters}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#2563eb",
                                fontWeight: "bold",
                                cursor: "pointer",
                            }}
                        >
                            Puhasta filtrid
                        </button>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: "28px 24px",
                        }}
                    >
                        <div>
                            <label style={labelStyle}>Kategooriad</label>
                            <select
                                style={inputStyle}
                                value={searchParams.get("categoryId") || ""}
                                onChange={(e) =>
                                    updateParam("categoryId", e.target.value)
                                }
                            >
                                <option value="">Vali...</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Sihtgrupp</label>
                            <select
                                style={inputStyle}
                                value={searchParams.get("targetGroup") || "Vali..."}
                                onChange={(e) =>
                                    updateParam("targetGroup", e.target.value)
                                }
                            >
                                {targetGroups.map((group) => (
                                    <option key={group} value={group}>
                                        {group}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Kuupäev</label>
                            <input
                                type="date"
                                style={inputStyle}
                                value={searchParams.get("date") || ""}
                                onChange={(e) =>
                                    updateParam("date", e.target.value)
                                }
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Maakond</label>
                            <select
                                style={inputStyle}
                                value={searchParams.get("county") || "Kõik piirkonnad"}
                                onChange={(e) =>
                                    updateParam("county", e.target.value)
                                }
                            >
                                {counties.map((county) => (
                                    <option key={county} value={county}>
                                        {county}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{ gridColumn: "span 2" }}>
                            <label style={labelStyle}>Toimumiskoht</label>

                            <select
                                style={inputStyle}
                                value={searchParams.get("organizationId") || ""}
                                onChange={(e) =>
                                    updateParam("organizationId", e.target.value)
                                }
                            >
                                <option value="">Kõik toimumiskohad</option>

                                {organizations.map((organization) => (
                                    <option
                                        key={organization.id}
                                        value={organization.id}
                                    >
                                        {organization.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Hind õpilase kohta</label>
                            <select
                                style={inputStyle}
                                value={searchParams.get("price") || "Kõik hinnad"}
                                onChange={(e) =>
                                    updateParam("price", e.target.value)
                                }
                            >
                                {prices.map((price) => (
                                    <option key={price} value={price}>
                                        {price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Kestus</label>
                            <select
                                style={inputStyle}
                                value={searchParams.get("duration") || "Kõik"}
                                onChange={(e) =>
                                    updateParam("duration", e.target.value)
                                }
                            >
                                {durations.map((duration) => (
                                    <option key={duration} value={duration}>
                                        {duration}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>Grupi suurus</label>
                            <select
                                style={inputStyle}
                                value={
                                    searchParams.get("groupSize") || "Kõik suurused"
                                }
                                onChange={(e) =>
                                    updateParam("groupSize", e.target.value)
                                }
                            >
                                {groupSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "18px",
                            flexWrap: "wrap",
                            marginTop: "28px",
                            paddingTop: "20px",
                            borderTop: "1px solid #eee",
                        }}
                    >
                        {["Eesti", "Inglise", "Vene", "Muu"].map((language) => (
                            <label key={language} style={checkboxLabelStyle}>
                                <input
                                    type="checkbox"
                                    checked={selectedLanguages.includes(language)}
                                    onChange={(e) =>
                                        updateLanguage(language, e.target.checked)
                                    }
                                />
                                {language}
                            </label>
                        ))}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "28px",
                            flexWrap: "wrap",
                            marginTop: "24px",
                        }}
                    >
                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("wheelchair") === "true"}
                                onChange={(e) =>
                                    updateCheckbox("wheelchair", e.target.checked)
                                }
                            />
                            Ligipääs ratastooliga
                        </label>

                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("specialNeeds") === "true"}
                                onChange={(e) =>
                                    updateCheckbox("specialNeeds", e.target.checked)
                                }
                            />
                            Sobib erivajadustega õpilastele
                        </label>

                        <label style={checkboxLabelStyle}>
                            <input
                                type="checkbox"
                                checked={searchParams.get("outdoor") === "true"}
                                onChange={(e) =>
                                    updateCheckbox("outdoor", e.target.checked)
                                }
                            />
                            Välitingimustes
                        </label>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: "32px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => router.refresh()}
                            style={{
                                backgroundColor: "#2563eb",
                                color: "white",
                                border: "none",
                                padding: "12px 24px",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                boxShadow: "0 4px 8px rgba(37, 99, 235, 0.35)",
                            }}
                        >
                            Rakenda filtrid
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};