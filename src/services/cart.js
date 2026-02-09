import api from './api';

/**
 * Service pour gérer le panier
 */
export const cartService = {
  /**
   * Récupérer tous les paniers
   */
  getAllCarts: async () => {
    try {
      const response = await api.get('/carts');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des paniers:', error);
      throw error;
    }
  },

  /**
   * Récupérer un panier par ID
   */
  getCartById: async (id) => {
    try {
      const response = await api.get(`/carts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du panier ${id}:`, error);
      throw error;
    }
  },

  /**
   * Créer un nouveau panier
   */
  createCart: async (cartData) => {
    try {
      const response = await api.post('/carts', cartData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du panier:', error);
      throw error;
    }
  },

  /**
   * Mettre à jour un panier
   */
  updateCart: async (id, cartData) => {
    try {
      const response = await api.put(`/carts/${id}`, cartData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du panier ${id}:`, error);
      throw error;
    }
  },

  /**
   * Supprimer un panier
   */
  deleteCart: async (id) => {
    try {
      const response = await api.delete(`/carts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du panier ${id}:`, error);
      throw error;
    }
  },

  /**
   * Récupérer le panier d'un utilisateur
   */
  getUserCart: async (userId) => {
    try {
      const response = await api.get(`/carts/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du panier utilisateur ${userId}:`, error);
      throw error;
    }
  },
};