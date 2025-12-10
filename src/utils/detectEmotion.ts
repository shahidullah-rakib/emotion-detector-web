import * as faceapi from "face-api.js";

export async function detectEmotion(videoEl: HTMLVideoElement) {
    const detections = await faceapi
        .detectAllFaces(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()
        .withAgeAndGender();

    return detections.map((d) => ({
        box: d.detection.box,
        expressions: d.expressions,
        dominantEmotion: Object.entries(d.expressions)
            .sort((a, b) => b[1] - a[1])[0][0],
        age: Math.round(d.age),
        gender: d.gender,
    }));
}
