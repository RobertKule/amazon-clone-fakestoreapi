import { Link } from 'react-router-dom';

/**
 * Page 404 - Page non trouvée
 */
const NotFound = () => {
  return (
    <div className="text-center py-20">
      <div className="text-9xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Oops ! Page non trouvée
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="inline-block bg-amazon-blue text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Retour à l'accueil
        </Link>
        <Link
          to="/products"
          className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-black"
        >
          Voir les produits
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
