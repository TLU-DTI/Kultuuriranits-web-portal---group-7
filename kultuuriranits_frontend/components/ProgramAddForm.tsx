"use client";

import { useState } from "react";
import { Category } from "../models/Category";

interface ProgramAddFormProps {
    categories: Category[];
}

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export function ProgramAddForm({
    categories
}: ProgramAddFormProps) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        pricePerStudent: "",
        durationMinutes: "",
        targetGroup: "",
        minGroupSize: "",
        maxGroupSize: "",
        location: "",
        language: "Estonian",
        status: "Active",
        organizationId: "",
        categoryId: ""
    });

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        const payload = {
            title: formData.title,
            description: formData.description,
            pricePerStudent: Number(formData.pricePerStudent),
            durationMinutes: Number(formData.durationMinutes),
            targetGroup: formData.targetGroup,
            minGroupSize: Number(formData.minGroupSize),
            maxGroupSize: Number(formData.maxGroupSize),
            location: formData.location,
            language: formData.language,
            status: formData.status,
            organizationId: Number(formData.organizationId),

            category: {
                id: Number(formData.categoryId)
            }
        };

        const response = await fetch(`${API_URL}/program`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            alert("Programmi lisamine ebaõnnestus");
            return;
        }

        alert("Programm lisatud");

        setFormData({
            title: "",
            description: "",
            pricePerStudent: "",
            durationMinutes: "",
            targetGroup: "",
            minGroupSize: "",
            maxGroupSize: "",
            location: "",
            language: "Estonian",
            status: "Active",
            organizationId: "",
            categoryId: ""
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "600px"
            }}
        >
            <input
                name="title"
                placeholder="Pealkiri"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <textarea
                name="description"
                placeholder="Kirjeldus"
                value={formData.description}
                onChange={handleChange}
                required
            />

            <input
                name="pricePerStudent"
                type="number"
                step="0.01"
                placeholder="Hind õpilase kohta"
                value={formData.pricePerStudent}
                onChange={handleChange}
            />

            <input
                name="durationMinutes"
                type="number"
                placeholder="Kestus minutites"
                value={formData.durationMinutes}
                onChange={handleChange}
            />

            <select
                name="targetGroup"
                value={formData.targetGroup}
                onChange={handleChange}
                required
            >
                <option value="">
                    Vali sihtgrupp
                </option>

                <option value="Algklassid (1.-4. klass)">
                    Algklassid (1.-4. klass)
                </option>

                <option value="Põhikool (5.-9. klass)">
                    Põhikool (5.-9. klass)
                </option>
            </select>

            <input
                name="minGroupSize"
                type="number"
                placeholder="Min grupi suurus"
                value={formData.minGroupSize}
                onChange={handleChange}
            />

            <input
                name="maxGroupSize"
                type="number"
                placeholder="Max grupi suurus"
                value={formData.maxGroupSize}
                onChange={handleChange}
            />

            <input
                name="location"
                placeholder="Asukoht"
                value={formData.location}
                onChange={handleChange}
            />

            <select
                name="language"
                value={formData.language}
                onChange={handleChange}
            >
                <option value="Estonian">Eesti</option>
                <option value="English">Inglise</option>
                <option value="Russian">Vene</option>
            </select>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="Active">Aktiivne</option>
                <option value="Inactive">Mitteaktiivne</option>
            </select>

            <input
                name="organizationId"
                type="number"
                placeholder="Organisatsiooni ID"
                value={formData.organizationId}
                onChange={handleChange}
            />

            <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
            >
                <option value="">
                    Vali kategooria
                </option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <button type="submit">
                Salvesta programm
            </button>
        </form>
    );
}