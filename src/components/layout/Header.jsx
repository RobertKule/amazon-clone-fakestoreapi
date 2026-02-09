import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

/**
 * Header de l'application avec navigation et fonctionnalités principales
 */
const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-amazon-blue rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 hidden md:inline">
                Amazon<span className="text-amazon-orange">Clone</span>
              </span>
            </Link>
          </div>

          {/* Barre de recherche */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amazon-blue"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-amazon-orange text-white rounded-r-full hover:bg-orange-600">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-amazon-blue font-medium"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-amazon-blue font-medium"
            >
              Produits
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-amazon-blue"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-amazon-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-amazon-blue">
              <FaUser className="text-xl" />
            </Link>
          </nav>
        </div>

        {/* Barre de recherche mobile */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-blue"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-amazon-orange text-white rounded-r-lg hover:bg-orange-600">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
