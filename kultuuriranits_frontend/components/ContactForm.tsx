"use client";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export function ContactForm() {
    const [isSending, setIsSending] = useState(false);

    const sendMail = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSending(true);
        const form = event.currentTarget;

        const formData = new FormData(form);
        const name = formData.get("user_name") as string;
        const email = formData.get("user_email") as string;
        const subject = formData.get("user_subject") as string;
        const message = formData.get("user_message") as string;

        if (!name || !email || !message) {
            alert("Palun täida kõik kohustuslikud väljad!");
            setIsSending(false);
            return;
        }

        const parms = { name, email, subject, message };

        try {
            emailjs.init("KzJnSr3TY7Do9DEq8");
            const response = await emailjs.send("service_sjtt2xh", "template_u7ymz3a", parms);
            if (response.status === 200) {
                alert("Sõnum saadetud!");
                form.reset();
            } else {
                alert("Midagi läks valesti.");
            }
        } catch (error: unknown) {
            console.error("Viga saatmisel:", error);
            if (error && typeof error === "object" && "text" in error) {
                alert("Viga saatmisel: " + (error as { text: string }).text);
            } else if (error instanceof Error) {
                alert("Viga saatmisel: " + error.message);
            } else {
                alert("Viga saatmisel: Tundmatu viga");
            }
        } finally {
            setIsSending(false);
        }
    };

    return (
        <form onSubmit={sendMail} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
            <div>
                <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Nimi *</label>
                <input id="name" name="user_name" type="text" placeholder="Sinu nimi" required style={{ width: "100%", padding: "8px" }} />
            </div>

            <div>
                <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>E-post *</label>
                <input id="email" name="user_email" type="email" placeholder="sinu@email.ee" required style={{ width: "100%", padding: "8px" }} />
            </div>

            <div>
                <label htmlFor="subject" style={{ display: "block", marginBottom: "5px" }}>Teema</label>
                <input id="subject" name="user_subject" type="text" placeholder="Millest soovid kirjutada?" style={{ width: "100%", padding: "8px" }} />
            </div>

            <div>
                <label htmlFor="message" style={{ display: "block", marginBottom: "5px" }}>Sõnum *</label>
                <textarea id="message" name="user_message" rows={5} placeholder="Kirjuta oma sõnum siia..." required style={{ width: "100%", padding: "8px" }} />
            </div>

            <button
                type="submit"
                disabled={isSending}
                style={{
                    backgroundColor: isSending ? "#9ca3af" : "#2263c5",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "4px",
                    cursor: isSending ? "not-allowed" : "pointer",
                    fontWeight: "bold"
                }}
            >
                {isSending ? "Saadan..." : "Saada"}
            </button>
        </form>
    );
}