import api from './api';

/**
 * Service pour gérer les utilisateurs avec l'API réelle
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

  /**
   * Authentifier un utilisateur avec l'API réelle
   */
  authenticateUser: async (email, password) => {
  try {
    const users = await usersService.getAllUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (!user) throw new Error('Email ou mot de passe incorrect');
    
    // On vérifie que user.name existe avant d'y accéder
    const fName = user.name?.firstname || 'Utilisateur';
    const lName = user.name?.lastname || '';

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: `${fName} ${lName}`,
      firstName: fName,
      lastName: lName,
      isAuthenticated: true
    };
  } catch (error) {
    throw error;
  }
},

  /**
   * Créer un nouvel utilisateur avec validation
   */
  /**
 * Créer un nouvel utilisateur avec validation
 */
registerUser: async (userData) => {
  try {
    // 1. Validation de base
    if (!userData.email || !userData.username || !userData.password) {
      throw new Error('Tous les champs obligatoires doivent être remplis');
    }

    // 2. Vérifier si l'utilisateur existe déjà (Simulation locale car l'API est une démo)
    const users = await usersService.getAllUsers();
    const existingUser = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) throw new Error('Cet email est déjà utilisé');

    // 3. Préparation des données pour l'API FakeStore
    const formattedUserData = {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      name: {
        firstname: userData.firstName || 'Robert',
        lastname: userData.lastName || 'Kule'
      },
      address: {
        city: userData.city || 'Kinshasa',
        street: userData.street || 'Avenue',
        number: 1,
        zipcode: userData.zipcode || '0000',
        geolocation: { lat: '0', long: '0' }
      },
      phone: userData.phone || '000-000-000'
    };

    // 4. Appel API
    const response = await usersService.addUser(formattedUserData);
    
    // 5. CONSTRUCTION SÉCURISÉE (On utilise userData pour être sûr d'avoir les noms)
    // FakeStoreAPI renvoie souvent juste l'ID ou l'objet envoyé sans garantie de structure
    return {
      id: response.id || Math.floor(Math.random() * 1000),
      email: userData.email,
      username: userData.username,
      name: `${userData.firstName} ${userData.lastName}`, // On utilise les variables locales
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: {
        city: userData.city,
        street: userData.street
      },
      isAuthenticated: true,
      joinedDate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
},

/**
 * Authentifier un utilisateur
 */


  /**
   * Vérifier si l'utilisateur est connecté
   */
  checkAuthStatus: () => {
    try {
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (!userData) return null;
      
      return JSON.parse(userData);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error);
      return null;
    }
  },

  /**
   * Déconnecter l'utilisateur
   */
  logoutUser: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_session');
    sessionStorage.removeItem('user');
    return true;
  }
};