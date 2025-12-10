"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "../utils/loadModels";
import { capturePhoto } from "../utils/capturePhoto";
import CaptureCard from "./CaptureCard";
import EmotionBubble from "./EmotionBubble";

export default function EmotionDetector() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [captures, setCaptures] = useState<any[]>([]);
    const [currentEmotion, setCurrentEmotion] = useState("");

    const MAX_HISTORY = 6; // Auto-delete older photos

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
            if (videoRef.current) videoRef.current.srcObject = stream;
        });
    };

    const detectEmotionFrame = async () => {
        if (!videoRef.current) return;

        const detection = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions()
            .withAgeAndGender();

        if (!detection) return;

        const sorted = detection.expressions.asSortedArray();
        const topEmotion = sorted[0].expression;
        const age = Math.round(detection.age);
        const expressions = detection.expressions;

        if (topEmotion !== currentEmotion) {
            const photo = capturePhoto(videoRef.current);

            const newItem = {
                img: photo,
                emotion: topEmotion,
                age,
                expressions,
            };

            setCaptures((prev) => {
                const updated = [newItem, ...prev];
                if (updated.length > MAX_HISTORY) updated.pop(); // auto-delete
                return updated;
            });

            setCurrentEmotion(topEmotion);
        }
    };

    useEffect(() => {
        const interval = setInterval(detectEmotionFrame, 1000);
        return () => clearInterval(interval);
    }, [currentEmotion]);

    return (
        <div className="w-full flex flex-col items-center gap-6 p-4">
            <div className="relative w-full max-w-md">
                {currentEmotion && <EmotionBubble emotion={currentEmotion} />}
                <video ref={videoRef} autoPlay className="w-full rounded-lg shadow" />
            </div>

            {/* Captured History */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {captures.map((c, i) => (
                    <CaptureCard
                        key={i}
                        img={c.img}
                        emotion={c.emotion}
                        age={c.age}
                        expressions={c.expressions}
                    />
                ))}
            </div>
        </div>
    );
}
