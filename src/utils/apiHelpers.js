/**
 * Gestionnaire de cache simple pour les requêtes API
 */
export class ApiCache {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes
  }

  set(key, data, ttl = this.defaultTTL) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

/**
 * Formater les données de l'API
 */
export const formatProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  description: product.description,
  category: product.category,
  image: product.image,
  rating: product.rating || { rate: 0, count: 0 },
});

/**
 * Simuler un délai (pour le développement)
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Gérer les erreurs d'API
 */
export const handleApiError = (error, context = 'API') => {
  console.error(`[${context} Error]:`, error);

  if (error.response) {
    return {
      error: true,
      status: error.response.status,
      message:
        error.response.data?.message || `Erreur ${error.response.status}`,
      data: error.response.data,
    };
  }

  if (error.request) {
    return {
      error: true,
      message: 'Pas de réponse du serveur. Vérifiez votre connexion.',
    };
  }

  return {
    error: true,
    message: error.message || 'Une erreur est survenue',
  };
};
