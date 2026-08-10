/* ══════════════════════════════════════════
   THE CHICHALÁ DICTIONARY — JS
   IE Técnica Camacho Angarita · Sede Chichalá
══════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────
   1. BASE DE DATOS — 100 PALABRAS
────────────────────────────────────────── */
const WORDS = [

    // ── 🌿 CAMPO (rural) ──
    {
        id: 1, cat: 'rural', emoji: '☕',
        word: 'coffee harvest',
        phonetic: '/ˈkɒfi ˈhɑːrvɪst/',
        translation: 'cosecha de café',
        example: 'During the <strong>coffee harvest</strong>, the whole family works together in Chichalá.',
        exampleEs: 'Durante la cosecha de café, toda la familia trabaja junta en Chichalá.'
    },
    {
        id: 2, cat: 'rural', emoji: '🌿',
        word: 'sugarcane',
        phonetic: '/ˈʃʊɡərkeɪn/',
        translation: 'caña de azúcar',
        example: 'We use <strong>sugarcane</strong> to produce panela in our trapiche.',
        exampleEs: 'Usamos caña de azúcar para producir panela en nuestro trapiche.'
    },
    {
        id: 3, cat: 'rural', emoji: '👨‍🌾',
        word: 'farmer',
        phonetic: '/ˈfɑːrmər/',
        translation: 'campesino / agricultor',
        example: 'My grandfather is a proud <strong>farmer</strong> who grows coffee and corn.',
        exampleEs: 'Mi abuelo es un orgulloso campesino que cultiva café y maíz.'
    },
    {
        id: 4, cat: 'rural', emoji: '🏡',
        word: 'farmhouse',
        phonetic: '/ˈfɑːrmhaʊs/',
        translation: 'casa de campo / finca',
        example: 'Our <strong>farmhouse</strong> has a beautiful view of the mountains.',
        exampleEs: 'Nuestra finca tiene una hermosa vista de las montañas.'
    },
    {
        id: 5, cat: 'rural', emoji: '🌾',
        word: 'to harvest',
        phonetic: '/tuː ˈhɑːrvɪst/',
        translation: 'cosechar',
        example: 'We <strong>harvest</strong> the coffee beans every October and November.',
        exampleEs: 'Cosechamos los granos de café cada octubre y noviembre.'
    },
    {
        id: 6, cat: 'rural', emoji: '🐄',
        word: 'livestock',
        phonetic: '/ˈlaɪvstɒk/',
        translation: 'ganado / animales de granja',
        example: 'The <strong>livestock</strong> on the farm includes cows, chickens and pigs.',
        exampleEs: 'El ganado en la finca incluye vacas, gallinas y cerdos.'
    },
    {
        id: 7, cat: 'rural', emoji: '🌱',
        word: 'seed',
        phonetic: '/siːd/',
        translation: 'semilla',
        example: 'We plant the <strong>seed</strong> in the ground during the rainy season.',
        exampleEs: 'Plantamos la semilla en la tierra durante la temporada de lluvias.'
    },
    {
        id: 8, cat: 'rural', emoji: '🪓',
        word: 'to cultivate',
        phonetic: '/tuː ˈkʌltɪveɪt/',
        translation: 'cultivar',
        example: 'Farmers in Chichalá <strong>cultivate</strong> coffee on the steep hillsides.',
        exampleEs: 'Los campesinos en Chichalá cultivan café en las laderas empinadas.'
    },
    {
        id: 9, cat: 'rural', emoji: '🏔️',
        word: 'hillside',
        phonetic: '/ˈhɪlsaɪd/',
        translation: 'ladera / falda del cerro',
        example: 'The coffee plants grow on the <strong>hillside</strong> above our village.',
                example: 'The coffee plants grow on the <strong>hillside</strong> above our village.',
        exampleEs: 'Las plantas de café crecen en la ladera sobre nuestro pueblo.'
    },
    {
        id: 10, cat: 'rural', emoji: '🌧️',
        word: 'rainy season',
        phonetic: '/ˈreɪni ˈsiːzn/',
        translation: 'temporada de lluvias',
        example: 'The <strong>rainy season</strong> is essential for growing sugarcane and corn.',
        exampleEs: 'La temporada de lluvias es esencial para cultivar caña de azúcar y maíz.'
    },

    // ── 🏫 ESCUELA (school) ──
    {
        id: 11, cat: 'school', emoji: '📚',
        word: 'notebook',
        phonetic: '/ˈnoʊtbʊk/',
        translation: 'cuaderno',
        example: 'I write all my English exercises in my <strong>notebook</strong>.',
        exampleEs: 'Escribo todos mis ejercicios de inglés en mi cuaderno.'
    },
    {
        id: 12, cat: 'school', emoji: '✏️',
        word: 'homework',
        phonetic: '/ˈhɑːmwɜːrk/',
        translation: 'tarea escolar',
        example: 'My <strong>homework</strong> is to write about my family in Chichalá.',
        exampleEs: 'Mi tarea escolar es escribir sobre mi familia en Chichalá.'
    },
    {
        id: 13, cat: 'school', emoji: '👩‍🏫',
        word: 'teacher',
        phonetic: '/ˈtiːtʃər/',
        translation: 'docente / profesor',
        example: 'Our <strong>teacher</strong>, Profe Nelson, always makes learning fun.',
        exampleEs: 'Nuestro docente, Profe Nelson, siempre hace que aprender sea divertido.'
    },
    {
        id: 14, cat: 'school', emoji: '🎓',
        word: 'student',
        phonetic: '/ˈstuːdnt/',
        translation: 'estudiante',
        example: 'Every <strong>student</strong> in Chichalá has a unique story to tell.',
        exampleEs: 'Cada estudiante en Chichalá tiene una historia única que contar.'
    },
    {
        id: 15, cat: 'school', emoji: '🏫',
        word: 'classroom',
        phonetic: '/ˈklɑːsruːm/',
        translation: 'aula',
        example: 'Our <strong>classroom</strong> overlooks the coffee fields and the river.',
        exampleEs: 'Nuestro aula mira hacia los cafetales y el río.'
    },
    {
        id: 16, cat: 'school', emoji: '📖',
        word: 'textbook',
        phonetic: '/ˈtekstbʊk/',
        translation: 'libro de texto',
        example: 'We use the <strong>textbook</strong> to learn new vocabulary every week.',
        exampleEs: 'Usamos el libro de texto para aprender vocabulario nuevo cada semana.'
    },
    {
        id: 17, cat: 'school', emoji: '🧪',
        word: 'experiment',
        phonetic: '/ɪkˈsperɪmənt/',
        translation: 'experimento',
        example: 'In science class, we do an <strong>experiment</strong> with water and soil.',
        exampleEs: 'En clase de ciencias, hacemos un experimento con agua y tierra.'
    },
    {
        id: 18, cat: 'school', emoji: '📢',
        word: 'announcement',
        phonetic: '/əˈnaʊnsmənt/',
        translation: 'anuncio',
        example: 'The principal made an <strong>announcement</strong> about the school fair.',
        exampleEs: 'El rector hizo un anuncio sobre la feria escolar.'
    },
    {
        id: 19, cat: 'school', emoji: '📝',
        word: 'assignment',
        phonetic: '/əˈsaɪnmənt/',
        translation: 'trabajo / tarea',
        example: 'My next <strong>assignment</strong> is to draw a map of Chichalá.',
        exampleEs: 'Mi próximo trabajo es dibujar un mapa de Chichalá.'
    },
    {
        id: 20, cat: 'school', emoji: '🏆',
        word: 'prize',
        phonetic: '/praɪz/',
        translation: 'premio',
        example: 'The best drawing in class wins a small <strong>prize</strong> from the teacher.',
        exampleEs: 'El mejor dibujo en clase gana un pequeño premio del docente.'
    },

    // ── 👨‍👩‍👧 FAMILIA (family) ──
    {
        id: 21, cat: 'family', emoji: '👨‍👩‍👧',
        word: 'family',
        phonetic: '/ˈfæməli/',
        translation: 'familia',
        example: 'My <strong>family</strong> lives in a small house near the river in Chichalá.',
        exampleEs: 'Mi familia vive en una casa pequeña cerca del río en Chichalá.'
    },
    {
        id: 22, cat: 'family', emoji: '👩‍👧',
        word: 'mother',
        phonetic: '/ˈmʌðər/',
        translation: 'madre',
        example: 'My <strong>mother</strong> prepares panela water every morning for breakfast.',
        exampleEs: 'Mi madre prepara agua de panela cada mañana para el desayuno.'
    },
    {
        id: 23, cat: 'family', emoji: '👨‍👦',
        word: 'father',
        phonetic: '/ˈfɑːðər/',
        translation: 'padre',
        example: 'My <strong>father</strong> teaches me how to care for the coffee plants.',
        exampleEs: 'Mi padre me enseña cómo cuidar las plantas de café.'
    },
    {
        id: 24, cat: 'family', emoji: '👧',
        word: 'sister',
        phonetic: '/ˈsɪstər/',
        translation: 'hermana',
        example: 'My <strong>sister</strong> helps me with my English homework every day.',
        exampleEs: 'Mi hermana me ayuda con mi tarea de inglés todos los días.'
    },
    {
        id: 25, cat: 'family', emoji: '👦',
        word: 'brother',
        phonetic: '/ˈbrʌðər/',
        translation: 'hermano',
        example: 'My <strong>brother</strong> and I walk to school together every morning.',
        exampleEs: 'Mi hermano y yo caminamos a la escuela juntos cada mañana.'
    },
    {
        id: 26, cat: 'family', emoji: '👵',
        word: 'grandmother',
        phonetic: '/ˈɡrænmʌðər/',
        translation: 'abuela',
                example: 'My <strong>grandmother</strong> tells me stories about Chichalá when she was young.',
        exampleEs: 'Mi abuela me cuenta historias sobre Chichalá cuando ella era joven.'
    },
    {
        id: 27, cat: 'family', emoji: '👴',
        word: 'grandfather',
        phonetic: '/ˈɡrænfɑːðər/',
        translation: 'abuelo',
        example: 'My <strong>grandfather</strong> knows every tree and every path in the countryside.',
        exampleEs: 'Mi abuelo conoce cada árbol y cada sendero en el campo.'
    },
    {
        id: 28, cat: 'family', emoji: '👨‍👩‍👧‍👦',
        word: 'relative',
        phonetic: '/ˈrelətɪv/',
        translation: 'pariente',
        example: 'We have many <strong>relatives</strong> who live in different villages around Chaparral.',
        exampleEs: 'Tenemos muchos parientes que viven en diferentes veredas alrededor de Chaparral.'
    },
    {
        id: 29, cat: 'family', emoji: '🤝',
        word: 'neighbor',
        phonetic: '/ˈneɪbər/',
        translation: 'vecino / vecina',
        example: 'Our <strong>neighbor</strong> helps us when we need extra hands for the harvest.',
        exampleEs: 'Nuestro vecino nos ayuda cuando necesitamos más manos para la cosecha.'
    },
    {
        id: 30, cat: 'family', emoji: '🏡',
        word: 'home',
        phonetic: '/hoʊm/',
        translation: 'hogar',
        example: 'Chichalá is more than a village — it is my <strong>home</strong>.',
        exampleEs: 'Chichalá es más que una vereda — es mi hogar.'
    },

    // ── 🔗 CONECTORES (connectors) ──
    {
        id: 31, cat: 'connectors', emoji: '🔗',
        word: 'because',
        phonetic: '/bɪˈkɔːz/',
        translation: 'porque',
        example: 'We wake up early <strong>because</strong> we have to work on the farm.',
        exampleEs: 'Nos levantamos temprano porque tenemos que trabajar en la finca.'
    },
    {
        id: 32, cat: 'connectors', emoji: '➡️',
        word: 'therefore',
        phonetic: '/ˈðerfɔːr/',
        translation: 'por lo tanto',
        example: 'The rain was heavy, <strong>therefore</strong>, the harvest was very good.',
        exampleEs: 'Llovió mucho, por lo tanto, la cosecha fue muy buena.'
    },
    {
        id: 33, cat: 'connectors', emoji: '🔄',
        word: 'however',
        phonetic: '/haʊˈevər/',
        translation: 'sin embargo',
        example: 'The road is long and difficult, <strong>however</strong>, we love our village.',
        exampleEs: 'El camino es largo y difícil, sin embargo, amamos nuestro pueblo.'
    },
    {
        id: 34, cat: 'connectors', emoji: '➕',
        word: 'also',
        phonetic: '/ˈɔːlsoʊ/',
        translation: 'también',
        example: 'We grow coffee. <strong>Also</strong>, we produce panela and corn.',
        exampleEs: 'Cultivamos café. También producimos panela y maíz.'
    },
    {
        id: 35, cat: 'connectors', emoji: '📌',
        word: 'first',
        phonetic: '/fɜːrst/',
        translation: 'primero',
        example: '<strong>First</strong>, we pick the coffee. Then, we dry it in the sun.',
        exampleEs: 'Primero, cosechamos el café. Luego, lo secamos al sol.'
    },
    {
        id: 36, cat: 'connectors', emoji: '✅',
        word: 'then',
        phonetic: '/ðen/',
        translation: 'luego / entonces',
        example: 'We wash the beans, <strong>then</strong> we roast them for coffee.',
        exampleEs: 'Lavamos los granos, luego los tostamos para café.'
    },
    {
        id: 37, cat: 'connectors', emoji: '🔚',
        word: 'finally',
        phonetic: '/ˈfaɪnəli/',
        translation: 'finalmente',
        example: '<strong>Finally</strong>, we enjoy a cup of coffee with our family.',
        exampleEs: 'Finalmente, disfrutamos una taza de café con nuestra familia.'
    },
    {
        id: 38, cat: 'connectors', emoji: '➡️',
        word: 'so',
        phonetic: '/soʊ/',
        translation: 'así que',
        example: 'It was a good harvest, <strong>so</strong> we celebrated with a party.',
        exampleEs: 'Fue una buena cosecha, así que celebramos con una fiesta.'
    },
    {
        id: 39, cat: 'connectors', emoji: '🔄',
        word: 'although',
        phonetic: '/ɔːlˈðoʊ/',
        translation: 'aunque',
        example: '<strong>Although</strong> the work is hard, we are always happy in Chichalá.',
        exampleEs: 'Aunque el trabajo es duro, siempre estamos felices en Chichalá.'
    },
    {
        id: 40, cat: 'connectors', emoji: '➕',
        word: 'furthermore',
        phonetic: '/ˈfɜːrðərmɔːr/',
        translation: 'además',
        example: 'We take care of our land. <strong>Furthermore</strong>, we respect our traditions.',
        exampleEs: 'Cuidamos nuestra tierra. Además, respetamos nuestras tradiciones.'
    },

    // ── 📋 INSTRUCCIONES (instructions) ──
    {
        id: 41, cat: 'instructions', emoji: '📋',
        word: 'read',
        phonetic: '/riːd/',
        translation: 'leer',
        example: '<strong>Read</strong> the instructions carefully before starting the activity.',
        exampleEs: 'Lee las instrucciones cuidadosamente antes de empezar la actividad.'
    },
    {
        id: 42, cat: 'instructions', emoji: '✍️',
        word: 'write',
        phonetic: '/raɪt/',
        translation: 'escribir',
        example: '<strong>Write</strong> your name at the top of the page before you begin.',
        exampleEs: 'Escribe tu nombre en la parte superior de la página antes de empezar.'
    },
    {
        id: 43, cat: 'instructions', emoji: '✅',
        word: 'choose',
        phonetic: '/tʃuːz/',
        translation: 'elegir',
                example: '<strong>Choose</strong> one of the topics to write about in your notebook.',
        exampleEs: 'Elige uno de los temas para escribir sobre ello en tu cuaderno.'
    },
    {
        id: 44, cat: 'instructions', emoji: '✏️',
        word: 'draw',
        phonetic: '/drɔː/',
        translation: 'dibujar',
        example: '<strong>Draw</strong> a picture of your favorite place in Chichalá.',
        exampleEs: 'Dibuja una imagen de tu lugar favorito en Chichalá.'
    },
    {
        id: 45, cat: 'instructions', emoji: '🗣️',
        word: 'speak',
        phonetic: '/spiːk/',
        translation: 'hablar',
        example: '<strong>Speak</strong> your answer in English with your partner.',
        exampleEs: 'Habla tu respuesta en inglés con tu compañero.'
    },
    {
        id: 46, cat: 'instructions', emoji: '👂',
        word: 'listen',
        phonetic: '/ˈlɪsn/',
        translation: 'escuchar',
        example: '<strong>Listen</strong> to the audio and repeat the words after the teacher.',
        exampleEs: 'Escucha el audio y repite las palabras después del docente.'
    },
    {
        id: 47, cat: 'instructions', emoji: '🔗',
        word: 'connect',
        phonetic: '/kəˈnekt/',
        translation: 'conectar / unir',
        example: '<strong>Connect</strong> each word with its correct meaning.',
        exampleEs: 'Conecta cada palabra con su significado correcto.'
    },
    {
        id: 48, cat: 'instructions', emoji: '✅',
        word: 'check',
        phonetic: '/tʃek/',
        translation: 'verificar / revisar',
        example: '<strong>Check</strong> your spelling before you hand in your work.',
        exampleEs: 'Revisa tu ortografía antes de entregar tu trabajo.'
    },
    {
        id: 49, cat: 'instructions', emoji: '❌',
        word: 'don’t forget',
        phonetic: '/doʊnt fərˈɡet/',
        translation: 'no olvides',
        example: '<strong>Don’t forget</strong> to write your name on the assignment.',
        exampleEs: 'No olvides escribir tu nombre en la tarea.'
    },
    {
        id: 50, cat: 'instructions', emoji: '⏳',
        word: 'wait',
        phonetic: '/weɪt/',
        translation: 'esperar',
        example: '<strong>Wait</strong> for your turn to speak in front of the class.',
        exampleEs: 'Espera tu turno para hablar frente a la clase.'
    },

    // ── 🌎 AMBIENTE (environment) ──
    {
        id: 51, cat: 'environment', emoji: '🌳',
        word: 'landscape',
        phonetic: '/ˈlændskeɪp/',
        translation: 'paisaje',
        example: 'The <strong>landscape</strong> of Chichalá is full of green hills and clear rivers.',
        exampleEs: 'El paisaje de Chichalá está lleno de colinas verdes y ríos cristalinos.'
    },
    {
        id: 52, cat: 'environment', emoji: '💧',
        word: 'river',
        phonetic: '/ˈrɪvər/',
        translation: 'río',
        example: 'We wash our clothes and vegetables in the <strong>river</strong> near our house.',
        exampleEs: 'Lavamos nuestra ropa y verduras en el río cerca de nuestra casa.'
    },
    {
        id: 53, cat: 'environment', emoji: '🌿',
        word: 'forest',
        phonetic: '/ˈfɔːrɪst/',
        translation: 'bosque',
        example: 'The <strong>forest</strong> near Chichalá is home to many birds and animals.',
        exampleEs: 'El bosque cerca de Chichalá es hogar de muchos pájaros y animales.'
    },
    {
        id: 54, cat: 'environment', emoji: '☀️',
        word: 'sunshine',
        phonetic: '/ˈsʌnʃaɪn/',
        translation: 'luz del sol / sol',
        example: 'The <strong>sunshine</strong> helps the coffee beans dry after harvesting.',
        exampleEs: 'La luz del sol ayuda a secar los granos de café después de la cosecha.'
    },
    {
        id: 55, cat: 'environment', emoji: '🌧️',
        word: 'rain',
        phonetic: '/reɪn/',
        translation: 'lluvia',
        example: 'The <strong>rain</strong> in Chichalá is essential for growing crops.',
        exampleEs: 'La lluvia en Chichalá es esencial para cultivar cultivos.'
    },
    {
        id: 56, cat: 'environment', emoji: '🌎',
        word: 'earth',
        phonetic: '/ɜːrθ/',
        translation: 'tierra / suelo',
        example: 'We must take care of the <strong>earth</strong> to grow healthy food.',
        exampleEs: 'Debemos cuidar la tierra para cultivar alimentos sanos.'
    },
    {
        id: 57, cat: 'environment', emoji: '🌱',
        word: 'plant',
        phonetic: '/plænt/',
        translation: 'planta',
        example: 'We <strong>plant</strong> new coffee trees every year to replace the old ones.',
        exampleEs: 'Plantamos nuevos árboles de café cada año para reemplazar los viejos.'
    },
    {
        id: 58, cat: 'environment', emoji: '☀️',
        word: 'weather',
        phonetic: '/ˈweðər/',
        translation: 'clima / tiempo',
        example: 'The <strong>weather</strong> in Chaparral is warm and rainy most of the year.',
        exampleEs: 'El clima en Chaparral es cálido y lluvioso la mayor parte del año.'
    },
    {
        id: 59, cat: 'environment', emoji: '🌊',
        word: 'stream',
        phonetic: '/striːm/',
        translation: 'quebrada',
        example: 'The small <strong>stream</strong> near our house provides water for our animals.',
        exampleEs: 'La pequeña quebrada cerca de nuestra casa provee agua para nuestros animales.'
    },
    {
        id: 60, cat: 'environment', emoji: '♻️',
        word: 'recycle',
        phonetic: '/ˈriːsaɪkl/',
        translation: 'reciclar',
        example: 'We <strong>recycle</strong> plastic and paper to protect our environment.',
        exampleEs: 'Reciclamos plástico y papel para proteger nuestro ambiente.'
    },

    // ── 💼 EMPRENDEMIENTO (entrepreneurship) ──
    {
        id: 61, cat: 'entrepreneurship', emoji: '💰',
        word: 'product',
        phonetic: '/ˈprɒdʌkt/',
        translation: 'producto',
        example: 'Our main <strong>product</strong> is coffee, but we also sell panela and crafts.',
        exampleEs: 'Nuestro producto principal es café, pero también vendemos panela y artesanías.'
    },
    {
        id: 62, cat: 'entrepreneurship', emoji: '🛒',
        word: 'sell',
        phonetic: '/sell/',
                example: 'We <strong>sell</strong> our panela and coffee at the market in Chaparral.',
        exampleEs: 'Vendemos nuestra panela y café en el mercado de Chaparral.'
    },
    {
        id: 63, cat: 'entrepreneurship', emoji: '🏪',
        word: 'market',
        phonetic: '/ˈmɑːrkɪt/',
        translation: 'mercado',
        example: 'Every Saturday, families from Chichalá go to the <strong>market</strong> in town.',
        exampleEs: 'Cada sábado, las familias de Chichalá van al mercado en el pueblo.'
    },
    {
        id: 64, cat: 'entrepreneurship', emoji: '📈',
        word: 'profit',
        phonetic: '/ˈprɒfɪt/',
        translation: 'ganancia',
        example: 'The <strong>profit</strong> from the harvest helps our family for the whole year.',
        exampleEs: 'La ganancia de la cosecha ayuda a nuestra familia durante todo el año.'
    },
    {
        id: 65, cat: 'entrepreneurship', emoji: '🏺',
        word: 'craft',
        phonetic: '/krɑːft/',
        translation: 'artesanía',
        example: 'My aunt makes beautiful <strong>crafts</strong> from natural materials of the forest.',
        exampleEs: 'Mi tía hace hermosas artesanías con materiales naturales del bosque.'
    },
    {
        id: 66, cat: 'entrepreneurship', emoji: '🤝',
        word: 'customer',
        phonetic: '/ˈkʌstəmər/',
        translation: 'cliente',
        example: 'Our best <strong>customer</strong> buys twenty kilos of coffee every month.',
        exampleEs: 'Nuestro mejor cliente compra veinte kilos de café cada mes.'
    },
    {
        id: 67, cat: 'entrepreneurship', emoji: '💡',
        word: 'idea',
        phonetic: '/aɪˈdiːə/',
        translation: 'idea',
        example: 'My father had a great <strong>idea</strong> to sell panela online from Chichalá.',
        exampleEs: 'Mi padre tuvo una gran idea para vender panela en línea desde Chichalá.'
    },
    {
        id: 68, cat: 'entrepreneurship', emoji: '📦',
        word: 'package',
        phonetic: '/ˈpækɪdʒ/',
        translation: 'empaque / paquete',
        example: 'We design our own <strong>package</strong> with the colors of our village.',
        exampleEs: 'Diseñamos nuestro propio empaque con los colores de nuestra vereda.'
    },
    {
        id: 69, cat: 'entrepreneurship', emoji: '📊',
        word: 'budget',
        phonetic: '/ˈbʌdʒɪt/',
        translation: 'presupuesto',
        example: 'We plan our <strong>budget</strong> carefully before starting the planting season.',
        exampleEs: 'Planeamos nuestro presupuesto cuidadosamente antes de comenzar la temporada de siembra.'
    },
    {
        id: 70, cat: 'entrepreneurship', emoji: '🚀',
        word: 'business',
        phonetic: '/ˈbɪznɪs/',
        translation: 'negocio / empresa',
        example: 'Our family coffee <strong>business</strong> has been running for three generations.',
        exampleEs: 'El negocio de café de nuestra familia lleva tres generaciones funcionando.'
    },

    // ── 🤖 TECNOLOGÍA (technology) ──
    {
        id: 71, cat: 'technology', emoji: '💻',
        word: 'device',
        phonetic: '/dɪˈvaɪs/',
        translation: 'dispositivo',
        example: 'A tablet or phone is a <strong>device</strong> we use for digital learning.',
        exampleEs: 'Una tableta o teléfono es un dispositivo que usamos para el aprendizaje digital.'
    },
    {
        id: 72, cat: 'technology', emoji: '🌐',
        word: 'network',
        phonetic: '/ˈnetwɜːrk/',
        translation: 'red',
        example: 'A good <strong>network</strong> connection is important for online learning.',
        exampleEs: 'Una buena conexión de red es importante para el aprendizaje en línea.'
    },
    {
        id: 73, cat: 'technology', emoji: '💾',
        word: 'digital',
        phonetic: '/ˈdɪdʒɪtl/',
        translation: 'digital',
        example: 'Our school has <strong>digital</strong> guides available for every subject.',
        exampleEs: 'Nuestra escuela tiene guías digitales disponibles para cada asignatura.'
    },
    {
        id: 74, cat: 'technology', emoji: '⌨️',
        word: 'program',
        phonetic: '/ˈproʊɡræm/',
        translation: 'programa / software',
        example: 'Profe Nelson created a <strong>program</strong> to help us learn from home.',
        exampleEs: 'Profe Nelson creó un programa para ayudarnos a aprender desde casa.'
    },
    {
        id: 75, cat: 'technology', emoji: '📊',
        word: 'data',
        phonetic: '/ˈdeɪtə/',
        translation: 'datos',
        example: 'We collect <strong>data</strong> about our coffee harvest to improve each year.',
        exampleEs: 'Recolectamos datos sobre nuestra cosecha de café para mejorar cada año.'
    },
    {
        id: 76, cat: 'technology', emoji: '📱',
        word: 'application',
        phonetic: '/ˌæplɪˈkeɪʃn/',
        translation: 'aplicación',
        example: 'This dictionary is a free <strong>application</strong> for all students.',
        exampleEs: 'Este diccionario es una aplicación gratuita para todos los estudiantes.'
    },
    {
        id: 77, cat: 'technology', emoji: '🔋',
        word: 'battery',
        phonetic: '/ˈbætri/',
        translation: 'batería',
        example: 'Always charge your <strong>battery</strong> before using the digital guide.',
        exampleEs: 'Siempre carga tu batería antes de usar la guía digital.'
    },
    {
        id: 78, cat: 'technology', emoji: '📡',
        word: 'internet',
        phonetic: '/ˈɪntərnet/',
        translation: 'internet',
        example: 'Our guide works without <strong>internet</strong> so you can use it anywhere.',
        exampleEs: 'Nuestra guía funciona sin internet para que puedas usarla en cualquier lugar.'
    },
    {
        id: 79, cat: 'technology', emoji: '🖨️',
        word: 'printer',
        phonetic: '/ˈprɪntər/',
        translation: 'impresora',
        example: 'Use the <strong>printer</strong> to get a paper copy of the weekly guide.',
        exampleEs: 'Usa la impresora para obtener una copia en papel de la guía semanal.'
    },
    {
        id: 80, cat: 'technology', emoji: '🔒',
        word: 'password',
        phonetic: '/ˈpæswɜːrd/',
        translation: 'contraseña',
        example: 'Keep your <strong>password</strong> private and never share it with others.',
        exampleEs: 'Mantén tu contraseña privada y nunca la compartas con otros.'
    },

    // ── PALABRAS ADICIONALES (mixed) ──
    {
        id: 81, cat: 'rural', emoji: '🧺',
        word: 'basket',
        phonetic: '/ˈbɑːskɪt/',
        translation: 'canasto / cesta',
        example: 'We carry the coffee beans in a large <strong>basket</strong> on our backs.',
        exampleEs: 'Llevamos los granos de café en un canasto grande en la espalda.'
    },
    {
        id: 82, cat: 'rural', emoji: '🌄',
        word: 'sunrise',
        phonetic: '/ˈsʌnraɪz/',
        translation: 'amanecer',
        example: 'We wake up at <strong>sunrise</strong> to start work on the farm.',
        exampleEs: 'Nos levantamos al amanecer para empezar el trabajo en la finca.'
    },
    {
        id: 83, cat: 'school', emoji: '🎨',
        word: 'project',
        phonetic: '/ˈprɒdʒekt/',
        translation: 'proyecto',
        example: 'Our class <strong>project</strong> is to make a digital guide about Chichalá.',
        exampleEs: 'El proyecto de nuestra clase es hacer una guía digital sobre Chichalá.'
    },
    {
        id: 84, cat: 'family', emoji: '🎉',
        word: 'celebration',
        phonetic: '/ˌselɪˈbreɪʃn/',
        translation: 'celebración',
        example: 'The harvest <strong>celebration</strong> brings all families together in the village.',
        exampleEs: 'La celebración de la cosecha reúne a todas las familias en la vereda.'
    },
    {
        id: 85, cat: 'connectors', emoji: '⏩',
        word: 'next',
        phonetic: '/nekst/',
        translation: 'a continuación / luego',
        example: '<strong>Next</strong>, add the panela to the hot water and stir slowly.',
        exampleEs: 'A continuación, agrega la panela al agua caliente y revuelve despacio.'
    },
    {
        id: 86, cat: 'connectors', emoji: '⏸️',
        word: 'after that',
        phonetic: '/ˈɑːftər ðæt/',
        translation: 'después de eso',
        example: '<strong>After that</strong>, let the mixture cool before serving.',
        exampleEs: 'Después de eso, deja enfriar la mezcla antes de servir.'
    },
    {
        id: 87, cat: 'environment', emoji: '🦋',
        word: 'wildlife',
        phonetic: '/ˈwaɪldlaɪf/',
        translation: 'fauna silvestre',
        example: 'The <strong>wildlife</strong> in the mountains of Chichalá is rich and diverse.',
        exampleEs: 'La fauna silvestre en las montañas de Chichalá es rica y diversa.'
    },
    {
        id: 88, cat: 'environment', emoji: '🌺',
        word: 'nature',
        phonetic: '/ˈneɪtʃər/',
        translation: 'naturaleza',
        example: '<strong>Nature</strong> is our greatest treasure in the countryside.',
        exampleEs: 'La naturaleza es nuestro mayor tesoro en el campo.'
    },
    {
        id: 89, cat: 'entrepreneurship', emoji: '🏷️',
        word: 'price',
        phonetic: '/praɪs/',
        translation: 'precio',
        example: 'The <strong>price</strong> of coffee changes every year in the national market.',
        exampleEs: 'El precio del café cambia cada año en el mercado nacional.'
    },
    {
        id: 90, cat: 'entrepreneurship', emoji: '📣',
        word: 'advertise',
        phonetic: '/ˈædvərtaɪz/',
        translation: 'promocionar / publicitar',
        example: 'We <strong>advertise</strong> our panela with photos on social media.',
        exampleEs: 'Promocionamos nuestra panela con fotos en redes sociales.'
    },
    {
        id: 91, cat: 'technology', emoji: '📷',
        word: 'camera',
        phonetic: '/ˈkæmərə/',
        translation: 'cámara',
        example: 'We use a <strong>camera</strong> to take photos of our products and the village.',
        exampleEs: 'Usamos una cámara para tomar fotos de nuestros productos y la vereda.'
    },
    {
        id: 92, cat: 'technology', emoji: '🖥️',
        word: 'screen',
        phonetic: '/skriːn/',
        translation: 'pantalla',
        example: 'The teacher shows the guide on the <strong>screen</strong> for the whole class.',
        exampleEs: 'El docente muestra la guía en la pantalla para toda la clase.'
    },
    {
        id: 93, cat: 'school', emoji: '🗓️',
        word: 'schedule',
        phonetic: '/ˈskedʒuːl/',
        translation: 'horario',
        example: 'Check the <strong>schedule</strong> to know what subject you have each day.',
        exampleEs: 'Revisa el horario para saber qué materia tienes cada día.'
    },
    {
        id: 94, cat: 'family', emoji: '💬',
        word: 'tradition',
        phonetic: '/trəˈdɪʃn/',
        translation: 'tradición',
        example: 'Making panela is a <strong>tradition</strong> that has been in our family for generations.',
        exampleEs: 'Hacer panela es una tradición que ha estado en nuestra familia por generaciones.'
    },
    {
        id: 95, cat: 'rural', emoji: '⛏️',
        word: 'tool',
        phonetic: '/tuːl/',
        translation: 'herramienta',
        example: 'Every <strong>tool</strong> on the farm has a specific purpose and must be cared for.',
        exampleEs: 'Cada herramienta en la finca tiene un propósito específico y debe ser cuidada.'
    },
    {
        id: 96, cat: 'instructions', emoji: '🔁',
        word: 'repeat',
        phonetic: '/rɪˈpiːt/',
        translation: 'repetir',
        example: '<strong>Repeat</strong> the word aloud three times to remember it better.',
        exampleEs: 'Repite la palabra en voz alta tres veces para recordarla mejor.'
    },
    {
        id: 97, cat: 'connectors', emoji: '🆚',
        word: 'on the other hand',
        phonetic: '/ɒn ðə ˈʌðər hænd/',
        translation: 'por otro lado',
        example: 'City life is fast. <strong>On the other hand</strong>, life in Chichalá is peaceful.',
        exampleEs: 'La vida en la ciudad es rápida. Por otro lado, la vida en Chichalá es tranquila.'
    },
    {
        id: 98, cat: 'environment', emoji: '🌾',
        word: 'soil',
        phonetic: '/sɔɪl/',
        translation: 'suelo / tierra fértil',
        example: 'The rich <strong>soil</strong> of Chichalá is perfect for growing coffee.',
        exampleEs: 'El suelo fértil de Chichalá es perfecto para cultivar café.'
    },
    {
        id: 99, cat: 'entrepreneurship', emoji: '🤜',
        word: 'partnership',
        phonetic: '/ˈpɑːrtnərʃɪp/',
        translation: 'alianza / sociedad',
        example: 'Our families formed a <strong>partnership</strong> to sell coffee together.',
        exampleEs: 'Nuestras familias formaron una alianza para vender café juntos.'
    },
    {
        id: 100, cat: 'technology', emoji: '🔧',
        word: 'update',
        phonetic: '/ˈʌpdeɪt/',
        translation: 'actualizar',
        example: 'Profe Nelson will <strong>update</strong> this dictionary with new words every semester.',
        exampleEs: 'Profe Nelson actualizará este diccionario con palabras nuevas cada semestre.'
    }
];

/* ──────────────────────────────────────────
   2. CONFIGURACIÓN DE CATEGORÍAS
────────────────────────────────────────── */
const CAT_CONFIG = {
    rural:            { label: '🌿 Campo',          color: '#3DBE8C' },
    school:           { label: '🏫 Escuela',         color: '#1A9BAB' },
    family:           { label: '👨‍👩‍👧 Familia',       color: '#F4872B' },
    connectors:       { label: '🔗 Conectores',      color: '#7C3AED' },
    instructions:     { label: '📋 Instrucciones',   color: '#0891B2' },
    environment:      { label: '🌎 Ambiente',         color: '#059669' },
    entrepreneurship: { label: '💼 Emprendimiento',  color: '#D97706' },
    technology:       { label: '🤖 Tecnología',      color: '#6366F1' }
};

/* ──────────────────────────────────────────
   3. ESTADO GLOBAL
────────────────────────────────────────── */
let state = {
    search:      '',
    category:    'all',
    favOnly:     false,
    favorites:   JSON.parse(localStorage.getItem('chichalaDictFavs') || '[]'),
    modalIndex:  -1,
    filtered:    [...WORDS],
    speaking:    false
};

/* ──────────────────────────────────────────
   4. UTILIDADES
────────────────────────────────────────── */
function saveFavs() {
    localStorage.setItem('chichalaDictFavs', JSON.stringify(state.favorites));
    document.getElementById('stat-favs').textContent = state.favorites.length;
}

function isFav(id) {
    return state.favorites.includes(id);
}

function toggleFav(id) {
    if (isFav(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
        showToast('Quitada de favoritas', 'info');
    } else {
        state.favorites.push(id);
        showToast('⭐ ¡Agregada a favoritas!', 'fav');
    }
    saveFavs();
}

function showToast(msg, type = 'ok') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className   = `toast ${type} show`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2500);
}

/* ──────────────────────────────────────────
   5. SPEECH — AUDIO NATURAL
────────────────────────────────────────── */
function speak(word, btnEl) {
    if (!window.speechSynthesis) {
        showToast('⚠️ Tu navegador no soporta audio', 'info');
        return;
    }

    window.speechSynthesis.cancel();

    if (state.speaking) {
        state.speaking = false;
        document.querySelectorAll('.playing').forEach(b => b.classList.remove('playing'));
        return;
    }

    const utter        = new SpeechSynthesisUtterance(word);
    utter.lang         = 'en-US';
    utter.rate         = 0.82;
    utter.pitch        = 1.05;
    utter.volume       = 1;

    // Buscar la voz más natural disponible
    const voices = window.speechSynthesis.getVoices();
    const preferred = [
        'Google US English',
        'Microsoft Aria Online (Natural)',
        'Microsoft Jenny Online (Natural)',
        'Samantha',
        'Karen',
        'Daniel'
    ];

    const chosen = preferred.reduce((found, name) => {
        return found || voices.find(v => v.name.includes(name));
    }, null);

    if (chosen) utter.voice = chosen;

    state.speaking = true;
    if (btnEl) btnEl.classList.add('playing');

    utter.onend = () => {
        state.speaking = false;
        if (btnEl) btnEl.classList.remove('playing');
    };

    utter.onerror = () => {
        state.speaking = false;
        if (btnEl) btnEl.classList.remove('playing');
    };

    window.speechSynthesis.speak(utter);
}

// Cargar voces cuando estén disponibles
if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

/* ──────────────────────────────────────────
   6. FILTRADO
────────────────────────────────────────── */
function applyFilters() {
    let result = [...WORDS];

    // Filtro por categoría
    if (state.category !== 'all') {
        result = result.filter(w => w.cat === state.category);
    }

    // Filtro por búsqueda
    if (state.search.trim()) {
        const q = state.search.trim().toLowerCase();
        result  = result.filter(w =>
            w.word.toLowerCase().includes(q)        ||
            w.translation.toLowerCase().includes(q) ||
            w.phonetic.toLowerCase().includes(q)
        );
    }

    // Filtro solo favoritas
    if (state.favOnly) {
        result = result.filter(w => isFav(w.id));
    }

    state.filtered = result;
    renderGrid();
    updateResultsInfo();
}

/* ──────────────────────────────────────────
   7. RENDER — GRID DE TARJETAS
────────────────────────────────────────── */
function renderGrid() {
    const grid  = document.getElementById('words-grid');
    const empty = document.getElementById('empty-state');

    if (state.filtered.length === 0) {
        grid.innerHTML  = '';
        empty.style.display = 'block';
        return;
    }

    empty.style.display = 'none';
    const color = (cat) => CAT_CONFIG[cat]?.color || '#1A9BAB';

    grid.innerHTML = state.filtered.map((w, idx) => `
        <div class="word-card${isFav(w.id) ? ' is-fav' : ''}"
             style="--card-color:${color(w.cat)};
                    animation-delay:${Math.min(idx * 0.03, 0.5)}s"
             data-id="${w.id}">

            <span class="card-emoji">${w.emoji}</span>

            <span class="card-cat"
                  style="background:${color(w.cat)}">
                ${CAT_CONFIG[w.cat]?.label || w.cat}
            </span>

            <div class="card-word">${w.word}</div>
            <div class="card-phonetic">${w.phonetic}</div>
            <div class="card-translation">${w.translation}</div>

            <div class="card-actions">
                <button class="card-btn card-btn--speak"
                        onclick="event.stopPropagation();
                                 speak('${w.word}', this)"
                        title="Escuchar pronunciación">
                    🔊 Escuchar
                </button>
                <button class="card-btn card-btn--fav${isFav(w.id) ? ' active' : ''}"
                        onclick="event.stopPropagation();
                                 toggleFav(${w.id});
                                 applyFilters()"
                        title="${isFav(w.id) ? 'Quitar de favoritas' : 'Agregar a favoritas'}">
                    ${isFav(w.id) ? '⭐' : '☆'}
                </button>
                <button class="card-btn card-btn--detail"
                        onclick="openModal(${w.id})"
                        title="Ver detalle">
                    👁
                </button>
            </div>
        </div>
    `).join('');
}

function updateResultsInfo() {
    document.getElementById('results-count').textContent = state.filtered.length;
}

/* ──────────────────────────────────────────
   8. MODAL
────────────────────────────────────────── */
function openModal(id) {
    const idx  = state.filtered.findIndex(w => w.id === id);
    if (idx === -1) return;
    state.modalIndex = idx;
    renderModal();
    document.getElementById('word-modal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('word-modal').classList.remove('open');
    document.body.style.overflow = '';
    window.speechSynthesis?.cancel();
    state.speaking = false;
}

function renderModal() {
    const w     = state.filtered[state.modalIndex];
    if (!w) return;
    const color = CAT_CONFIG[w.cat]?.color || '#1A9BAB';

    document.getElementById('modal-emoji').textContent       = w.emoji;
    document.getElementById('modal-word').textContent        = w.word;
    document.getElementById('modal-phonetic').textContent    = w.phonetic;
    document.getElementById('modal-translation').textContent = `🇪🇸 ${w.translation}`;

    const catTag = document.getElementById('modal-cat-tag');
    catTag.textContent       = CAT_CONFIG[w.cat]?.label || w.cat;
    catTag.style.background  = color;

    document.getElementById('modal-example').innerHTML = `
        <div style="margin-bottom:6px">
            🇬🇧 <em>${w.example}</em>
        </div>
        <div style="color:#718096; font-size:0.85rem">
            🇨🇴 ${w.exampleEs}
        </div>
    `;

    // Botón favorito
    const favBtn = document.getElementById('modal-fav');
    favBtn.textContent = isFav(w.id)
        ? '⭐ Quitar de favoritas'
        : '☆ Agregar a favoritas';
    favBtn.className = `modal-btn modal-btn--fav${isFav(w.id) ? ' active' : ''}`;

    // Botón speak
    const speakBtn = document.getElementById('modal-speak');
    speakBtn.className = 'modal-btn modal-btn--speak';
    speakBtn.textContent = '🔊 Escuchar pronunciación';

    // Navegación
    document.getElementById('modal-prev').disabled =
        state.modalIndex === 0;
    document.getElementById('modal-next').disabled =
        state.modalIndex === state.filtered.length - 1;
}

/* ──────────────────────────────────────────
   9. PARTÍCULAS DE FONDO
────────────────────────────────────────── */
function initParticles() {
    const container = document.getElementById('particles');
    const colors    = ['#3DBE8C','#1A9BAB','#7C3AED','#F4872B','#F7C325'];
    const count     = window.innerWidth < 768 ? 12 : 22;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size  = Math.random() * 80 + 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 18 + 12}s;
            animation-delay: ${Math.random() * 10}s;
        `;
        container.appendChild(p);
    }
}

/* ──────────────────────────────────────────
   10. EVENT LISTENERS
────────────────────────────────────────── */
function initEvents() {

    // Búsqueda
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', () => {
        state.search = searchInput.value;
        searchClear.classList.toggle('visible', state.search.length > 0);
        applyFilters();
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        state.search      = '';
        searchClear.classList.remove('visible');
        searchInput.focus();
        applyFilters();
    });

    // Categorías
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn')
                    .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.category = btn.dataset.cat;
            applyFilters();
        });
    });

    // Solo favoritas
    const btnFavs = document.getElementById('btn-favs');
    btnFavs.addEventListener('click', () => {
        state.favOnly = !state.favOnly;
        btnFavs.classList.toggle('active', state.favOnly);
        applyFilters();
    });

    // Modal — cerrar
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('modal-overlay').addEventListener('click', closeModal);

    // Modal — speak
    document.getElementById('modal-speak').addEventListener('click', function() {
        const w = state.filtered[state.modalIndex];
        if (w) speak(w.word, this);
    });

    // Modal — favorito
    document.getElementById('modal-fav').addEventListener('click', () => {
        const w = state.filtered[state.modalIndex];
        if (!w) return;
        toggleFav(w.id);
        renderModal();
        // Actualizar tarjeta en el grid
        applyFilters();
    });

    // Modal — navegación
    document.getElementById('modal-prev').addEventListener('click', () => {
        if (state.modalIndex > 0) {
            state.modalIndex--;
            window.speechSynthesis?.cancel();
            state.speaking = false;
            renderModal();
        }
    });

    document.getElementById('modal-next').addEventListener('click', () => {
        if (state.modalIndex < state.filtered.length - 1) {
            state.modalIndex++;
            window.speechSynthesis?.cancel();
            state.speaking = false;
            renderModal();
        }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('word-modal');
        if (!modal.classList.contains('open')) return;

        if (e.key === 'Escape')      closeModal();
        if (e.key === 'ArrowLeft')   document.getElementById('modal-prev').click();
        if (e.key === 'ArrowRight')  document.getElementById('modal-next').click();
    });
}

/* ──────────────────────────────────────────
   11. INIT
────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initEvents();
    applyFilters();
    document.getElementById('stat-favs').textContent = state.favorites.length;
    showToast('📖 ¡Bienvenido al Diccionario de Chichalá!', 'ok');
});