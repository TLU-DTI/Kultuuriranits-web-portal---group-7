'use client'

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function DownloadButton({
    programId,
    materialId,
    name

}: {programId: string,
    materialId: string,
    name: string,
}) {

    const downloadMaterial = (programId: string, materialId: string) => {
        window.location.href = `${API_URL}/program/${programId}/materials/${materialId}/download`;
    };
  return (
      <div>
          <button
              className="text-xs font-extrabold text-gray-800 truncate max-w-[180px]"
              onClick={() => downloadMaterial(programId, materialId)}
          >
              {name}
          </button>

      </div>
  )
}
