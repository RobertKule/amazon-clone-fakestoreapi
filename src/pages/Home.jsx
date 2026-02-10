import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaStar,
  FaShoppingCart,
  FaChevronRight,
  FaLaptop,
  FaHome,
  FaGem,
  FaGamepad,
  FaChild,
  FaBolt,
  FaFire,
  FaBoxOpen,
} from 'react-icons/fa';

import { productsService } from '../services';
import { formatProduct } from '../utils/apiHelpers';
import Loading from '../components/common/Loading';
import { useCart } from './../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amazonBasics, setAmazonBasics] = useState([]);
  const [computerFeatured, setComputerFeatured] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const allProducts = await productsService.getAllProducts();
        const formatted = allProducts.map(formatProduct);
        setProducts(formatted);

        // Sélection d'un produit phare pour le Hero (Ordinateur/Élec)
        const comp = formatted.find(p => p.category === 'electronics') || formatted[0];
        setComputerFeatured(comp);

        // Amazon Basics (Prix bas)
        setAmazonBasics(formatted.filter(p => p.price < 50).slice(0, 3));

      } catch (err) {
        console.error('Erreur chargement Home:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    // Optionnel: petit toast ou feedback visuel ici
  };

  if (loading) return <Loading />;

  // Filtrage pour les sections spécifiques
  const fashionHer = products.filter(p => p.category === "women's clothing").slice(0, 4);
  const fashionHim = products.filter(p => p.category === "men's clothing").slice(0, 4);
  const topSellers = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 5);

  return (
    <div className="bg-[#f3f3f3] min-h-screen font-sans text-gray-900 pb-20 md:pb-0">

      {/* 1. HERO SECTION (Responsive) */}
      <div className="max-w-[1400px] mx-auto p-4">
        <div className="bg-white rounded-sm shadow-sm flex flex-col md:flex-row items-center p-6 md:p-16 relative overflow-hidden">
          <div className="z-10 w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter leading-tight">
              BOUTIQUE INFORMATIQUE <br className="hidden md:block" /> & ACCESSOIRES
            </h1>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              Découvrez nos ordinateurs, écrans, tablettes et accessoires de jeu au meilleur prix.
            </p>
            <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center justify-center md:justify-start">
              Voir plus <FaChevronRight className="ml-2 text-xs" />
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 relative">
            <div className="absolute -top-5 right-5 md:right-10 bg-amazon-orange text-white rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center font-bold text-sm shadow-lg z-20">
              -20%
            </div>
            {computerFeatured && (
              <div className="relative group">
                <img
                  src={computerFeatured.image}
                  alt="Produit Vedette"
                  className="w-48 h-48 md:w-80 md:h-80 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="hidden md:block absolute -bottom-4 -right-10 bg-white/90 backdrop-blur-sm p-3 rounded shadow-xl border border-gray-100">
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Promotion</p>
                  <p className="font-bold text-xs truncate w-32">{computerFeatured.title}</p>
                  <p className="text-blue-600 font-bold">${computerFeatured.price}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION RAPIDE (Scroll horizontal sur mobile) */}
      <div className="max-w-[1400px] mx-auto px-4 mb-8">
        <div className="flex overflow-x-auto md:justify-center gap-6 md:gap-12 bg-white p-6 rounded-sm shadow-sm scrollbar-hide">
          {[
            { label: 'Nouveautés', icon: <FaBolt />, color: 'text-orange-400', path: '/products' },
            { label: 'Meilleures Ventes', icon: <FaFire />, color: 'text-red-500', path: '/products' },
            { label: 'Commandes', icon: <FaBoxOpen />, color: 'text-blue-600', path: '/orders' },
            { label: 'Électronique', icon: <FaLaptop />, color: 'text-gray-800', path: '/products?category=electronics' },
            { label: 'Maison', icon: <FaHome />, color: 'text-gray-800', path: '/products' },
          ].map((item, i) => (
            <Link key={i} to={item.path} className="flex flex-col md:flex-row items-center gap-2 md:gap-3 min-w-fit group">
              <div className={`text-xl md:text-2xl ${item.color} group-hover:scale-110 transition`}>
                {item.icon}
              </div>
              <span className="text-[11px] md:text-sm font-bold whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. GRILLE DE CATÉGORIES (Responsive 1/2/4 colonnes) */}
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Beauté & Soins", cat: "jewelery", icon: <FaGem className="text-pink-400" />, img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_1x._SY304_CB432773537_.jpg" },
          { title: "Informatique", cat: "electronics", icon: <FaLaptop className="text-blue-400" />, img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431468035_.jpg" },
          { title: "Jeux Vidéo", cat: "electronics", icon: <FaGamepad className="text-purple-400" />, img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Games_1x._SY304_CB432773537_.jpg" },
          { title: "Jouets & Jeux", cat: "electronics", icon: <FaChild className="text-green-400" />, img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Toys_1x._SY304_CB432773537_.jpg" },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-sm shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              {item.icon} {item.title}
            </h2>
            <div className="h-64 bg-gray-50 mb-4 overflow-hidden rounded-sm">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
            </div>
            <Link to={`/products?category=${item.cat}`} className="text-blue-600 text-xs font-bold hover:underline">Acheter maintenant</Link>
          </div>
        ))}
      </div>

      {/* 4. AMAZON BASICS SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-amazon-orange">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">Les Essentiels Amazon</h2>
            <Link to="/products" className="text-blue-600 text-sm font-bold">Voir tout</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {amazonBasics.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <div className="h-48 flex items-center justify-center bg-gray-50 rounded-sm mb-4 p-4">
                  <img src={p.image} alt={p.title} className="max-h-full object-contain group-hover:scale-105 transition" />
                </div>
                <p className="text-xs font-bold text-blue-600 line-clamp-1 mb-1">{p.title}</p>
                <p className="font-black text-xl mb-4">${p.price}</p>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-amazon-orange text-white font-bold py-2 rounded shadow-sm hover:bg-orange-500 transition text-sm"
                >
                  AJOUTER AU PANIER
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. MEILLEURES VENTES (Row) */}
      <div className="max-w-[1400px] mx-auto px-4 mb-8">
        <div className="bg-white p-6 rounded-sm shadow-sm">
          <h2 className="text-xl font-bold mb-6">Nos meilleures ventes</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {topSellers.map((p) => (
              <div key={p.id} className="flex flex-col cursor-pointer group" onClick={() => handleAddToCart(p)}>
                <div className="h-32 md:h-40 flex items-center justify-center mb-3">
                  <img src={p.image} alt={p.title} className="max-h-full object-contain group-hover:scale-105 transition" />
                </div>
                <div className="flex text-amazon-orange text-[10px] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(p.rating.rate) ? "fill-current" : "text-gray-200"} />
                  ))}
                </div>
                <p className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight mb-2 group-hover:text-blue-600">{p.title}</p>
                <p className="font-bold text-base">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. MODE ET STYLE (Split Section Her/Him) */}
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
        {/* Pour Elle */}
        <div className="bg-white p-6 rounded-sm shadow-sm flex gap-6">
          <div className="w-1/2">
            <h2 className="text-xl font-black mb-2 uppercase">Style pour elle</h2>
            <p className="text-[11px] text-gray-500 mb-6">Vêtements, chaussures et accessoires tendance.</p>
            <div className="grid grid-cols-2 gap-2">
              {fashionHer.map(p => (
                <div key={p.id} className="bg-gray-50 p-2 h-20 flex items-center justify-center rounded-sm">
                  <img src={p.image} className="max-h-full object-contain" alt="mode" />
                </div>
              ))}
            </div>
            <Link to="/products" className="text-blue-600 text-[11px] font-bold mt-6 block uppercase tracking-wider">Découvrir</Link>
          </div>
          <div className="w-1/2 rounded overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop" className="w-full h-full object-cover" alt="femme" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>

        {/* Pour Lui */}
        <div className="bg-white p-6 rounded-sm shadow-sm flex gap-6">
          <div className="w-1/2">
            <h2 className="text-xl font-black mb-2 uppercase">Style pour lui</h2>
            <p className="text-[11px] text-gray-500 mb-6">Tout l'univers de la mode masculine.</p>
            <div className="grid grid-cols-2 gap-2">
              {fashionHim.map(p => (
                <div key={p.id} className="bg-gray-50 p-2 h-20 flex items-center justify-center rounded-sm">
                  <img src={p.image} className="max-h-full object-contain" alt="mode" />
                </div>
              ))}
            </div>
            <Link to="/products" className="text-blue-600 text-[11px] font-bold mt-6 block uppercase tracking-wider">Découvrir</Link>
          </div>
          <div className="w-1/2 rounded overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=400&h=600&fit=crop" className="w-full h-full object-cover" alt="homme" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* 7. NEWSLETTER SECTION */}
      <div className="max-w-[1400px] mx-auto px-4 mb-16">
        <div className="bg-white rounded-sm shadow-sm p-8 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden border-t-4 border-amazon-orange">
          <div className="z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black mb-2 uppercase italic tracking-tighter leading-none">ABONNEZ-VOUS À <br /> LA NEWSLETTER</h2>
            <p className="text-gray-500 text-[11px] md:text-xs mb-8 uppercase tracking-widest font-bold">Ne manquez aucune promotion et exclusivité !</p>
            <div className="flex max-w-md mx-auto md:mx-0 shadow-xl">
              <input type="email" placeholder="Votre email" className="flex-grow border border-gray-200 p-3 md:p-4 outline-none text-sm" />
              <button className="bg-amazon-orange px-6 md:px-10 py-3 md:py-4 font-black text-xs md:text-sm text-white hover:bg-orange-500 transition">S'ABONNER</button>
            </div>
          </div>
          <div className="mt-10 md:mt-0 hidden md:block">
            <div className="w-64 h-64 rounded-full border-[12px] border-gray-50 overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" className="w-full h-full object-cover" alt="subscribe" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;