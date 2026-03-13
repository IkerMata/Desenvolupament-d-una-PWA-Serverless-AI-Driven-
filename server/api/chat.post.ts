import { GoogleGenerativeAI } from '@google/generative-ai';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiKey = (config.geminiApiKey || '').trim();

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    throw createError({
      statusCode: 500,
      statusMessage: 'API Key de Gemini no configurada correctamente en .env (usa NUXT_GEMINI_API_KEY)',
    });
  }

  const body = await readBody(event);
  const { messages, message } = body;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: {
        role: 'system',
        parts: [{ text: "Eres un asistente experto en sector inmobiliario para la empresa EstateFlow. Tu objetivo es ayudar a los usuarios a encontrar la casa de sus sueños. Sé amable, profesional y conciso." }],
      },
    });

    // Clean and format history: must be alternating user/model and start with user
    let history = (messages || [])
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content || '' }],
      }))
      .filter((m: any) => m.parts[0].text.trim() !== '');

    // Ensure it starts with user
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    // Gemini doesn't like consecutive roles. We'll send just the message if history is empty.
    if (history.length === 0) {
      const result = await model.generateContent(message);
      const response = await result.response;
      return {
        role: 'assistant',
        content: response.text(),
      };
    }

    const chat = model.startChat({
      history,
      generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;

    return {
      role: 'assistant',
      content: response.text(),
    };
  } catch (error: any) {
    console.error('SERVER ERROR:', error);
    throw createError({
      statusCode: 500,
      statusMessage: `AI Error: ${error.message || 'Error desconocido'}`,
    });
  }
});
