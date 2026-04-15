import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const MAX_IMAGES = 10;
const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const getImageKey = file => `${file.name}:${file.size}:${file.lastModified}`;

export default function IntegratedAiChat() {

	// 🔥 estados
	const [localMessages, setLocalMessages] = useState([]);
	const [input, setInput] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);

	const messagesEndRef = useRef(null);
	const fileInputRef = useRef(null);

	// 🔥 llamada a tu backend
	const generateRecipe = async (ingredients) => {
		for (let i = 0; i < 3; i++) {
			try {
				const res = await fetch("api-production-e318.up.railway.app", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ ingredients }),
				});

				const data = await res.json();

				if (data.error) throw new Error("Gemini error");

				return data;
			} catch (err) {
				console.log(`Intento ${i + 1} fallido...`);
				await new Promise(r => setTimeout(r, 1000));
			}
		}

		return null;
	};

	// 🔥 previews imágenes
	const imagePreviews = useMemo(() =>
		selectedImages.map(file => ({
			key: getImageKey(file),
			file,
			url: URL.createObjectURL(file),
		})),
		[selectedImages]
	);

	// limpiar memoria imágenes
	useEffect(() => {
		return () => {
			imagePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
		};
	}, [imagePreviews]);

	// scroll automático
	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [localMessages]);

	// 🔥 SUBMIT (IA)
	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();

		const trimmed = input.trim();
		if (!trimmed) return;

		setInput('');

		// 👤 mensaje usuario
		const userMessage = {
			role: "user",
			content: trimmed
		};

		setLocalMessages(prev => [...prev, userMessage]);

		// 🤖 loader
		setLocalMessages(prev => [
			...prev,
			{ role: "assistant", content: "Generando receta... 🍳" }
		]);

		const recipe = await generateRecipe(trimmed);

		if (!recipe || !recipe.ingredients || !recipe.steps) {
			setLocalMessages(prev => [
				...prev.slice(0, -1),
				{ role: "assistant", content: "⚠️ La IA está saturada, intenta de nuevo en unos segundos." }
			]);
			return;
		}

		if (!recipe) {
			setLocalMessages(prev => [
				...prev.slice(0, -1),
				{ role: "assistant", content: "Error generando receta 😢" }
			]);
			return;
		}

		// 🎨 formateo bonito
		const aiText = `
🍽️ ${recipe.name}

${recipe.description}

⏱️ Tiempo: ${recipe.cookingTime} min
🔥 Dificultad: ${recipe.difficulty}

Ingredientes:
${recipe.ingredients.map(i => `- ${i.quantity} ${i.unit} ${i.name}`).join("\n")}

Pasos:
${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}
`;

		setLocalMessages(prev => [
			...prev.slice(0, -1),
			{ role: "assistant", content: aiText }
		]);

	}, [input]);

	// 📎 subir imágenes (opcional, lo dejamos)
	const handleImageSelect = useCallback((e) => {
		const files = Array.from(e.target.files || []);
		const validFiles = files.filter(file =>
			VALID_IMAGE_TYPES.includes(file.type) &&
			file.size <= MAX_IMAGE_SIZE
		);

		setSelectedImages(prev => {
			const map = new Map(prev.map(f => [getImageKey(f), f]));
			validFiles.forEach(f => map.set(getImageKey(f), f));
			return Array.from(map.values()).slice(0, MAX_IMAGES);
		});

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}

	}, []);

	const removeImage = useCallback((index) => {
		setSelectedImages(prev => prev.filter((_, i) => i !== index));
	}, []);

	return (
		<div className="flex flex-col h-full max-w-2xl mx-auto">

			{/* HEADER */}
			<div className="flex items-center justify-between p-4 border-b">
				<h2 className="text-lg font-semibold">AI Recipes</h2>

				{localMessages.length > 0 && (
					<button
						onClick={() => setLocalMessages([])}
						className="text-sm text-gray-500 hover:text-gray-700"
					>
						Clear
					</button>
				)}
			</div>

			{/* CHAT */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">

				{localMessages.map((msg, i) => (
					<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div
							className={`max-w-[80%] rounded-lg px-4 py-2 ${msg.role === 'user'
								? 'bg-blue-600 text-white'
								: 'bg-gray-100 text-gray-900'
								}`}
						>
							<p className="whitespace-pre-wrap">{msg.content}</p>
						</div>
					</div>
				))}

				<div ref={messagesEndRef} />
			</div>

			{/* INPUT */}
			<div className="p-4 border-t">

				{selectedImages.length > 0 && (
					<div className="mb-3 flex gap-2 flex-wrap">
						{imagePreviews.map(({ key, file, url }, index) => (
							<div key={key} className="relative group">
								<img
									src={url}
									alt={file.name}
									className="w-20 h-20 object-cover rounded-lg border"
								/>
								<button
									type="button"
									onClick={() => removeImage(index)}
									className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
								>
									×
								</button>
							</div>
						))}
					</div>
				)}

				<form onSubmit={handleSubmit} className="flex gap-2">

					<input
						ref={fileInputRef}
						type="file"
						accept={VALID_IMAGE_TYPES.join(',')}
						multiple
						onChange={handleImageSelect}
						className="hidden"
					/>

					<button
						type="button"
						onClick={() => fileInputRef.current?.click()}
						className="rounded-lg border px-3 py-2 hover:bg-gray-100"
					>
						📎
					</button>

					<input
						type="text"
						value={input}
						onChange={e => setInput(e.target.value)}
						placeholder="Ej: pollo, arroz, limón"
						className="flex-1 rounded-lg border px-4 py-2"
					/>

					<button
						type="submit"
						className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						Enviar
					</button>

				</form>
			</div>
		</div>
	);
}