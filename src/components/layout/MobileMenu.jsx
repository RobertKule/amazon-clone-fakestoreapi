// src/components/layout/MobileMenu.jsx
import { Link } from "react-router-dom";

const MobileMenu = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="absolute top-16 left-0 w-full bg-gray-900 text-white flex flex-col gap-4 p-4 md:hidden z-50">
      <Link to="/" onClick={onClose}>Accueil</Link>
      <Link to="/products" onClick={onClose}>Produits</Link>
      <Link to="/orders" onClick={onClose}>Commandes</Link>
    </div>
  );
};

export default MobileMenu;