# 📚 Documentation API - Amazon Clone

## FakeStoreAPI Endpoints

### Produits
- `GET /products` - Tous les produits
- `GET /products/{id}` - Produit par ID
- `GET /products/categories` - Toutes les catégories
- `GET /products/category/{category}` - Produits par catégorie
- `GET /products?limit={number}` - Produits limités
- `GET /products?sort={asc|desc}` - Produits triés

### Panier
- `GET /carts` - Tous les paniers
- `GET /carts/{id}` - Panier par ID
- `GET /carts/user/{userId}` - Panier utilisateur
- `POST /carts` - Créer un panier
- `PUT /carts/{id}` - Mettre à jour un panier
- `DELETE /carts/{id}` - Supprimer un panier

### Authentification
- `POST /auth/login` - Connexion
  ```json
  {
    "username": "johnd",
    "password": "m38rmF$"
  }

### Utilisateurs
* GET /users - Tous les utilisateurs
* GET /users/{id} - Utilisateur par ID
* POST /users - Ajouter un utilisateur
* PUT /users/{id} - Mettre à jour un utilisateur
* DELETE /users/{id} - Supprimer un utilisateur
### Services Implémentés
* productsService
* getAllProducts() - Tous les produits
* getProductById(id) - Produit par ID
* getCategories() - Catégories
* getProductsByCategory(category) - Produits par catégorie
* searchProducts(query) - Recherche produits
* getLimitedProducts(limit) - Produits limités
* getSortedProducts(sort) - Produits triés

### cartService
* getAllCarts() - Tous les paniers
* getCartById(id) - Panier par ID
* createCart(cartData) - Créer panier
* updateCart(id, cartData) - Mettre à jour panier
* deleteCart(id) - Supprimer panier
* getUserCart(userId) - Panier utilisateur

### authService
* login(credentials) - Connexion
* logout() - Déconnexion
* isAuthenticated() - Vérifier authentification
* getCurrentUser() - Utilisateur courant
* getToken() - Récupérer token

### usersService
* getAllUsers() - Tous les utilisateurs
* getUserById(id) - Utilisateur par ID
* addUser(userData) - Ajouter utilisateur
* updateUser(id, userData) - Mettre à jour utilisateur
* deleteUser(id) - Supprimer utilisateur


## ✅ Critères d'Acceptation

- [ ] Fichiers d'environnement créés (`.env.example`, `.env.local`, `.env.production`)
- [ ] Service API principal avec Axios configuré (`api.js`)
- [ ] Services spécifiques implémentés (produits, panier, auth, users)
- [ ] Fichier d'export central créé (`index.js`)
- [ ] Utilitaires API ajoutés (`apiHelpers.js`)
- [ ] Documentation API créée (`API_DOCUMENTATION.md`)
- [ ] Variables d'environnement accessibles via `import.meta.env`
- [ ] Gestion des erreurs centralisée dans les intercepteurs
- [ ] Token d'authentification géré automatiquement
- [ ] Logs en mode développement seulement

## 🔧 Tests à Effectuer

```bash
# 1. Vérifier que les variables d'environnement sont accessibles
npm run dev
# Vérifier dans la console que VITE_API_BASE_URL est bien défini

# 2. Tester les services
# Créer un fichier de test temporaire
touch src/test-api.js

# Ajouter ce code
import { productsService } from './services/products';

const testApi = async () => {
  try {
    console.log('Test de l\'API...');
    
    // Test produits
    const products = await productsService.getAllProducts();
    console.log('✅ Produits récupérés:', products.length);
    
    // Test catégories
    const categories = await productsService.getCategories();
    console.log('✅ Catégories récupérées:', categories);
    
    // Test produit spécifique
    const product = await productsService.getProductById(1);
    console.log('✅ Produit 1 récupéré:', product.title);
    
    console.log('🎉 Tous les tests API passent !');
  } catch (error) {
    console.error('❌ Erreur lors du test API:', error);
  }
};

testApi();