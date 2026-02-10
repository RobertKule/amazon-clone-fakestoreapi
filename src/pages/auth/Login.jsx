import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaShieldAlt, 
  FaTruck, 
  FaArrowRight 
} from 'react-icons/fa';
import { usersService } from '../../services/users';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await usersService.authenticateUser(email, password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setSuccess(true);
        setTimeout(() => navigate(from, { replace: true }), 2000);
      }
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-4 font-sans relative">
      
      {/* MODAL DE CHARGEMENT / SUCCÈS */}
      {(loading || success) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-sm shadow-2xl text-center max-w-sm w-full mx-4">
            {success ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-black uppercase tracking-tighter">Connexion Réussie</h2>
                <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest italic">Heureux de vous revoir !</p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-black uppercase italic">Vérification</h2>
                <p className="text-gray-500 text-sm mt-2 uppercase font-bold tracking-widest">Accès à votre compte...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENEUR PRINCIPAL SPLIT (GAUCHE/DROITE) */}
      <div className="max-w-[1000px] w-full bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row">
        
        {/* --- CÔTÉ GAUCHE : LE FORMULAIRE --- */}
        <div className="flex-1 p-8 md:p-12 border-r border-gray-50">
          <div className="text-center md:text-left mb-10">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-tighter text-gray-900">amazon</span>
              <span className="w-1.5 h-1.5 bg-amazon-orange rounded-full mt-4 ml-0.5 inline-block"></span>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">S'identifier</h1>
            <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Accès sécurisé à votre espace</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase">
               <FaExclamationTriangle className="inline mr-2" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:bg-white focus:border-amazon-orange outline-none transition-all"
                  placeholder="votre@email.com"
                  required
                />
                <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Mot de passe</label>
                <Link to="#" className="text-[10px] font-bold text-blue-600 hover:underline">Oublié ?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-sm py-3 px-4 text-sm focus:bg-white focus:border-amazon-orange outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amazon-orange text-white font-black text-xs uppercase tracking-widest rounded-sm shadow-xl hover:bg-orange-500 transition-all active:scale-95 disabled:bg-gray-300"
            >
              {loading ? 'Authentification...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-4 tracking-tighter">Nouveau chez Amazon ?</p>
            <Link 
              to="/register" 
              className="mt-2 block w-full py-3 border border-gray-200 text-blue-600 font-black uppercase text-xs hover:bg-gray-50 transition-colors italic rounded-sm shadow-sm"
            >
              Créer votre compte Amazon
            </Link>
          </div>
        </div>

        {/* --- CÔTÉ DROIT : VISUEL & AVANTAGES (Masqué sur mobile) --- */}
        <div className="hidden lg:flex flex-1 bg-amazon-blue text-white p-12 flex-col justify-between relative overflow-hidden">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400/10 rounded-full -ml-24 -mb-24 blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter leading-none mb-8">
              BIENVENUE <br /> DANS VOTRE ESPACE
            </h2>
            <div className="space-y-8">
               <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-sm"><FaShieldAlt className="text-amazon-orange text-xl" /></div>
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">Paiement Sécurisé</h4>
                    <p className="text-xs text-gray-400 mt-1">Vos transactions sont protégées par un cryptage SSL de niveau bancaire.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-sm"><FaTruck className="text-amazon-orange text-xl" /></div>
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-tight">Livraison Rapide</h4>
                    <p className="text-xs text-gray-400 mt-1">Profitez de l'expédition Prioritaire sur des milliers d'articles.</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Banner Promo / Feature */}
          <div className="relative z-10 p-6 bg-white/5 border border-white/10 rounded-sm backdrop-blur-md">
             <div className="flex items-center justify-between mb-3">
               <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Prime Member</span>
               <FaArrowRight className="text-[10px]" />
             </div>
             <p className="text-base font-bold leading-tight">Accédez à des offres exclusives et à la livraison gratuite illimitée.</p>
          </div>

          <div className="relative z-10 flex justify-between items-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <span>Amazon Clone v2.0</span>
            <span>RDC • 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;