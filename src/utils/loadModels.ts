import * as faceapi from "face-api.js";

const base = process.env.NODE_ENV === "production"
    ? "/emotion-detector-web/models"
    : "/models";

export const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(base);
    await faceapi.nets.faceExpressionNet.loadFromUri(base);
    await faceapi.nets.ageGenderNet.loadFromUri(base);
};
