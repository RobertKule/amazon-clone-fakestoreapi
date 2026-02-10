import { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone, 
  FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaShieldAlt 
} from 'react-icons/fa';
import { usersService } from '../../services/users';

/**
 * COMPOSANT EXTRAIT : Défini à l'extérieur pour éviter la perte de focus
 */
const InputGroup = ({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon, required = false, disabled = false }) => (
  <div className="mb-4">
    <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 tracking-widest">
      {label} {required && <span className="text-amazon-orange">*</span>}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-gray-50 border ${error ? 'border-red-500' : 'border-gray-100'} rounded-sm py-2.5 px-4 text-sm focus:bg-white focus:border-amazon-orange outline-none transition-all`}
        required={required}
      />
      {Icon && <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-200" />}
    </div>
    {error && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase italic">{error}</p>}
  </div>
);

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', username: '',
    password: '', confirmPassword: '', phone: '',
    street: '', city: '', zipcode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Mémorisation du changement pour éviter les re-calculs inutiles
  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (id === 'password') {
      let strength = 0;
      if (value.length >= 6) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }

    if (errors[id]) setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
      setLoading(false);
      return;
    }

    try {
      const newUser = await usersService.registerUser(formData);
      setSuccess(true);
      // On laisse le modal de succès 2 secondes avant de rediriger
      setTimeout(() => navigate('/login'), 2500);
    } catch (error) {
      setErrors({ general: error.message });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-4 md:p-10 font-sans relative">
      
      {/* MODAL / OVERLAY DE CHARGEMENT OU SUCCÈS */}
      {(loading || success) && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-sm shadow-2xl text-center max-w-sm w-full mx-4">
            {success ? (
              <div className="animate-in zoom-in duration-300">
                <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-black uppercase">Compte Créé !</h2>
                <p className="text-gray-500 text-sm mt-2 font-bold">Bienvenue chez Amazon Clone. Redirection vers la connexion...</p>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-black uppercase italic">Inscription en cours</h2>
                <p className="text-gray-500 text-sm mt-2 uppercase font-bold tracking-widest">Vérification de vos données...</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-[1100px] w-full bg-white shadow-2xl rounded-sm overflow-hidden flex flex-col lg:flex-row">
        <div className="flex-[2] p-8 md:p-12 border-r border-gray-50">
          <div className="mb-8">
            <Link to="/" className="flex items-center mb-6">
              <span className="text-2xl font-black tracking-tighter text-gray-900">amazon</span>
              <span className="w-1.5 h-1.5 bg-amazon-orange rounded-full mt-4 ml-0.5"></span>
            </Link>
            <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none">Créer un compte</h1>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase">
              <FaExclamationTriangle className="inline mr-2" /> {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h3 className="text-xs font-black text-amazon-orange uppercase mb-4 tracking-tighter border-b border-gray-50 pb-2">1. Personnel</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup id="firstName" label="Prénom" value={formData.firstName} onChange={handleChange} error={errors.firstName} placeholder="Robert" required />
                <InputGroup id="lastName" label="Nom" value={formData.lastName} onChange={handleChange} error={errors.lastName} placeholder="KULE" required />
              </div>
              <InputGroup id="email" label="E-mail" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="Robert@email.com" required />
              <InputGroup id="username" label="Pseudo" value={formData.username} onChange={handleChange} error={errors.username} placeholder="RobertKULE243" required />
            </section>

            <section>
              <h3 className="text-xs font-black text-amazon-orange uppercase mb-4 tracking-tighter border-b border-gray-50 pb-2">2. Sécurité</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5 tracking-widest">Mot de passe</label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-100 rounded-sm py-2.5 px-4 text-sm focus:bg-white focus:border-amazon-orange outline-none transition-all"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-2 flex gap-1 h-1">
                      <div className={`flex-1 rounded-full ${passwordStrength >= 25 ? 'bg-red-500' : 'bg-gray-100'}`}></div>
                      <div className={`flex-1 rounded-full ${passwordStrength >= 50 ? 'bg-yellow-500' : 'bg-gray-100'}`}></div>
                      <div className={`flex-1 rounded-full ${passwordStrength >= 75 ? 'bg-green-500' : 'bg-gray-100'}`}></div>
                    </div>
                  )}
                </div>
                <InputGroup id="confirmPassword" label="Confirmation" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} required />
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-sm font-black text-xs uppercase tracking-widest text-white shadow-xl bg-amazon-orange hover:bg-orange-500 active:scale-95 transition-all"
            >
              Créer mon compte
            </button>
          </form>

          <div className="mt-8 text-center text-[10px]">
            <p className="text-gray-400 font-bold uppercase tracking-tighter">Déjà membre ?</p>
            <Link to="/login" className="text-blue-600 font-black uppercase text-xs hover:underline mt-2 inline-block italic">S'identifier ici</Link>
          </div>
        </div>

        {/* SECTION DROITE (VISUELLE) */}
        <div className="hidden lg:flex flex-1 bg-amazon-blue text-white p-12 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter leading-none mb-8">REJOIGNEZ <br /> LA RÉVOLUTION</h2>
            <div className="space-y-6">
              <div className="flex gap-4"><FaCheckCircle className="text-amazon-orange mt-1" /><div><h4 className="text-sm font-black uppercase">Livraison Priority</h4><p className="text-xs text-gray-400">Expédition en 24h.</p></div></div>
              <div className="flex gap-4"><FaShieldAlt className="text-amazon-orange mt-1" /><div><h4 className="text-sm font-black uppercase">Paiement Sécurisé</h4><p className="text-xs text-gray-400">Protection totale SSL.</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;