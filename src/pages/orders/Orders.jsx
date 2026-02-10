/**
 * Page des commandes
 */
const Orders = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        📦 Vos Commandes
      </h1>
      <div className="bg-gray-100 p-8 rounded-lg text-center">
        <div className="text-5xl mb-4">📋</div>
        <h3 className="text-xl font-semibold mb-2">Historique des commandes</h3>
        <p className="text-gray-600">
          Connectez-vous pour voir vos commandes passées
        </p>
        <button className="mt-6 bg-amazon-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Se connecter
        </button>
      </div>
    </div>
  );
};

export default Orders;
