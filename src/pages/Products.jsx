import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaFilter, 
  FaStar, 
  FaShoppingCart, 
  FaChevronLeft, 
  FaChevronRight,
  FaTimes,
  FaSortAmountDown,
  FaList,
  FaThLarge
} from 'react-icons/fa';
import { productsService } from '../services';
import { formatProduct } from '../utils/apiHelpers';
import Loading from '../components/common/Loading';
import { useCart } from '../context/CartContext';

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // États
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filtres
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedCat, setSelectedCat] = useState('all');

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [allProducts, allCats] = await Promise.all([
          productsService.getAllProducts(),
          productsService.getCategories()
        ]);
        
        const formatted = allProducts.map(formatProduct);
        setProducts(formatted);
        setCategories(allCats);
        
        // Appliquer les filtres initiaux basés sur l'URL
        applyInitialFilters(formatted);
      } catch (err) {
        console.error("Erreur chargement produits:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [location.search]);

  const applyInitialFilters = (data) => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search')?.toLowerCase() || '';
    const category = params.get('category') || 'all';
    
    let result = data;
    if (search) {
      result = result.filter(p => p.title.toLowerCase().includes(search));
    }
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
      setSelectedCat(category);
    }
    setFilteredProducts(result);
  };

  // Logique de tri
  const handleSort = (type) => {
    setSortBy(type);
    let sorted = [...filteredProducts];
    if (type === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (type === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else if (type === 'rating') sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    setFilteredProducts(sorted);
  };

  // Traduction des catégories
  const translateCat = (cat) => {
    const map = { "electronics": "Électronique", "jewelery": "Bijoux", "men's clothing": "Mode Homme", "women's clothing": "Mode Femme" };
    return map[cat] || cat;
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-[#f3f3f3] min-h-screen font-sans">
      
      {/* 1. Header de page / Breadcrumbs léger */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <h1 className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            {filteredProducts.length} Résultats pour <span className="text-gray-900">"{new URLSearchParams(location.search).get('search') || 'Tous les produits'}"</span>
          </h1>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setShowMobileFilters(true)}
               className="lg:hidden flex items-center gap-2 text-xs font-bold border border-gray-200 px-4 py-2 rounded"
             >
               <FaFilter /> FILTRES
             </button>
             <select 
               onChange={(e) => handleSort(e.target.value)}
               className="text-xs font-bold border-none bg-gray-50 rounded px-4 py-2 outline-none cursor-pointer"
             >
               <option value="default">Trier par : Vedettes</option>
               <option value="price-asc">Prix : Croissant</option>
               <option value="price-desc">Prix : Décroissant</option>
               <option value="rating">Mieux notés</option>
             </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* 2. SIDEBAR FILTRES (Desktop) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="space-y-8 sticky top-24">
            
            {/* Catégories */}
            <div>
              <h3 className="text-[13px] font-black uppercase mb-4 tracking-tighter">Catégories</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => navigate('/products')}
                    className={`text-xs font-medium hover:text-amazon-orange transition ${selectedCat === 'all' ? 'text-amazon-orange font-bold' : 'text-gray-500'}`}
                  >
                    Toutes les catégories
                  </button>
                </li>
                {categories.map((cat, i) => (
                  <li key={i}>
                    <button 
                      onClick={() => navigate(`/products?category=${cat}`)}
                      className={`text-xs font-medium hover:text-amazon-orange transition capitalize ${selectedCat === cat ? 'text-amazon-orange font-bold' : 'text-gray-500'}`}
                    >
                      {translateCat(cat)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prix */}
            <div>
              <h3 className="text-[13px] font-black uppercase mb-4 tracking-tighter">Prix Maximum</h3>
              <input 
                type="range" min="0" max="1000" step="10" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full accent-amazon-orange h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
                <span>0$</span>
                <span className="text-gray-900 font-black">{priceRange}$</span>
              </div>
            </div>

            {/* Avis Clients */}
            <div>
              <h3 className="text-[13px] font-black uppercase mb-4 tracking-tighter">Avis Clients</h3>
              {[4, 3, 2, 1].map((star) => (
                <button key={star} className="flex items-center gap-2 mb-2 group">
                  <div className="flex text-amazon-orange text-[10px]">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className={i < star ? 'fill-current' : 'text-gray-200'} />)}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-amazon-orange">& Up</span>
                </button>
              ))}
            </div>

          </div>
        </aside>

        {/* 3. GRILLE DE PRODUITS */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-20 text-center rounded-sm shadow-sm">
              <FaSearch className="mx-auto text-4xl text-gray-200 mb-4" />
              <h2 className="text-xl font-bold">Aucun produit trouvé</h2>
              <p className="text-gray-500 text-sm mt-2">Essayez de modifier vos critères de recherche.</p>
              <button onClick={() => navigate('/products')} className="mt-6 bg-amazon-orange text-white px-8 py-2 font-bold text-xs rounded">VOIR TOUT</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.filter(p => p.price <= priceRange).map((product) => (
                <div key={product.id} className="bg-white p-4 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                  {/* Image */}
                  <div className="h-48 relative mb-4 overflow-hidden rounded-sm bg-gray-50 p-6">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                    {product.rating.rate > 4.5 && (
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-2 py-1 rounded-sm uppercase italic">Best Seller</span>
                    )}
                  </div>
                  
                  {/* Infos */}
                  <div className="flex-grow">
                    <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">{translateCat(product.category)}</p>
                    <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 h-10 leading-tight group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1 my-3">
                      <div className="flex text-amazon-orange text-[10px]">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.floor(product.rating.rate) ? 'fill-current' : 'text-gray-200'} />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-blue-500">({product.rating.count})</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] font-bold text-gray-900">$</span>
                      <span className="text-2xl font-black text-gray-900 leading-none">{Math.floor(product.price)}</span>
                      <span className="text-[12px] font-bold text-gray-900">{(product.price % 1).toFixed(2).substring(2)}</span>
                    </div>
                  </div>

                  {/* Bouton */}
                  <button 
                    onClick={() => addToCart({...product, quantity: 1})}
                    className="mt-4 w-full bg-amazon-orange text-white py-2 text-[11px] font-black rounded-sm shadow-sm hover:bg-orange-500 transition-all uppercase tracking-tighter"
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 4. MODAL FILTRES MOBILE */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[100] bg-white p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">Filtres</h2>
            <button onClick={() => setShowMobileFilters(false)} className="p-2"><FaTimes className="text-xl" /></button>
          </div>
          
          <div className="space-y-8 overflow-y-auto">
             <div>
               <h3 className="text-sm font-bold mb-4">Catégories</h3>
               <div className="flex flex-wrap gap-2">
                 {categories.map((cat, i) => (
                   <button 
                    key={i} 
                    onClick={() => { navigate(`/products?category=${cat}`); setShowMobileFilters(false); }}
                    className="px-4 py-2 bg-gray-100 rounded-full text-xs font-bold uppercase"
                   >
                     {translateCat(cat)}
                   </button>
                 ))}
               </div>
             </div>

             <div>
                <h3 className="text-sm font-bold mb-4">Prix Max: {priceRange}$</h3>
                <input 
                  type="range" min="0" max="1000" 
                  value={priceRange} 
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full accent-amazon-orange"
                />
             </div>
          </div>
          
          <button 
            onClick={() => setShowMobileFilters(false)}
            className="mt-auto w-full bg-amazon-orange text-white py-4 font-black rounded"
          >
            APPLIQUER LES FILTRES
          </button>
        </div>
      )}

    </div>
  );
};

export default Products;