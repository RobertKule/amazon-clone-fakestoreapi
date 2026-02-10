/**
 * Page du panier d'achat
 */
const Cart = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        🛒 Votre Panier
      </h1>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="text-yellow-600 text-3xl">🛒</div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-800">Votre panier est vide</h3>
            <p className="text-yellow-700">Ajoutez des produits pour commencer vos achats</p>
          </div>
        </div>
        <button className="mt-6 bg-amazon-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Voir les produits
        </button>
      </div>
    </div>
  );
};

export default Cart;