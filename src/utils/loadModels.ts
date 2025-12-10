import * as faceapi from "face-api.js";

export const loadModels = async () => {
    try {
        const MODEL_URL = "/models";

        await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);

        console.log("Models Loaded Successfully!");
        return true;
    } catch (error) {
        console.error("Models not Loaded!");
        return false;
    }

};
