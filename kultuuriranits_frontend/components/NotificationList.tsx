"use client";

import { useState, useEffect } from "react";
import { Notification } from "@/models/Notification";

interface NotificationListProps {
    initialNotifications: Notification[];
    currentStatusFilter: "unread" | "read";
    showMarkAsReadButton?: boolean;
    emptyMessage?: string;
}

const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export default function NotificationList({
    initialNotifications,
    currentStatusFilter,
    showMarkAsReadButton = false,
    emptyMessage = "Teateid pole."
}: NotificationListProps) {

    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const displayedNotifications = notifications.filter(n => n.status === currentStatusFilter);

    const handleMarkAsRead = async (notification: Notification) => {
        try {
            const updatedNotification = { ...notification, status: "read" };

            const res = await fetch(`${API_URL}/notification/${notification.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedNotification),
                credentials: "include"
            });

            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Viga loetuks märkimisel:", error);
        }
    };

    const handleValueDelete = async (id: number) => {
        try {
            const res = await fetch(`${API_URL}/notification/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                const data = await res.json();
                setNotifications(data);
            }
        } catch (error) {
            console.error("Viga teavituse kustutamisel:", error);
        }
    };

    if (displayedNotifications.length === 0) {
        return (
            <div className="rounded-3xl bg-white border border-gray-200 shadow-sm p-12 text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-3">
                        Teateid pole
                    </h2>
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {displayedNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-6 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all hover:shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${currentStatusFilter === "read" ? "opacity-75 hover:opacity-100" : ""
                        }`}
                >
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-lg font-bold ${currentStatusFilter === "read" ? "text-gray-600" : "text-gray-900"}`}>
                                {notification.title || "Süsteemne teade"}
                            </h3>

                            {notification.createdAt && (
                                <span className="text-xs text-gray-400">
                                    {new Date(notification.createdAt).toLocaleDateString("et-EE")}
                                </span>
                            )}
                        </div>

                        <p className={`text-sm leading-relaxed whitespace-pre-line ${currentStatusFilter === "read" ? "text-gray-500" : "text-gray-600"}`}>
                            {notification.message}
                        </p>
                    </div>

                    {/* Nupurida */}
                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                        {showMarkAsReadButton && (
                            <button
                                onClick={() => handleMarkAsRead(notification)}
                                className="px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors whitespace-nowrap"
                            >
                                Märgi loetuks
                            </button>
                        )}

                        <button
                            onClick={() => handleValueDelete(notification.id)}
                            className="px-4 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors whitespace-nowrap"
                        >
                            {currentStatusFilter === "read" ? "Kustuta ajaloost" : "Kustuta"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}