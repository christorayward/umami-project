import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// 🔐 API KEY desde Railway
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 🔁 función retry
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((p) => p.text)
          .join("") || "";

      if (!text) throw new Error("Empty response");

      return text;
    } catch (err) {
      console.log(`⚠️ Intento ${i + 1} falló`);

      if (i === retries - 1) throw err;

      await sleep(1500 * (i + 1)); // backoff
    }
  }
}

// 👉 endpoint
app.post("/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients) {
      return res.status(400).json({ error: "Faltan ingredientes" });
    }

    const prompt = `
Responde SOLO en JSON válido.
NO uses markdown.
NO uses texto adicional.

Formato:

{
  "name": "",
  "description": "",
  "cuisine": "",
  "difficulty": "easy | medium | hard",
  "cookingTime": number,
  "ingredients": [
    { "quantity": "", "unit": "", "name": "" }
  ],
  "steps": [
    "Paso 1",
    "Paso 2"
  ]
}

Ingredientes:
${ingredients}
`;

    const text = await callGemini(prompt);

    const clean = text.replace(/```json|```/g, "").trim();

    let recipe;

    try {
      recipe = JSON.parse(clean);
    } catch (err) {
      return res.status(500).json({
        error: "JSON inválido",
        raw: clean,
      });
    }

    res.json(recipe);
  } catch (error) {
    console.error("❌ ERROR:", error.message);

    res.status(500).json({
      error: "Error generando receta",
      detail: error.message,
    });
  }
});

// 🚀 Railway usa PORT automático
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🔥 IA server corriendo en puerto ${PORT}`);
});