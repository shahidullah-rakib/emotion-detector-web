"use client";

import React, { useEffect, useRef } from "react";

const CameraFeed = ({ onReady }: { onReady: (video: HTMLVideoElement) => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        async function init() {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play();
                    onReady(videoRef.current!);
                };
            }
        }

        init();
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full rounded-xl border"
            style={{ transform: "scaleX(-1)" }}
        />
    );
};

export default CameraFeed;
