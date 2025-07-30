import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";
import env from "../config/config";

const API_KEYS = [
  env.GEMINI_API_KEY
];

let currentKeyIndex = 0;

const createModel = (apiKey: string): GenerativeModel => {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
};

let currentModel = createModel(API_KEYS[currentKeyIndex]);

export const generateContentWithRetry = async (prompt: string, retries = 3): Promise<any> => {
  try {
    return await currentModel.generateContent(prompt);
  } catch (error: any) {
    const isQuotaError = error.statusCode === 429;

    if (isQuotaError && currentKeyIndex < API_KEYS.length - 1) {
      const retryAfter = error.retryDelaySeconds || 5;
      console.warn(`⚠️ Límite alcanzado con clave ${currentKeyIndex + 1}. Cambiando de clave...`);
      currentKeyIndex++;
      currentModel = createModel(API_KEYS[currentKeyIndex]);

      await new Promise((r) => setTimeout(r, retryAfter * 1000));
      return generateContentWithRetry(prompt, retries);
    }

    if (isQuotaError && retries > 0) {
      console.warn(`⚠️ Todas las claves agotadas. Reintentando en 20s...`);
      await new Promise((r) => setTimeout(r, 20000));
      return generateContentWithRetry(prompt, retries - 1);
    }

    if (isQuotaError || error.message?.includes("quota")) {
      console.error("❌ Sin cuota disponible para Gemini.");
      return { error: "IA sin cuota disponible. Intentá más tarde." };
    }

    console.error("❌ Error desconocido en Gemini:", error);
    return { error: "Ocurrió un error con el servicio de IA." };
  }
};

