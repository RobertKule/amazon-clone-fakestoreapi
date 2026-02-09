// src/components/layout/Header.jsx
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartCount = cartItems?.length || 0;

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 gap-4">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          AmazonClone
        </Link>

        {/* Search (Desktop only) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar />
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/orders">Commandes</Link>
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          {user ? (
            <button
              onClick={logout}
              className="text-sm hover:underline"
            >
              Déconnexion
            </button>
          ) : (
            <Link to="/login" className="text-sm hover:underline">
              Connexion
            </Link>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger (Mobile) */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {/* Search Mobile */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar />
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
};

export default Header;