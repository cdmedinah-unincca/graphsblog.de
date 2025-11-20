// Utilidades generales para el blog
class BlogUtils {
    // Formatear fecha
    static formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Sanitizar HTML para prevenir XSS
    static sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Debounce para búsqueda
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Obtener parámetros URL
    static getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    }

    // Actualizar URL sin recargar
    static updateUrl(params) {
        const newUrl = new URL(window.location);
        Object.keys(params).forEach(key => {
            if (params[key]) {
                newUrl.searchParams.set(key, params[key]);
            } else {
                newUrl.searchParams.delete(key);
            }
        });
        window.history.pushState({}, '', newUrl);
    }
}

// Gestión del estado de la aplicación
class AppState {
    constructor() {
        this.currentView = 'list'; // 'list' o 'detail'
        this.currentPost = null;
        this.searchQuery = '';
    }

    setView(view, post = null) {
        this.currentView = view;
        this.currentPost = post;
        this.notifyObservers();
    }

    setSearchQuery(query) {
        this.searchQuery = query;
        this.notifyObservers();
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer(this));
    }
}