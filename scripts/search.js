// Sistema de búsqueda para el blog
class BlogSearch {
    constructor(posts) {
        this.posts = posts;
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.resultsInfo = document.getElementById('resultsInfo');

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Búsqueda al hacer click
        this.searchBtn.addEventListener('click', () => {
            this.performSearch();
        });

        // Búsqueda al presionar Enter
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });

        // Búsqueda en tiempo real con debounce
        this.searchInput.addEventListener('input',
            BlogUtils.debounce(() => {
                if (this.searchInput.value.length >= 3 || this.searchInput.value.length === 0) {
                    this.performSearch();
                }
            }, 300)
        );
    }

    performSearch() {
        const query = this.searchInput.value.trim().toLowerCase();

        if (query === '') {
            this.clearSearch();
            return;
        }

        const results = this.searchPosts(query);
        this.displayResults(results, query);
    }

    searchPosts(query) {
        return this.posts.filter(post => {
            // Búsqueda en título
            if (post.title.toLowerCase().includes(query)) return true;

            // Búsqueda en excerpt
            if (post.excerpt.toLowerCase().includes(query)) return true;

            // Búsqueda en tags
            if (post.tags.some(tag => tag.toLowerCase().includes(query))) return true;

            // Búsqueda en contenido
            return post.content.some(item =>
                (item.type === 'paragraph' || item.type === 'heading' || item.type === 'subheading') &&
                item.content.toLowerCase().includes(query)
            );
        });
    }

    displayResults(results, query) {
        // Actualizar información de resultados
        if (results.length > 0) {
            this.resultsInfo.innerHTML = `
                <p>Se encontraron ${results.length} artículo(s) para: "<strong>${BlogUtils.sanitizeHTML(query)}</strong>"</p>
            `;
        } else {
            this.resultsInfo.innerHTML = `
                <p>No se encontraron resultados para: "<strong>${BlogUtils.sanitizeHTML(query)}</strong>"</p>
            `;
        }

        // Renderizar resultados
        blogEngine.renderPostsList(results);

        // Actualizar URL
        BlogUtils.updateUrl({ search: query });
    }

    clearSearch() {
        this.searchInput.value = '';
        this.resultsInfo.innerHTML = '';
        blogEngine.renderPostsList();
        BlogUtils.updateUrl({});
    }

    // Búsqueda inicial desde parámetros URL
    searchFromUrlParams() {
        const params = BlogUtils.getUrlParams();
        if (params.search) {
            this.searchInput.value = params.search;
            this.performSearch();
        }

        if (params.post) {
            const post = this.posts.find(p => p.slug === params.post);
            if (post) {
                blogEngine.showPost(post.id);
            }
        }
    }
}