import api from './api';

/**
 * Service pour gérer les produits
 */
export const productsService = {
  /**
   * Récupérer tous les produits
   */
  getAllProducts: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw error;
    }
  },

  /**
   * Récupérer un produit par son ID
   */
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du produit ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer les catégories de produits
   */
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
      throw error;
    }
  },

  /**
   * Récupérer les produits par catégorie
   */
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des produits de la catégorie ${category}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Rechercher des produits
   */
  searchProducts: async (query) => {
    try {
      const allProducts = await this.getAllProducts();
      return allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Erreur lors de la recherche de produits:', error);
      throw error;
    }
  },

  /**
   * Récupérer les produits limités
   */
  getLimitedProducts: async (limit = 5) => {
    try {
      const response = await api.get(`/products?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de ${limit} produits:`,
        error
      );
      throw error;
    }
  },

  /**
   * Trier les produits
   */
  getSortedProducts: async (sort = 'asc') => {
    try {
      const response = await api.get(`/products?sort=${sort}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors du tri des produits (${sort}):`, error);
      throw error;
    }
  },
};
