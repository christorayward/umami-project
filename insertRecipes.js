import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// 👇 LOGIN COMO ADMIN
await pb.admins.authWithPassword('admin@umami.com', 'umamirecipes123');

// 👇 TUS RECETAS
const recipes = [
    {
        name: "Pancakes Soufflé Japoneses",
        description: "Pancakes ultra esponjosos estilo japonés, suaves y ligeros.",
        cookingTime: 35,
        difficulty: "medium",
        cuisine: "Desayuno",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Desayunos/Pancakes Soufflé Japoneses.jpg",
        ingredients: [
            { amount: "2", item: "huevos", unit: "unidad" },
            { amount: "30", item: "azúcar", unit: "g" },
            { amount: "40", item: "leche", unit: "ml" },
            { amount: "50", item: "harina", unit: "g" },
            { amount: "0.5", item: "polvo para hornear", unit: "cucharadita" }
        ],
        steps: [
            { step: 1, instruction: "Separa claras y yemas." },
            { step: 2, instruction: "Mezcla yemas con leche y harina." },
            { step: 3, instruction: "Bate claras con azúcar a punto de nieve." },
            { step: 4, instruction: "Integra suavemente." },
            { step: 5, instruction: "Cocina a fuego bajo en sartén tapado." }
        ]
    },
    {
        name: "Toast de Aguacate Gourmet",
        description: "Pan crujiente con aguacate y huevo.",
        cookingTime: 10,
        difficulty: "easy",
        cuisine: "Desayuno",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Desayunos/Toast de Aguacate Gourmet.jpg",
        ingredients: [
            { amount: "1", item: "pan", unit: "rebanada" },
            { amount: "0.5", item: "aguacate", unit: "unidad" },
            { amount: "1", item: "huevo", unit: "unidad" }
        ],
        steps: [
            { step: 1, instruction: "Tostar el pan." },
            { step: 2, instruction: "Machacar aguacate." },
            { step: 3, instruction: "Cocinar huevo." },
            { step: 4, instruction: "Montar todo." }
        ]
    },
    {
        name: "French Toast Relleno",
        description: "Pan dulce relleno de queso crema y fresas.",
        cookingTime: 20,
        difficulty: "easy",
        cuisine: "Desayuno",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "",
        ingredients: [
            { amount: "2", item: "huevos", unit: "unidad" },
            { amount: "0.25", item: "leche", unit: "taza" },
            { amount: "4", item: "pan", unit: "rebanada" }
        ],
        steps: [
            { step: 1, instruction: "Batir huevos con leche." },
            { step: 2, instruction: "Rellenar pan." },
            { step: 3, instruction: "Sumergir en mezcla." },
            { step: 4, instruction: "Cocinar en sartén." }
        ]
    },
    {
        name: "Huevos Benedictinos",
        description: "Desayuno clásico con salsa cremosa.",
        cookingTime: 30,
        difficulty: "medium",
        cuisine: "Desayuno",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Desayunos/Huevos Benedictinos.jpg",
        ingredients: [
            { amount: "2", item: "huevos", unit: "unidad" },
            { amount: "2", item: "pan", unit: "pieza" },
            { amount: "60", item: "mantequilla", unit: "g" }
        ],
        steps: [
            { step: 1, instruction: "Preparar salsa." },
            { step: 2, instruction: "Tostar pan." },
            { step: 3, instruction: "Pochar huevos." },
            { step: 4, instruction: "Montar platillo." }
        ]
    },
    {
        name: "Croissant Relleno",
        description: "Croissant crujiente con jamón y queso.",
        cookingTime: 15,
        difficulty: "easy",
        cuisine: "Desayuno",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Desayunos/Croissant Relleno.jpg",
        ingredients: [
            { amount: "1", item: "croissant", unit: "pieza" },
            { amount: "2", item: "jamón", unit: "rebanada" },
            { amount: "2", item: "queso", unit: "rebanada" }
        ],
        steps: [
            { step: 1, instruction: "Abrir croissant." },
            { step: 2, instruction: "Rellenar." },
            { step: 3, instruction: "Hornear." }
        ]
    },
    {
        name: "Salmón al limón con costra de hierbas",
        description: "Salmón jugoso con costra crujiente de hierbas y limón.",
        cookingTime: 25,
        difficulty: "medium",
        cuisine: "Comida",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Comidas/Salmón al limón con costra de hierbas.jpg",
        ingredients: [
            { amount: "2", item: "filetes de salmón", unit: "pieza" },
            { amount: "2", item: "pan molido", unit: "cucharada" },
            { amount: "1", item: "perejil picado", unit: "cucharada" },
            { amount: "1", item: "ajo picado", unit: "cucharadita" },
            { amount: "1", item: "limón (ralladura)", unit: "pieza" },
            { amount: "0.5", item: "jugo de limón", unit: "pieza" }
        ],
        steps: [
            { step: 1, instruction: "Precalentar horno a 180°C." },
            { step: 2, instruction: "Mezclar pan molido, perejil, ajo y limón." },
            { step: 3, instruction: "Colocar salmón en bandeja." },
            { step: 4, instruction: "Agregar limón y aceite." },
            { step: 5, instruction: "Cubrir con mezcla." },
            { step: 6, instruction: "Hornear 15 minutos." }
        ]
    },
    {
        name: "Pasta cremosa de espinaca y champiñones",
        description: "Pasta cremosa con espinaca y champiñones.",
        cookingTime: 25,
        difficulty: "easy",
        cuisine: "Comida",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Comidas/Pasta cremosa de espinaca y champiñones.jpg",
        ingredients: [
            { amount: "200", item: "pasta", unit: "g" },
            { amount: "1", item: "espinaca", unit: "taza" },
            { amount: "1", item: "champiñones", unit: "taza" },
            { amount: "0.5", item: "crema", unit: "taza" },
            { amount: "1", item: "ajo", unit: "diente" }
        ],
        steps: [
            { step: 1, instruction: "Cocer pasta." },
            { step: 2, instruction: "Sofreír ajo y champiñones." },
            { step: 3, instruction: "Agregar espinaca." },
            { step: 4, instruction: "Añadir crema." },
            { step: 5, instruction: "Mezclar con pasta." }
        ]
    },
    {
        name: "Tacos de lechuga con pollo y yogur",
        description: "Tacos ligeros con pollo y salsa de yogur.",
        cookingTime: 25,
        difficulty: "easy",
        cuisine: "Comida",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Comidas/Tacos de lechuga con pollo y salsa de yogur.jpg",
        ingredients: [
            { amount: "1", item: "lechuga", unit: "pieza" },
            { amount: "2", item: "pollo desmenuzado", unit: "pieza" },
            { amount: "0.5", item: "yogur", unit: "taza" },
            { amount: "1", item: "limón", unit: "pieza" }
        ],
        steps: [
            { step: 1, instruction: "Mezclar yogur con limón." },
            { step: 2, instruction: "Agregar pollo." },
            { step: 3, instruction: "Servir en hojas de lechuga." }
        ]
    },
    {
        name: "Arroz frito con huevo y verduras",
        description: "Arroz estilo asiático con huevo y vegetales.",
        cookingTime: 20,
        difficulty: "easy",
        cuisine: "Comida",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Comidas/Arroz frito con huevo y verduras.jpg",
        ingredients: [
            { amount: "2", item: "arroz cocido", unit: "taza" },
            { amount: "2", item: "huevos", unit: "unidad" },
            { amount: "0.5", item: "verduras", unit: "taza" },
            { amount: "2", item: "salsa de soya", unit: "cucharada" }
        ],
        steps: [
            { step: 1, instruction: "Sofreír ajo." },
            { step: 2, instruction: "Agregar verduras." },
            { step: 3, instruction: "Añadir arroz." },
            { step: 4, instruction: "Cocinar huevo." },
            { step: 5, instruction: "Mezclar todo con soya." }
        ]
    },
    {
        name: "Pollo a la miel con mostaza",
        description: "Pollo jugoso con sabor dulce y ácido.",
        cookingTime: 35,
        difficulty: "easy",
        cuisine: "Comida",
        createdBy: "x6bed207ufxu4l0",
        imageUrl: "/images/recipes/Comidas/Pollo a la miel con mostaza.jpg",
        ingredients: [
            { amount: "4", item: "pollo", unit: "pieza" },
            { amount: "2", item: "miel", unit: "cucharada" },
            { amount: "1", item: "mostaza", unit: "cucharada" },
            { amount: "1", item: "ajo", unit: "diente" }
        ],
        steps: [
            { step: 1, instruction: "Mezclar miel, mostaza y ajo." },
            { step: 2, instruction: "Untar pollo." },
            { step: 3, instruction: "Hornear 25 minutos." }
        ]
    },
    {
        "name": "Brownies de Chocolate Caseros",
        "description": "Un postre clásico, suave y húmedo con intenso sabor a cacao.",
        "cookingTime": 40,
        "cuisine": "Postre",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Postres/Brownies de Chocolate Caseros.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "120", "item": "mantequilla", "unit": "g" },
            { "amount": "200", "item": "chocolate semiamargo", "unit": "g" },
            { "amount": "2", "item": "huevos", "unit": "unidad" },
            { "amount": "150", "item": "azúcar", "unit": "g" },
            { "amount": "1", "item": "vainilla", "unit": "cucharadita" },
            { "amount": "90", "item": "harina", "unit": "g" },
            { "amount": "30", "item": "cocoa en polvo", "unit": "g" },
            { "amount": "1", "item": "sal", "unit": "pizca" }
        ],
        "steps": [
            { "step": 1, "instruction": "Precalienta el horno a 180 °C." },
            { "step": 2, "instruction": "Derrite la mantequilla con el chocolate." },
            { "step": 3, "instruction": "Bate huevos con azúcar." },
            { "step": 4, "instruction": "Agrega vainilla y mezcla de chocolate." },
            { "step": 5, "instruction": "Añade ingredientes secos." },
            { "step": 6, "instruction": "Vierte en molde engrasado." },
            { "step": 7, "instruction": "Hornea 25 minutos." },
            { "step": 8, "instruction": "Deja enfriar y corta." }
        ]
    },
    {
        "name": "Cheesecake de Fresa sin Horno",
        "description": "Postre cremoso y fresco con base de galleta y topping de fresa.",
        "cookingTime": 260,
        "cuisine": "Postre",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Postres/Cheesecake de Fresa sin Horno.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "200", "item": "galletas tipo María", "unit": "g" },
            { "amount": "90", "item": "mantequilla", "unit": "g" },
            { "amount": "400", "item": "queso crema", "unit": "g" },
            { "amount": "200", "item": "crema para batir", "unit": "ml" },
            { "amount": "100", "item": "azúcar", "unit": "g" },
            { "amount": "10", "item": "grenetina", "unit": "g" },
            { "amount": "200", "item": "fresas", "unit": "g" }
        ],
        "steps": [
            { "step": 1, "instruction": "Tritura galletas y mezcla con mantequilla." },
            { "step": 2, "instruction": "Presiona en molde y refrigera." },
            { "step": 3, "instruction": "Bate queso crema, azúcar y vainilla." },
            { "step": 4, "instruction": "Agrega grenetina disuelta." },
            { "step": 5, "instruction": "Integra crema batida." },
            { "step": 6, "instruction": "Vierte en molde y refrigera 4 horas." },
            { "step": 7, "instruction": "Prepara salsa de fresa." },
            { "step": 8, "instruction": "Decora antes de servir." }
        ]
    },
    {
        "name": "Tiramisú Italiano Clásico",
        "description": "Postre italiano cremoso con café y mascarpone.",
        "cookingTime": 265,
        "cuisine": "Postre",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Postres/Tiramisú Italiano Clásico.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "250", "item": "queso mascarpone", "unit": "g" },
            { "amount": "200", "item": "crema para batir", "unit": "ml" },
            { "amount": "3", "item": "azúcar", "unit": "cucharadas" },
            { "amount": "1", "item": "vainilla", "unit": "cucharadita" },
            { "amount": "1", "item": "café espresso", "unit": "taza" },
            { "amount": "1", "item": "galletas ladyfingers", "unit": "paquete" }
        ],
        "steps": [
            { "step": 1, "instruction": "Bate crema con azúcar." },
            { "step": 2, "instruction": "Agrega mascarpone y vainilla." },
            { "step": 3, "instruction": "Remoja galletas en café." },
            { "step": 4, "instruction": "Coloca capas alternando crema y galletas." },
            { "step": 5, "instruction": "Espolvorea cocoa." },
            { "step": 6, "instruction": "Refrigera 4 horas." }
        ]
    },
    {
        "name": "Mochi Japonés de Fresa",
        "description": "Postre japonés suave y elástico relleno de crema y fresa.",
        "cookingTime": 50,
        "cuisine": "Postre",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Postres/Mochi Japonés de Fresa.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "1", "item": "harina de arroz glutinoso", "unit": "taza" },
            { "amount": "0.25", "item": "azúcar", "unit": "taza" },
            { "amount": "0.75", "item": "agua", "unit": "taza" },
            { "amount": "6", "item": "fresas", "unit": "unidad" },
            { "amount": "100", "item": "crema batida", "unit": "ml" }
        ],
        "steps": [
            { "step": 1, "instruction": "Mezcla harina, azúcar y agua." },
            { "step": 2, "instruction": "Cocina en microondas hasta textura elástica." },
            { "step": 3, "instruction": "Espolvorea fécula y enfría." },
            { "step": 4, "instruction": "Divide y forma círculos." },
            { "step": 5, "instruction": "Rellena con crema y fresa." },
            { "step": 6, "instruction": "Cierra y forma bolitas." },
            { "step": 7, "instruction": "Refrigera 30 minutos." }
        ]
    },
    {
        "name": "Flan Napolitano",
        "description": "Postre clásico mexicano, cremoso con caramelo.",
        "cookingTime": 195,
        "cuisine": "Postre",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Postres/Flan Napolitano.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "1", "item": "azúcar", "unit": "taza" },
            { "amount": "0.25", "item": "agua", "unit": "taza" },
            { "amount": "1", "item": "leche condensada", "unit": "lata" },
            { "amount": "1", "item": "leche evaporada", "unit": "lata" },
            { "amount": "190", "item": "queso crema", "unit": "g" },
            { "amount": "5", "item": "huevos", "unit": "unidad" }
        ],
        "steps": [
            { "step": 1, "instruction": "Precalienta el horno a 180 °C." },
            { "step": 2, "instruction": "Prepara caramelo." },
            { "step": 3, "instruction": "Vierte en molde." },
            { "step": 4, "instruction": "Licúa ingredientes." },
            { "step": 5, "instruction": "Hornea a baño maría." },
            { "step": 6, "instruction": "Enfría y refrigera." }
        ]
    },
    {
        "name": "Wrap Doblado",
        "description": "Wrap viral con capas de ingredientes dobladas para combinar sabores en cada mordida.",
        "cookingTime": 15,
        "cuisine": "Viral",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Recetas virales/Wrap Doblado.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "1", "item": "tortilla de harina grande", "unit": "pieza" },
            { "amount": "100", "item": "queso", "unit": "g" },
            { "amount": "100", "item": "pollo cocido o jamón", "unit": "g" },
            { "amount": "1", "item": "aguacate", "unit": "pieza" },
            { "amount": "1", "item": "lechuga", "unit": "taza" },
            { "amount": "1", "item": "salsa o aderezo", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Corta la tortilla del centro hacia el borde." },
            { "step": 2, "instruction": "Divide en 4 secciones." },
            { "step": 3, "instruction": "Coloca ingredientes en cada sección." },
            { "step": 4, "instruction": "Dobla en forma de triángulo." },
            { "step": 5, "instruction": "Cocina en sartén hasta dorar." },
            { "step": 6, "instruction": "Voltea y dora ambos lados." }
        ]
    },
    {
        "name": "Pasta con Queso Feta al Horno",
        "description": "Pasta viral con salsa cremosa de feta y tomates cherry.",
        "cookingTime": 35,
        "cuisine": "Viral",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Recetas virales/Pasta con Queso Feta al Horno.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "250", "item": "pasta", "unit": "g" },
            { "amount": "200", "item": "queso feta", "unit": "g" },
            { "amount": "2", "item": "tomates cherry", "unit": "tazas" },
            { "amount": "2", "item": "aceite de oliva", "unit": "cucharadas" },
            { "amount": "2", "item": "ajo picado", "unit": "dientes" },
            { "amount": "1", "item": "sal y pimienta", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Precalienta el horno a 200 °C." },
            { "step": 2, "instruction": "Coloca tomates con aceite, ajo y sal." },
            { "step": 3, "instruction": "Agrega el queso feta al centro." },
            { "step": 4, "instruction": "Hornea 25 minutos." },
            { "step": 5, "instruction": "Cocina la pasta." },
            { "step": 6, "instruction": "Mezcla todo hasta formar salsa." },
            { "step": 7, "instruction": "Integra la pasta." }
        ]
    },
    {
        "name": "Smash Burger",
        "description": "Hamburguesa con carne delgada y bordes crujientes estilo viral.",
        "cookingTime": 20,
        "cuisine": "Viral",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Recetas virales/Smash Burger.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "300", "item": "carne molida de res", "unit": "g" },
            { "amount": "2", "item": "panes de hamburguesa", "unit": "pieza" },
            { "amount": "2", "item": "queso", "unit": "rebanadas" },
            { "amount": "1", "item": "mantequilla", "unit": "cucharada" },
            { "amount": "1", "item": "lechuga", "unit": "al gusto" },
            { "amount": "1", "item": "jitomate", "unit": "pieza" }
        ],
        "steps": [
            { "step": 1, "instruction": "Forma bolas de carne." },
            { "step": 2, "instruction": "Calienta sartén a fuego alto." },
            { "step": 3, "instruction": "Aplasta la carne." },
            { "step": 4, "instruction": "Sazona y cocina." },
            { "step": 5, "instruction": "Voltea y agrega queso." },
            { "step": 6, "instruction": "Tuesta el pan." },
            { "step": 7, "instruction": "Arma la hamburguesa." }
        ]
    },
    {
        "name": "Chicken Tenders con Hot Honey",
        "description": "Pollo crujiente con salsa dulce y picante estilo viral.",
        "cookingTime": 30,
        "cuisine": "Viral",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Recetas virales/Chicken Tenders con Hot Honey.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "500", "item": "pechuga de pollo en tiras", "unit": "g" },
            { "amount": "1", "item": "harina", "unit": "taza" },
            { "amount": "2", "item": "huevos", "unit": "pieza" },
            { "amount": "1", "item": "pan molido", "unit": "taza" },
            { "amount": "3", "item": "miel", "unit": "cucharadas" },
            { "amount": "1", "item": "salsa picante", "unit": "cucharadita" }
        ],
        "steps": [
            { "step": 1, "instruction": "Sazona el pollo." },
            { "step": 2, "instruction": "Empaniza con harina, huevo y pan." },
            { "step": 3, "instruction": "Fríe hasta dorar." },
            { "step": 4, "instruction": "Mezcla miel con salsa picante." },
            { "step": 5, "instruction": "Baña el pollo con la salsa." }
        ]
    },
    {
        "name": "Pizza Toast",
        "description": "Mini pizza rápida con pan tostado, queso y toppings.",
        "cookingTime": 13,
        "cuisine": "Viral",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Recetas virales/Pizza Toast.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "2", "item": "pan", "unit": "rebanadas" },
            { "amount": "2", "item": "salsa de tomate", "unit": "cucharadas" },
            { "amount": "0.5", "item": "queso mozzarella", "unit": "taza" },
            { "amount": "1", "item": "pepperoni o toppings", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Precalienta horno a 180 °C." },
            { "step": 2, "instruction": "Unta salsa en el pan." },
            { "step": 3, "instruction": "Agrega queso." },
            { "step": 4, "instruction": "Añade toppings." },
            { "step": 5, "instruction": "Hornea 6-8 minutos." }
        ]
    },
    {
        "name": "Jalapeño Poppers Rellenos",
        "description": "Snack crujiente por fuera y cremoso por dentro con jalapeños rellenos de queso.",
        "cookingTime": 35,
        "cuisine": "Snack",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Snacks/Jalapeño Poppers Rellenos.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "6", "item": "chiles jalapeños", "unit": "pieza" },
            { "amount": "150", "item": "queso crema", "unit": "g" },
            { "amount": "0.5", "item": "queso cheddar", "unit": "taza" },
            { "amount": "100", "item": "tocino", "unit": "g" },
            { "amount": "0.5", "item": "pan molido", "unit": "taza" }
        ],
        "steps": [
            { "step": 1, "instruction": "Parte los jalapeños y retira semillas." },
            { "step": 2, "instruction": "Mezcla quesos con tocino." },
            { "step": 3, "instruction": "Rellena los jalapeños." },
            { "step": 4, "instruction": "Espolvorea pan molido." },
            { "step": 5, "instruction": "Hornea a 180 °C por 20 minutos." }
        ]
    },
    {
        "name": "Boneless Crujientes con Salsa Buffalo",
        "description": "Pollo crujiente bañado en salsa buffalo, ideal para compartir.",
        "cookingTime": 30,
        "cuisine": "Snack",
        "difficulty": "medium",
        "imageUrl": "/images/recipes/Snacks/Boneless Crujientes con Salsa Buffalo.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "500", "item": "pechuga de pollo en cubos", "unit": "g" },
            { "amount": "1", "item": "harina", "unit": "taza" },
            { "amount": "2", "item": "huevos", "unit": "pieza" },
            { "amount": "1", "item": "panko", "unit": "taza" },
            { "amount": "1", "item": "salsa buffalo", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Empaniza el pollo con harina, huevo y panko." },
            { "step": 2, "instruction": "Fríe hasta dorar." },
            { "step": 3, "instruction": "Mezcla con salsa buffalo." }
        ]
    },
    {
        "name": "Papas Gajo con Queso y Tocino",
        "description": "Papas crujientes con queso derretido y tocino.",
        "cookingTime": 40,
        "cuisine": "Snack",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Snacks/Papas Gajo con Queso y Tocino.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "4", "item": "papas", "unit": "pieza" },
            { "amount": "1", "item": "queso cheddar", "unit": "taza" },
            { "amount": "100", "item": "tocino", "unit": "g" },
            { "amount": "1", "item": "ajo en polvo", "unit": "cucharadita" },
            { "amount": "1", "item": "sal", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Corta las papas en gajos." },
            { "step": 2, "instruction": "Hornea a 200 °C por 30 minutos." },
            { "step": 3, "instruction": "Agrega queso y tocino." },
            { "step": 4, "instruction": "Hornea 5 minutos más." }
        ]
    },
    {
        "name": "Nachos Supreme",
        "description": "Nachos con carne, queso y toppings perfectos para compartir.",
        "cookingTime": 25,
        "cuisine": "Snack",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Snacks/Nachos Supreme.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "1", "item": "totopos", "unit": "bolsa" },
            { "amount": "1", "item": "queso cheddar", "unit": "taza" },
            { "amount": "200", "item": "carne molida", "unit": "g" },
            { "amount": "1", "item": "jalapeños", "unit": "al gusto" },
            { "amount": "1", "item": "guacamole", "unit": "al gusto" },
            { "amount": "1", "item": "crema", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Coloca totopos en un plato." },
            { "step": 2, "instruction": "Agrega queso y carne caliente." },
            { "step": 3, "instruction": "Decora con jalapeños, crema y guacamole." }
        ]
    },
    {
        "name": "Mini Pizza Bites",
        "description": "Mini pizzas rápidas ideales para snack o fiesta.",
        "cookingTime": 22,
        "cuisine": "Snack",
        "difficulty": "easy",
        "imageUrl": "/images/recipes/Snacks/Mini Pizza Bites.jpg",
        "createdBy": "x6bed207ufxu4l0",
        "ingredients": [
            { "amount": "1", "item": "masa para pizza", "unit": "porción" },
            { "amount": "1", "item": "salsa de tomate", "unit": "taza" },
            { "amount": "1", "item": "queso mozzarella", "unit": "taza" },
            { "amount": "1", "item": "pepperoni", "unit": "al gusto" }
        ],
        "steps": [
            { "step": 1, "instruction": "Corta círculos de masa." },
            { "step": 2, "instruction": "Agrega salsa, queso y toppings." },
            { "step": 3, "instruction": "Hornea a 180 °C por 12 minutos." }
        ]
    }
];

// 👇 INSERT MASIVO
for (const recipe of recipes) {
    const result = await pb.collection('recipes').create(recipe);
    console.log('Insertado:', result.name);
}

console.log('✅ Todas las recetas insertadas');