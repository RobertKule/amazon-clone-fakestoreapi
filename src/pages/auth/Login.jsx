import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Page de connexion
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    console.log('Connexion avec:', { email, password });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Connexion
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-blue"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amazon-blue"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amazon-blue text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Se connecter
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Nouveau chez nous ?{' '}
            <Link to="/register" className="text-amazon-blue hover:underline">
              Créez un compte
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
