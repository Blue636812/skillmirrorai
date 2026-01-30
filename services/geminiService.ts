import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateAIResponse = async (prompt: string, context?: string): Promise<string> => {
  try {
    const ai = getClient();
    const systemInstruction = context || "You are Smart, the AI assistant for SkillMirror. You are helpful, calm, confident, and professional. Keep answers concise and encouraging.";
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently offline or experiencing heavy traffic. Please try again later.";
  }
};

export const analyzeInterviewResponse = async (transcription: string): Promise<string> => {
   try {
    const ai = getClient();
    const prompt = `
      Analyze the following interview answer for a professional role. 
      Provide feedback in JSON format with these keys: 
      - clarity_score (0-100)
      - confidence_score (0-100)
      - relevance_score (0-100)
      - feedback_summary (string)
      - key_improvements (array of strings)

      Answer: "${transcription}"
    `;

    // Note: In a real app we'd use responseSchema, but for flexibility in this demo we'll just ask for text and parse loosely or display raw.
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Analysis failed.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Analysis unavailable.";
  }
}