import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

/**
 * Footer de l'application avec liens et informations
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amazon-dark text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Liens principaux */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  Notre entreprise
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-300 hover:text-white">
                  Carrières
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-white">
                  Presse
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-gray-300 hover:text-white"
                >
                  Investisseurs
                </Link>
              </li>
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contactez-nous
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white">
                  Retours
                </Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white">
                  Cookies
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-300 hover:text-white">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Suivez-nous */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">
                &copy; {currentYear} Amazon Clone. Projet éducatif développé par
                Afrix Global - Groupe 1.
              </p>
            </div>

            {/* Langue et pays */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">🌐</span>
                <select className="bg-transparent text-gray-300 border-none focus:outline-none">
                  <option>Français</option>
                  <option>English</option>
                </select>
              </div>
              <div className="text-gray-300">🇫🇷 France</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
