import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaMapMarkerAlt,
  FaBars,
  FaHeart,
  FaChevronDown,
  FaBox,
  FaTimes,
  FaHeadphones,
  FaGem,
  FaTshirt,
  FaShoppingBag
} from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { productsService } from '../../services';

/**
 * Header Amazon Moderne & Responsive
 * Entièrement traduit en français
 */
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Accès au panier global
  const { cart = [] } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + (item?.quantity || 0), 0);

  // Détecter le scroll pour l'effet sticky
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Charger l'utilisateur et les catégories réelles
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try { setUser(JSON.parse(userData)); } catch (e) { console.error(e); }
    }

    const fetchCats = async () => {
      try {
        const data = await productsService.getCategories();
        setCategories(data);
      } catch (e) {
        setCategories(["electronics", "jewelery", "men's clothing", "women's clothing"]);
      }
    };
    fetchCats();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  // Helper pour traduire les catégories de l'API
  const translateCat = (cat) => {
    const map = {
      "electronics": "Électronique",
      "jewelery": "Bijoux",
      "men's clothing": "Mode Homme",
      "women's clothing": "Mode Femme"
    };
    return map[cat] || cat;
  };

  return (
    <>
      {/* 1. BARRE TOP (Info Livraison) - Masquée sur Mobile */}
      <div className="hidden md:block bg-[#f8f8f8] border-b border-gray-100 py-2 text-[11px] text-gray-500 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-amazon-orange" /> 
              <span>Livrer à</span> 
              <span className="text-gray-900 font-bold ml-1">Kinshasa, RDC</span>
            </div>
            <span className="border-l border-gray-200 pl-4 uppercase tracking-tighter">
              Réponse au COVID-19
            </span>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <Link to="/orders" className="hover:text-gray-900">Service Client</Link>
            <Link to="/products" className="hover:text-gray-900">Vendre</Link>
          </div>
        </div>
      </div>

      {/* 2. HEADER PRINCIPAL (Sticky) */}
      <header className={`bg-white border-b border-gray-100 sticky top-0 z-50 font-sans transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-[1400px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Burger Mobile */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-gray-700 text-xl p-1"
            >
              <FaBars />
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-gray-900 italic">amazon</span>
              <span className="w-2 h-2 bg-amazon-orange rounded-full mt-4 ml-0.5"></span>
            </Link>
          </div>

          {/* Recherche (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-5 pr-12 text-sm focus:bg-white focus:ring-2 focus:ring-amazon-orange/30 outline-none transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-amazon-orange transition">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Actions Droite */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Compte (Desktop) */}
            <Link to={user ? "/orders" : "/login"} className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-gray-400 leading-none">
                Bonjour, {user ? (user.username || 'Client') : 'Identifiez-vous'}
              </span>
              <span className="text-[12px] font-bold text-gray-900 leading-tight flex items-center gap-1">
                Compte & Listes <FaChevronDown className="text-[8px]" />
              </span>
            </Link>

            {/* Commandes (Desktop) */}
            <Link to="/orders" className="hidden md:flex flex-col text-right">
              <span className="text-[10px] text-gray-400 leading-none">Retours</span>
              <span className="text-[12px] font-bold text-gray-900 leading-tight">et Commandes</span>
            </Link>

            {/* Panier (Indique les changements) */}
            <Link to="/cart" className="flex items-center gap-1 group relative">
              <div className="relative">
                <FaShoppingCart className="text-xl md:text-2xl text-gray-900 group-hover:text-amazon-orange transition" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2 bg-amazon-orange text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-sm">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-[13px] font-bold text-gray-900">Panier</span>
            </Link>
          </div>
        </div>

        {/* 3. NAVIGATION CATÉGORIES (Desktop) */}
        <div className="hidden lg:block border-t border-gray-50 py-2.5 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 flex items-center gap-8">
            <Link to="/products" className="text-[11px] font-bold text-gray-900 hover:text-amazon-orange flex items-center gap-1">
              <FaBars className="mr-1" /> TOUT
            </Link>
            {categories.map((cat, i) => (
              <Link 
                key={i} 
                to={`/products?category=${cat}`} 
                className="text-[11px] font-bold text-gray-500 hover:text-amazon-orange uppercase tracking-wider transition-colors"
              >
                {translateCat(cat)}
              </Link>
            ))}
          </div>
        </div>

        {/* RECHERCHE MOBILE (Sous le logo sur mobile) */}
        <div className="lg:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 rounded-lg py-2 px-4 text-sm focus:bg-white border-none outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch />
            </button>
          </form>
        </div>
      </header>

      {/* 4. MENU LATÉRAL MOBILE (Drawer) */}
      <div className={`fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="bg-amazon-blue text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUser className="text-xl" />
              <span className="font-bold">Bonjour, {user ? user.username : 'Identifiez-vous'}</span>
            </div>
            <button onClick={() => setIsMenuOpen(false)}><FaTimes /></button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
            <h3 className="text-gray-900 font-bold mb-4">Catégories</h3>
            <div className="space-y-4">
              <Link to="/products" className="block text-gray-600" onClick={() => setIsMenuOpen(false)}>Tous les produits</Link>
              {categories.map((cat, i) => (
                <Link 
                  key={i} 
                  to={`/products?category=${cat}`} 
                  className="block text-gray-600 border-b border-gray-50 pb-2 capitalize"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {translateCat(cat)}
                </Link>
              ))}
            </div>
            
            <h3 className="text-gray-900 font-bold mt-8 mb-4">Votre Compte</h3>
            <div className="space-y-4 text-gray-600">
              <Link to="/orders" className="block" onClick={() => setIsMenuOpen(false)}>Vos Commandes</Link>
              <Link to="/cart" className="block" onClick={() => setIsMenuOpen(false)}>Votre Panier</Link>
              {!user && <Link to="/login" className="block text-amazon-orange font-bold" onClick={() => setIsMenuOpen(false)}>Se connecter</Link>}
            </div>
          </div>
        </div>
      </div>

      {/* 5. NAVIGATION BAS MOBILE (Standard Mobile UX) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14 z-[90] flex items-center justify-around">
        <Link to="/" className="flex flex-col items-center text-gray-500 hover:text-amazon-orange">
          <FaShoppingBag className="text-lg" />
          <span className="text-[10px]">Accueil</span>
        </Link>
        <Link to="/products" className="flex flex-col items-center text-gray-500 hover:text-amazon-orange">
          <FaBox className="text-lg" />
          <span className="text-[10px]">Boutique</span>
        </Link>
        <Link to="/orders" className="flex flex-col items-center text-gray-500 hover:text-amazon-orange">
          <FaUser className="text-lg" />
          <span className="text-[10px]">Moi</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center text-gray-500 hover:text-amazon-orange relative">
          <FaShoppingCart className="text-lg" />
          {cartItemCount > 0 && (
             <span className="absolute -top-1 right-0 bg-amazon-orange text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
               {cartItemCount}
             </span>
          )}
          <span className="text-[10px]">Panier</span>
        </Link>
      </div>
    </>
  );
};

export default Header;