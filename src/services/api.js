import axios from 'axios';

// Configuration de base d'Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteurs pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajouter un token d'authentification si disponible
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log en mode développement
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteurs pour les réponses
api.interceptors.response.use(
  (response) => {
    // Log en mode développement
    if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Gestion centralisée des erreurs
    console.error('[API Error]', error.response || error.message);
    
    // Gestion des erreurs spécifiques
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Rediriger vers login
          window.location.href = '/login';
          break;
        case 403:
          console.error('Accès interdit');
          break;
        case 404:
          console.error('Ressource non trouvée');
          break;
        case 500:
          console.error('Erreur serveur');
          break;
        default:
          console.error(`Erreur ${error.response.status}`);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;