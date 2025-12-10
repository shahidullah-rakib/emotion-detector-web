import EmotionDetector from "@/components/EmotionDetector";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-6">Real-Time Emotion Detection</h1>
      <EmotionDetector />
    </main>
  );
}
