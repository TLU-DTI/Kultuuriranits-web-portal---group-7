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


// const locations = [
//   "Kõik toimumiskohad",
//   "Muuseum",
//   "Teater",
//   "Raamatukogu",
//   "Koolis kohapeal",
//   "Välitingimustes",
//   "Veebis",
// ];


const prices = [
  { label: "Kõik", min: undefined, max: undefined },
  { label: "Tasuta", max: 0 },
  { label: "Kuni 5€", max: 5 },
  { label: "Kuni 10", max: 10 },
  { label: "Üle 10€", min: 10 },
];


const durations = [
  { label: "Kõik", min: undefined, max: undefined },
  { label: "Kuni 45 min", max: 45 },
  { label: "45-90 min", min: 45, max: 90 },
  { label: "Üle 90 min", min: 90 },
];


const groupSizes = [
  { label: "Kõik suurused", min: undefined, max: undefined },
  { label: "Kuni 15 õpilast", max: 15 },
  { label: "Kuni 30 õpilast", max: 30 },
  { label: "Üle 30 õpilase", min: 31 },
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



export function AdvancedFilters({
  categories,
  organizations,
}: AdvancedFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [durationLabel, setDurationLabel] = useState("Kõik");
  const [priceLabel, setPriceLabel] = useState("Kõik hinnad");
  const [groupLabel, setGroupLabel] = useState("Kõik suurused");

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
    const currentLanguage =
      params.get("language")?.split(",").filter(Boolean) || [];


    let newLanguage: string[];


    if (checked) {
      newLanguage = [...currentLanguage, language];
    } else {
      newLanguage = currentLanguage.filter((item) => item !== language);
    }


    if (newLanguage.length > 0) {
      params.set("language", newLanguage.join(","));
    } else {
      params.delete("language");
    }


    params.set("page", "0");


    router.push(`/programs?${params.toString()}`);
  };


  const clearFilters = () => {
    router.push("/programs");
  };


  const selectedLanguage = searchParams.get("language")?.split(",") || [];


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
  //kui tahame et refreshil labelid alles jääks peab nii tegema
  // const durationLabel =
  // durations.find(
  //   (d) =>
  //     d.min?.toString() === searchParams.get("minDurationMinutes") &&
  //     d.max?.toString() === searchParams.get("maxDurationMinutes")
  // )?.label || "Kõik";


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
                onChange={(e) => updateParam("categoryId", e.target.value)}
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
                onChange={(e) => updateParam("targetGroup", e.target.value)}
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
                onChange={(e) => updateParam("date", e.target.value)}
              />
            </div>


            <div>
              <label style={labelStyle}>Maakond</label>
              <select
                style={inputStyle}
                value={searchParams.get("county") || "Kõik piirkonnad"}
                onChange={(e) => updateParam("county", e.target.value)}
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
                onChange={(e) => updateParam("organizationId", e.target.value)}
              >
                <option value="">Kõik toimumiskohad</option>


                {organizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label style={labelStyle}>Hind õpilase kohta</label>
              <select
                style={inputStyle}
                value={priceLabel}
                onChange={(e) => {
                  const selected = prices.find(
                    (price) => price.label === e.target.value,
                  );
                  //console.log("selected", selected);
                  if (!selected) return;
                  setPriceLabel(selected.label)
                  const params = new URLSearchParams(searchParams.toString());


                  params.delete("minPricePerStudent");
                  params.delete("maxPricePerStudent");
                  console.log("selected", selected);
                  if (selected.min !== undefined) {
                    params.set("minPricePerStudent", String(selected.min));
                  }


                  if (selected.max !== undefined) {
                    params.set("maxPricePerStudent", String(selected.max));
                  }
                  // console.log([...params.entries()]);
                  router.push(`/programs?${params.toString()}`);
                }}
              >
                {prices.map((price) => (
                  <option key={price.label} value={price.label}>
                    {price.label}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label style={labelStyle}>Kestus</label>
              <select
                style={inputStyle}
                value={durationLabel}
                onChange={(e) => {
                  const selected = durations.find(
                    (duration) => duration.label === e.target.value,
                  );

                  const params = new URLSearchParams(searchParams.toString());
                  if (!selected) return;
                  setDurationLabel(selected.label);

                  params.delete("minDurationMinutes");
                  params.delete("maxDurationMinutes");
                  console.log("selected", selected);
                  if (selected.min !== undefined) {
                    params.set("minDurationMinutes", String(selected.min));
                  }


                  if (selected.max !== undefined) {
                    params.set("maxDurationMinutes", String(selected.max));
                  }

                  router.push(`/programs?${params.toString()}`);
                }}
              >
                {durations.map((duration) => (
                  <option key={duration.label} value={duration.label}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label style={labelStyle}>Grupi suurus</label>
              <select
                style={inputStyle}
                value={groupLabel}
                onChange={(e) => {
                  const selected = groupSizes.find(
                    (groupSize) => groupSize.label === e.target.value,
                  );


                  const params = new URLSearchParams(searchParams.toString());
                  if (!selected) return;
                  setGroupLabel(selected.label);
                  params.delete("minGroupSize");
                  params.delete("maxGroupSize");
                  console.log("selected", selected);
                  if (selected.min !== undefined) {
                    params.set("minGroupSize", String(selected.min));
                  }


                  if (selected.max !== undefined) {
                    params.set("maxGroupSize", String(selected.max));
                  }
                  // console.log([...params.entries()]);
                  router.push(`/programs?${params.toString()}`);
                }}
              >
                {groupSizes.map((size) => (
                  <option key={size.label} value={size.label}>
                    {size.label}
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
                  checked={selectedLanguage.includes(language)}
                  onChange={(e) => updateLanguage(language, e.target.checked)}
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
                onChange={(e) => updateCheckbox("wheelchair", e.target.checked)}
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
                onChange={(e) => updateCheckbox("outdoor", e.target.checked)}
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
  );
}








