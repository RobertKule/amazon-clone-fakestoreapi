import api from './api';

/**
 * Service pour gérer les utilisateurs
 */
export const usersService = {
  /**
   * Récupérer tous les utilisateurs
   */
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  /**
   * Récupérer un utilisateur par ID
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Ajouter un nouvel utilisateur
   */
  addUser: async (userData) => {
    try {
      const response = await api.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      throw error;
    }
  },

  /**
   * Mettre à jour un utilisateur
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la mise à jour de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  },

  /**
   * Supprimer un utilisateur
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'utilisateur ${id}:`,
        error
      );
      throw error;
    }
  },
};
