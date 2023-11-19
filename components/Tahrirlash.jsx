"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, newDarsQoldirish }) {
    const [inputValue, setInputValue] = useState(newDarsQoldirish);

    useEffect(() => {
        setInputValue(newDarsQoldirish);
    }, [newDarsQoldirish]);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newDarsQoldirish: inputValue }), // Use inputValue here
            });

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-10 ml-5">
            <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className="border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Mavzuning qoldirgan dars vaqti"
            />

            <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
                Yangilash
            </button>
        </form>
    );
}
