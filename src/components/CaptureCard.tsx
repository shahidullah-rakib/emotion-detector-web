"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
    img: string;
    emotion: string;
    age: number;
    expressions: Record<string, number>;
}

export default function CaptureCard({ img, emotion, age, expressions }: Props) {
    const downloadImage = () => {
        const a = document.createElement("a");
        a.href = img;
        a.download = `capture_${emotion}.png`;
        a.click();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white p-4 rounded-xl shadow-md flex flex-col gap-3"
        >
            <img src={img} className="rounded-lg w-full object-cover" />

            <div className="text-black">
                <p className="text-lg font-semibold">Emotion: {emotion}</p>
                <p className="text-md text-gray-600">Age: {age}</p>

                <div className="mt-2">
                    <p className="text-sm font-semibold mb-1">Emotion Percentages:</p>
                    <ul className="text-sm text-gray-700">
                        {Object.entries(expressions).map(([key, val]) => (
                            <li key={key}>
                                {key}: {(val * 100).toFixed(1)}%
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <button
                onClick={downloadImage}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
            >
                Download Photo
            </button>
        </motion.div>
    );
}
