import { Category } from "./Category";
import { Organization } from "./Organization";

export interface Program {

    id: number;

    title: string;
    description: string;
    shortDescription: string;
    pricePerStudent: number;
    durationMinutes: number;
    targetGroups: string[];
    minGroupSize: number;
    maxGroupSize: number;
    location: string;
    languages: string[];
    status: string;
    averageRating?: number;
    createdAt: string;
    updatedAt: string;

    organization?: Organization | null;

    imageName: string | null;
    imageType: string | null;

    category: Category | null;
}