"use client";

import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "../utils/loadModels";
import { detectEmotion } from "../utils/detectEmotion";
import CameraFeed from "./CameraFeed";

const EMOJI_MAP: Record<string, string> = {
    happy: "😄",
    sad: "😢",
    angry: "😡",
    surprised: "😲",
    fearful: "😨",
    disgusted: "🤢",
    neutral: "😐",
};

const EmotionDetector = () => {
    const [video, setVideo] = useState<HTMLVideoElement | null>(null);
    const [result, setResult] = useState<any[]>([]);

    useEffect(() => {
        loadModels();
    }, []);

    useEffect(() => {
        if (!video) return;

        const interval = setInterval(async () => {
            const detected = await detectEmotion(video);
            setResult(detected);
        }, 300);

        return () => clearInterval(interval);
    }, [video]);

    return (
        <div>
            <CameraFeed onReady={setVideo} />

            {result.map((face, i) => (
                <div key={i} className="mt-4 p-4 bg-white shadow rounded-xl border text-black">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        {EMOJI_MAP[face.dominantEmotion]} {face.dominantEmotion.toUpperCase()}
                    </h2>

                    <p className="text-sm">
                        <strong>Age:</strong> {face.age}
                    </p>

                    <p className="text-sm">
                        <strong>Gender:</strong> {face.gender}
                    </p>

                    <p className="text-sm mt-2 font-medium">Emotion Scores:</p>
                    <ul className="text-xs">
                        {Object.entries(face.expressions).map(([emotion, score]) => (
                            <li key={emotion}>
                                {emotion}: {(Number(score) * 100).toFixed(2)}%
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default EmotionDetector;
