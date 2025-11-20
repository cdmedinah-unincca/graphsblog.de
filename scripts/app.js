// DATOS EMBEBIDOS
const postsData = {
    "posts": [
        {
            "id": 1,
            "title": "Introducción a los Grafos: Nodos, Aristas y Tipos",
            "slug": "introduccion-grafos",
            "date": "2025-11-05",
            "excerpt": "Descubre los conceptos fundamentales de los grafos, sus componentes básicos y los diferentes tipos que existen en ciencia de la computación.",
            "tags": ["grafos", "fundamentos", "estructuras-datos"],
            "content": [
                {
                    "type": "paragraph",
                    "content": "Un grafo es una estructura de datos no lineal que consiste en un conjunto de objetos llamados vértices o nodos, conectados por enlaces llamados aristas o ejes. Los grafos son fundamentales en ciencias de la computación y tienen aplicaciones en redes sociales, sistemas de navegación, bases de datos y más."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Conceptos Clave"
                },
                {
                    "type": "list",
                    "items": [
                        "Vértices o Nodos: Elementos fundamentales del grafo",
                        "Aristas o Ejes: Conexiones entre los vértices",
                        "Grado: Número de aristas incidentes a un vértice",
                        "Camino: Secuencia de vértices conectados por aristas",
                        "Ciclo: Camino que comienza y termina en el mismo vértice"
                    ]
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Tipos de Grafos"
                },
                {
                    "type": "subheading",
                    "content": "Grafos Dirigidos (Digrafos)"
                },
                {
                    "type": "paragraph",
                    "content": "Las aristas tienen dirección, representando relaciones unidireccionales. Cada arista tiene un vértice de origen y un vértice de destino. Ejemplo: Seguidores en Twitter, donde A sigue a B no implica que B siga a A."
                },
                {
                    "type": "subheading",
                    "content": "Grafos No Dirigidos"
                },
                {
                    "type": "paragraph",
                    "content": "Las aristas no tienen dirección, representando relaciones bidireccionales. Si A está conectado con B, entonces B está conectado con A. Ejemplo: Amistades en Facebook, calles en un mapa."
                },
                {
                    "type": "diagram",
                    "src": "assets/images/grafo-no-dirigido.svg",
                    "alt": "Grafo no dirigido con 5 nodos",
                    "caption": "Figura 1: Grafo no dirigido con 5 vértices (A, B, C, D, E) y 6 aristas"
                }
            ]
        },
        {
            "id": 2,
            "title": "Representación de Grafos en Memoria",
            "slug": "representacion-grafos",
            "date": "2024-11-12",
            "excerpt": "Explora las dos principales formas de representar grafos en la memoria de una computadora: Lista de Adyacencia y Matriz de Adyacencia.",
            "tags": ["representacion", "eficiencia", "algoritmos", "memoria"],
            "content": [
                {
                    "type": "paragraph",
                    "content": "La representación eficiente de grafos en memoria es crucial para el rendimiento de los algoritmos. La elección entre diferentes representaciones depende del tipo de grafo y las operaciones que necesitamos realizar frecuentemente."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Lista de Adyacencia"
                },
                {
                    "type": "paragraph",
                    "content": "Consiste en un arreglo de listas, donde cada posición del arreglo representa un vértice y contiene una lista de todos los vértices adyacentes a él. Esta representación es eficiente en espacio para grafos dispersos (pocas aristas comparado con el máximo posible)."
                },
                {
                    "type": "code",
                    "language": "javascript",
                    "content": "// Ejemplo de Lista de Adyacencia en JavaScript\nconst grafo = {\n    'A': ['B', 'C'],\n    'B': ['A', 'D', 'E'],\n    'C': ['A', 'F'],\n    'D': ['B'],\n    'E': ['B', 'F'],\n    'F': ['C', 'E']\n};"
                },
                {
                    "type": "diagram",
                    "src": "assets/images/lista-adyacencia.svg",
                    "alt": "Representación de lista de adyacencia",
                    "caption": "Figura 2: Lista de adyacencia para un grafo no dirigido de 6 vértices"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Matriz de Adyacencia"
                },
                {
                    "type": "paragraph",
                    "content": "Es una matriz cuadrada de tamaño V×V (donde V es el número de vértices), donde cada celda [i][j] indica si existe una arista entre el vértice i y el vértice j. Para grafos no dirigidos, la matriz es simétrica."
                },
                {
                    "type": "code",
                    "language": "javascript",
                    "content": "// Ejemplo de Matriz de Adyacencia\nconst matriz = [\n    [0, 1, 1, 0, 0, 0],\n    [1, 0, 0, 1, 1, 0],\n    [1, 0, 0, 0, 0, 1],\n    [0, 1, 0, 0, 0, 0],\n    [0, 1, 0, 0, 0, 1],\n    [0, 0, 1, 0, 1, 0]\n];"
                },
                {
                    "type": "diagram",
                    "src": "assets/images/matriz-adyacencia.svg",
                    "alt": "Representación de matriz de adyacencia",
                    "caption": "Figura 3: Matriz de adyacencia para el mismo grafo de 6 vértices"
                }
            ]
        },
        {
            "id": 3,
            "title": "Algoritmos Fundamentales de Recorrido: BFS y DFS",
            "slug": "algoritmos-recorrido",
            "date": "2025-11-19",
            "excerpt": "Aprende sobre los dos algoritmos esenciales para recorrer grafos: Búsqueda en Amplitud (BFS) y Búsqueda en Profundidad (DFS).",
            "tags": ["algoritmos", "bfs", "dfs", "recorrido", "grafos"],
            "content": [
                {
                    "type": "paragraph",
                    "content": "Los algoritmos de recorrido son fundamentales para explorar grafos y resolver problemas como encontrar caminos, componentes conectados, verificar conectividad, y más. BFS y DFS son los pilares de muchos algoritmos más complejos en teoría de grafos."
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Búsqueda en Amplitud (BFS) - Breadth-First Search"
                },
                {
                    "type": "paragraph",
                    "content": "BFS explora el grafo nivel por nivel, visitando primero todos los vecinos directos antes de moverse a los vecinos de los vecinos. Utiliza una cola (estructura FIFO - First In First Out) para gestionar los nodos por visitar."
                },
                {
                    "type": "code",
                    "language": "javascript",
                    "content": "function BFS(grafo, inicio) {\n    const visitados = new Set();\n    const cola = [inicio];\n    visitados.add(inicio);\n    \n    while (cola.length > 0) {\n        const nodo = cola.shift();\n        console.log(nodo);\n        \n        for (const vecino of grafo[nodo]) {\n            if (!visitados.has(vecino)) {\n                visitados.add(vecino);\n                cola.push(vecino);\n            }\n        }\n    }\n}"
                },
                {
                    "type": "diagram",
                    "src": "assets/images/bfs-animation.svg",
                    "alt": "Animación del algoritmo BFS",
                    "caption": "Figura 4: Recorrido BFS nivel por nivel"
                },
                {
                    "type": "heading",
                    "level": 2,
                    "content": "Búsqueda en Profundidad (DFS) - Depth-First Search"
                },
                {
                    "type": "paragraph",
                    "content": "DFS explora tan lejos como sea posible a lo largo de cada rama antes de retroceder (backtracking). Puede implementarse con recursión o de forma iterativa usando una pila explícita."
                },
                {
                    "type": "code",
                    "language": "javascript",
                    "content": "// DFS Recursivo\nfunction DFS(grafo, nodo, visitados = new Set()) {\n    if (visitados.has(nodo)) return;\n    \n    visitados.add(nodo);\n    console.log(nodo);\n    \n    for (const vecino of grafo[nodo]) {\n        DFS(grafo, vecino, visitados);\n    }\n}"
                },
                {
                    "type": "diagram",
                    "src": "assets/images/dfs-animation.svg",
                    "alt": "Animación del algoritmo DFS",
                    "caption": "Figura 5: Recorrido DFS profundizando primero"
                }
            ]
        }
    ]
};

// Aplicación principal
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Iniciando blog técnico...');

    try {
        // Inicializar motor del blog
        blogEngine = new BlogEngine(postsData);

        // Inicializar sistema de búsqueda
        const blogSearch = new BlogSearch(postsData.posts);

        // Procesar parámetros de URL
        blogSearch.searchFromUrlParams();

        console.log('✅ Blog cargado correctamente con', postsData.posts.length, 'posts');

    } catch (error) {
        console.error('❌ Error crítico:', error);
        document.getElementById('postsGrid').innerHTML = `
            <div class="error-message">
                <h3>Error al cargar el blog</h3>
                <p>${error.message}</p>
                <button onclick="location.reload()">Recargar página</button>
            </div>
        `;
    }
});