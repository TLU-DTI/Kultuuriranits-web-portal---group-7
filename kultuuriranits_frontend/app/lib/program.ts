const API_URL = process.env.NEXT_PUBLIC_BACK_URL;


export default async function getProgram(programId: string) {
 
    const res = await fetch(`${API_URL}/program/${programId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    } else {
        return await res.json();
    }
}

export async function getPrograms() {
 
    const res = await fetch(`${API_URL}/program`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    } else {
        return await res.json();
    }
}

export async function getProgramsByFilter(
    keyword?: string,
    page = 0,
    sort = "id,asc",
    size = 3,
    categoryId?: string,
    organizationId?: string,
    targetGroup?: string,
    date?: string,
    county?: string,
    location?: string,
    price?: string,
    duration?: string,
    groupSize?: string,
    languages?: string,
    wheelchair?: string,
    specialNeeds?: string,
    outdoor?: string,
): Promise<FetchResult> {
    try {
        const baseUrl = `${API_URL}/program${keyword ? "/search" : ""}`;

        const params = new URLSearchParams({
            page: String(page),
            size: String(size),
            sort
        });

        if (keyword) params.set("keyword", keyword);
        if (categoryId) params.set("categoryId", categoryId);
        if (organizationId) params.set("organizationId", organizationId);
        if (targetGroup) params.set("targetGroup", targetGroup);
        if (date) params.set("date", date);
        if (county) params.set("county", county);
        if (location) params.set("location", location);
        if (price) params.set("price", price);
        if (duration) params.set("duration", duration);
        if (groupSize) params.set("groupSize", groupSize);
        if (languages) params.set("languages", languages);
        if (wheelchair) params.set("wheelchair", wheelchair);
        if (specialNeeds) params.set("specialNeeds", specialNeeds);
        if (outdoor) params.set("outdoor", outdoor);

        const res = await fetch(
            `${baseUrl}?${params.toString()}`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error(`Backend tagastas vea staatuse: ${res.status}`);
            return { content: [], totalPages: 1 };
        }

        const data = await res.json();

        return {
            content: data.content ?? [],
            totalPages: data.totalPages ?? 1
        };
    } catch (error) {
        console.error("Ei saanud Spring Boot backendiga ühendust (getPrograms):", error);
        return { content: [], totalPages: 1 };
    }
}

//getProgramsByFilter(keyword, page, sort, size, categoryId, organizationId, targetGroup, date, county, location, price, duration, groupSize, languages, wheelchair, specialNeeds, outdoor),
    

export async function getPopularPrograms(): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/program`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return [];
        }
        
        return await res.json();
    } catch (error) {
        console.error("Viga andmebaasist programmide pärimisel:", error);
        return [];
    }
}