/**
 * Page d'accueil de l'application
 */
const Home = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Bienvenue sur Amazon Clone
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Découvrez notre sélection exclusive de produits. La meilleure expérience
        d'achat en ligne vous attend !
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">🎯 Large Sélection</h3>
          <p>Des milliers de produits dans toutes les catégories</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">🚚 Livraison Rapide</h3>
          <p>Recevez vos commandes en 24-48 heures</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-3">💳 Paiement Sécurisé</h3>
          <p>Transactions 100% sécurisées</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
