import * as faceapi from "face-api.js";

const basePath =
    process.env.NEXT_PUBLIC_REPO
        ? `/${process.env.NEXT_PUBLIC_REPO}`
        : "";

export const MODEL_URL = `${basePath}/models`;

export async function loadModels() {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
    ]);

    console.log("Models loaded:", MODEL_URL);
}
