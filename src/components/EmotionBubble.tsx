"use client";
import { motion } from "framer-motion";

export default function EmotionBubble({ emotion }: { emotion: string }) {
    const emojiMap: any = {
        happy: "😊",
        sad: "😢",
        angry: "😡",
        surprised: "😲",
        neutral: "😐",
        fearful: "😨",
        disgusted: "🤢",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -10 }}
            className="absolute top-3 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full shadow-md text-lg"
        >
            {emojiMap[emotion] || "🙂"} {emotion}
        </motion.div>
    );
}
