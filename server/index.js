import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*"
}));

app.use(express.json());

// 🔐 API KEY desde entorno
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

Formato exacto:

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

        // 👉 leer UNA sola vez
        const textResponse = await response.text();

        console.log("🔥 RAW:", textResponse);

        const data = JSON.parse(textResponse);

        if (!response.ok) {
            return res.status(500).json({
                error: "Error en Gemini",
                raw: data
            });
        }

        const text = data?.candidates?.[0]?.content?.parts
            ?.map(p => p.text)
            .join("") || "";

        if (!text) {
            return res.status(500).json({
                error: "Gemini no devolvió contenido",
                raw: data
            });
        }

        const clean = text.replace(/```json|```/g, "").trim();

        let recipe;

        try {
            recipe = JSON.parse(clean);
        } catch (err) {
            console.error("❌ JSON inválido:", clean);
            return res.status(500).json({
                error: "La IA no devolvió JSON válido",
                raw: clean
            });
        }

        res.json(recipe);

    } catch (error) {
        console.error("❌ ERROR COMPLETO:", error);

        res.status(500).json({
            error: "Error generando receta",
            detail: error.message
        });
    }
});

// 🔥 puerto dinámico (CLAVE)
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`🔥 IA server corriendo en puerto ${PORT}`);
});