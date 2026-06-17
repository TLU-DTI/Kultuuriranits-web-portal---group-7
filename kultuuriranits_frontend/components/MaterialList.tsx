"use client";

import { useState } from "react";
import { Material } from "@/models/Material";
import { Trash2, FileText, Download } from "lucide-react";

export interface MaterialListProps {
    initialMaterials: Material[];
    isAdmin: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function MaterialList({ initialMaterials, isAdmin }: MaterialListProps) {
    const [materials, setMaterials] = useState<Material[]>(initialMaterials);

    const handleValueDelete = async (id: number) => {
        if (!confirm("Kas oled kindel, et soovid selle õppematerjali kustutada?")) return;

        try {
            const res = await fetch(`${API_URL}/material/${id}`, {
                method: "DELETE",
                credentials: "include"
            });

            if (res.ok) {
                try {
                    const data = await res.json();
                    setMaterials(data);
                } catch {
                    setMaterials(prev => prev.filter(m => m.id !== id));
                }
            } else {
                alert("Kustutamine ebaõnnestus. Sul puuduvad õigused või tekkis serveri viga.");
            }
        } catch (error) {
            console.error("Viga teavituse kustutamisel:", error);
        }
    };

    if (materials.length === 0) {
        return (
            <p className="text-gray-500 italic text-center py-8">
                Õppematerjale ei ole hetkel kättesaadaval.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {materials.map((item) => (
                <div
                    key={item.id}
                    className="p-5 bg-white rounded-xl shadow-xs border border-gray-100 flex justify-between items-center gap-4 transition-all hover:shadow-md group/mat"
                >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-150 group-hover/mat:border-gray-300 group-hover/mat:bg-white transition-all text-gray-400 shrink-0 shadow-xs">
                            <FileText className="w-5 h-5 text-gray-500" />
                        </div>

                        <div className="flex flex-col min-w-0">
                            <a
                                href={`${API_URL}/material/${item.id}/download`}
                                download
                                className="text-base font-extrabold text-gray-800 hover:text-blue-600 transition-colors text-left cursor-pointer group-hover/mat:text-blue-600 flex items-center gap-1.5"
                            >
                                <span className="truncate max-w-[250px] sm:max-w-md">
                                    {item.name || "Pealkirjata material"}
                                </span>
                                <Download className="w-3.5 h-3.5 opacity-0 group-hover/mat:opacity-100 transition-opacity text-blue-500 shrink-0" />
                            </a>

                            <p className="text-xs text-gray-400 mt-0.5">
                                {item.fileType || "Dokument"}
                            </p>
                        </div>
                    </div>

                    {/* Kustutamise nupp adminile */}
                    {isAdmin && (
                        <button
                            onClick={() => handleValueDelete(item.id)}
                            className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer shrink-0"
                            title="Kustuta õppematerjal"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}