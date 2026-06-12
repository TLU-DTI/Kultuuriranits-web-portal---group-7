"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, CheckCircle2 } from "lucide-react";

interface RemoveFeedbackButtonProps {
  feedbackId: number;
  apiUrl: string | undefined;
}

export function RemoveFeedback({
  feedbackId,
  apiUrl,
}: RemoveFeedbackButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleRemove = async () => {
    if (loading || isRemoved) return;

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/feedback/${feedbackId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Tagasiside eemaldamine ebaõnnestus.");
        return;
      }

      setIsRemoved(true);
      setShowToast(true);

      setTimeout(() => {
        setToastVisible(true);
      }, 10);

      setTimeout(() => {
        setToastVisible(false);
      }, 1800);

      setTimeout(() => {
        setShowToast(false);
        router.refresh();
      }, 2200);
    } catch (error) {
      console.error("Viga tagasiside eemaldamisel:", error);
      alert("Tagasiside eemaldamine ebaõnnestus.");
      setIsRemoved(false);
    } finally {
      setLoading(false);
    }
  };

  const toast =
    showToast && typeof document !== "undefined"
      ? createPortal(
          <div
            aria-live="polite"
            className={`fixed top-24 right-6 z-[9999] w-[340px] max-w-[calc(100vw-2rem)] transition-all duration-300 ease-out ${
              toastVisible
                ? "opacity-100 translate-x-0 translate-y-0"
                : "opacity-0 translate-x-8 -translate-y-2"
            }`}
          >
            <div className="bg-white border border-blue-100 shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <p className="text-sm font-black text-gray-900">
                  Tagasiside eemaldatud!
                </p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">
                  Sinu tagasiside kustutati edukalt.
                </p>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={handleRemove}
        disabled={loading || isRemoved}
        className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Trash2 className="w-4 h-4" />
        {isRemoved ? "Kustutatud" : loading ? "Kustutab..." : "Kustuta tagasisidest"}
      </button>

      {toast}
    </>
  );
}