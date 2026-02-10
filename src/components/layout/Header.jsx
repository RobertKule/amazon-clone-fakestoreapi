import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔒 Sécurisation des contexts (ANTI-CRASH)
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);

  const cartItems = cartContext?.cartItems ?? [];
  const user = authContext?.user ?? null;
  const logout = authContext?.logout ?? (() => {});

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="flex items-center gap-4 px-4 py-3">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          AmazonClone
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Rechercher un produit"
          className="hidden md:block flex-1 px-3 py-2 text-black rounded-md outline-none"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/">Accueil</Link>
          <Link to="/products">Produits</Link>
          <Link to="/orders">Commandes</Link>
        </nav>

        {/* User / Cart / Menu */}
        <div className="flex items-center gap-4 ml-auto">

          {/* Auth */}
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
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars size={20} />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-4 pb-3">
        <input
          type="text"
          placeholder="Rechercher un produit"
          className="w-full px-3 py-2 text-black rounded-md outline-none"
        />
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col gap-3 px-4 py-3 text-sm">
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Produits</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>Commandes</Link>
        </div>
      )}
    </header>
  );
};

export default Header;