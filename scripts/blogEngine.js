// Motor principal del blog - Maneja la renderización de contenido
class BlogEngine {
    constructor(postsData) {
        this.posts = postsData.posts;
        this.postsGrid = document.getElementById('postsGrid');
        this.postFull = document.getElementById('postFull');
        this.postDetail = document.getElementById('postDetail');
        this.postsSection = document.getElementById('posts');

        this.init();
    }

    init() {
        this.renderPostsList();
        this.setupEventListeners();
    }

    // Renderizar lista de posts
    renderPostsList(postsToRender = null) {
        const posts = postsToRender || this.posts;

        if (posts.length === 0) {
            this.postsGrid.innerHTML = `
                <div class="no-results">
                    <h3>No se encontraron artículos</h3>
                    <p>Intenta con otros términos de búsqueda</p>
                </div>
            `;
            return;
        }

        this.postsGrid.innerHTML = posts.map(post => `
            <article class="post-card fade-in" data-post-id="${post.id}">
                <h3>${BlogUtils.sanitizeHTML(post.title)}</h3>
                <div class="post-meta">
                    <span>${BlogUtils.formatDate(post.date)}</span>
                    <span> • </span>
                    <span>${post.tags.map(tag => `#${tag}`).join(' ')}</span>
                </div>
                <p class="post-excerpt">${BlogUtils.sanitizeHTML(post.excerpt)}</p>
                <button class="read-more" onclick="blogEngine.showPost(${post.id})">
                    Leer más →
                </button>
            </article>
        `).join('');
    }

    // Mostrar post completo
    showPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.currentPost = post;

        // Ocultar lista, mostrar detalle
        this.postsSection.style.display = 'none';
        this.postDetail.style.display = 'block';

        // Renderizar contenido del post
        this.renderPostContent(post);

        // Actualizar URL
        BlogUtils.updateUrl({ post: post.slug });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Renderizar contenido completo del post
    renderPostContent(post) {
        const contentHTML = post.content.map(item => {
            switch (item.type) {
                case 'paragraph':
                    return `<p>${BlogUtils.sanitizeHTML(item.content)}</p>`;

                case 'heading':
                    return `<h${item.level}>${BlogUtils.sanitizeHTML(item.content)}</h${item.level}>`;

                case 'subheading':
                    return `<h3>${BlogUtils.sanitizeHTML(item.content)}</h3>`;

                case 'list':
                    return `
                        <ul>
                            ${item.items.map(listItem =>
                        `<li>${BlogUtils.sanitizeHTML(listItem)}</li>`
                    ).join('')}
                        </ul>
                    `;

                case 'code':
                    return `
                        <div class="code-block">
                            <pre><code class="language-${item.language}">${BlogUtils.sanitizeHTML(item.content)}</code></pre>
                        </div>
                    `;

                case 'diagram':
                    return `
                        <div class="diagram-container">
                            <img src="${item.src}" alt="${item.alt}" loading="lazy">
                            <p class="diagram-caption">${BlogUtils.sanitizeHTML(item.caption)}</p>
                        </div>
                    `;

                default:
                    return '';
            }
        }).join('');

        this.postFull.innerHTML = `
            <header class="post-header">
                <h1>${BlogUtils.sanitizeHTML(post.title)}</h1>
                <div class="post-meta">
                    <span>Publicado el ${BlogUtils.formatDate(post.date)}</span>
                    <span> • </span>
                    <span>${post.tags.map(tag =>
            `<span class="tag">#${tag}</span>`
        ).join(' ')}</span>
                </div>
            </header>
            <div class="post-content">
                ${contentHTML}
            </div>
        `;
    }

    // Volver a la lista de posts
    showPostsList() {
        this.postDetail.style.display = 'none';
        this.postsSection.style.display = 'block';
        BlogUtils.updateUrl({});
    }

    // Configurar event listeners
    setupEventListeners() {
        // Botón volver
        document.getElementById('backBtn').addEventListener('click', () => {
            this.showPostsList();
        });

        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentPost) {
                this.showPostsList();
            }
        });
    }
}

// Instancia global del blog engine
let blogEngine;