

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