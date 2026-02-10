import api from './api';

/**
 * Service pour gérer l'authentification
 */
export const authService = {
  /**
   * Se connecter
   */
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);

      if (response.data.token) {
        // Stocker le token
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);

      // Fournir un message d'erreur plus clair
      if (error.response?.status === 401) {
        throw new Error('Identifiants incorrects');
      }

      throw error;
    }
  },

  /**
   * Se déconnecter
   */
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  /**
   * Récupérer l'utilisateur courant
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Récupérer le token
   */
  getToken: () => {
    return localStorage.getItem('authToken');
  },
};
