"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";

export default function AdminDashboardClient() {
    const [question, setQuestion] = useState("");
    const [type, setType] = useState<"RATING" | "BINARY">("RATING");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/feedback/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question, type }),
            });
            if (!res.ok) throw new Error("Failed to create question");

            setSuccessMessage("!שאלה נוספה בהצלחה");
            setQuestion("");
            setType("RATING");
        } catch (err) {
            console.error("Error creating question:", err);
            setSuccessMessage("❌ שגיאה בהוספת שאלה");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="max-w-xl mx-auto p-6 mt-20">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#000080]">Admin Dashboard</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Question Text</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        className="w-full border px-3 py-2 rounded-lg font-poppins"
                        placeholder="e.g. Was this page helpful?"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value as "RATING" | "BINARY")}
                        className="w-full border px-3 py-2 rounded-lg"
                    >
                        <option value="RATING">Rating</option>
                        <option value="BINARY">Yes / No</option>
                    </select>
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={loading}
                        className="w-full max-w-xs"
                    >
                        {loading ? "Adding..." : "Add Question"}
                    </Button>
                </div>



                {successMessage && (
                    <p className="text-center mt-3 font-medium text-green-600">{successMessage}</p>
                )}
            </form>
        </main>
    );
}
