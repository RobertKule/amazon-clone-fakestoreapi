import { Link } from 'react-router-dom';

/**
 * Footer minimaliste conforme au design de la maquette
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 font-sans">
      <div className="max-w-[1200px] mx-auto px-4">
        
        {/* Grille principale à 4 colonnes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          {/* Get to Know Us */}
          <div>
            <h3 className="text-gray-900 font-bold text-[13px] mb-4 uppercase tracking-tight">Get to Know Us</h3>
            <ul className="space-y-1 text-[11px] text-gray-500 font-medium">
              <li><Link to="#" className="hover:underline">Careers</Link></li>
              <li><Link to="#" className="hover:underline">Blog</Link></li>
              <li><Link to="#" className="hover:underline">About Amazon</Link></li>
              <li><Link to="#" className="hover:underline">Investor Relations</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Devices</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Tours</Link></li>
            </ul>
          </div>

          {/* Make Money with Us */}
          <div>
            <h3 className="text-gray-900 font-bold text-[13px] mb-4 uppercase tracking-tight">Make Money with Us</h3>
            <ul className="space-y-1 text-[11px] text-gray-500 font-medium">
              <li><Link to="#" className="hover:underline">Sell products on Amazon</Link></li>
              <li><Link to="#" className="hover:underline">Sell apps on Amazon</Link></li>
              <li><Link to="#" className="hover:underline">Become an Affiliate</Link></li>
              <li><Link to="#" className="hover:underline">Advertise Your Products</Link></li>
              <li><Link to="#" className="hover:underline">Self-Publish with Us</Link></li>
              <li><Link to="#" className="hover:underline">Host an Amazon Hub</Link></li>
              <li><Link to="#" className="hover:underline">› See More Money with Us</Link></li>
            </ul>
          </div>

          {/* Let Us Help You */}
          <div>
            <h3 className="text-gray-900 font-bold text-[13px] mb-4 uppercase tracking-tight">Let Us Help You</h3>
            <ul className="space-y-1 text-[11px] text-gray-500 font-medium">
              <li><Link to="#" className="hover:underline">Amazon and COVID-19</Link></li>
              <li><Link to="#" className="hover:underline">Your Account</Link></li>
              <li><Link to="#" className="hover:underline">Your Orders</Link></li>
              <li><Link to="#" className="hover:underline">Shipping Rates & Policies</Link></li>
              <li><Link to="#" className="hover:underline">Returns & Replacements</Link></li>
              <li><Link to="#" className="hover:underline">Manage Your Content and Devices</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Assistant</Link></li>
              <li><Link to="#" className="hover:underline">Help</Link></li>
            </ul>
          </div>

          {/* Amazon Payment Products */}
          <div>
            <h3 className="text-gray-900 font-bold text-[13px] mb-4 uppercase tracking-tight">Amazon Payment Products</h3>
            <ul className="space-y-1 text-[11px] text-gray-500 font-medium">
              <li><Link to="#" className="hover:underline">Amazon Business Card</Link></li>
              <li><Link to="#" className="hover:underline">Shop with Points</Link></li>
              <li><Link to="#" className="hover:underline">Reload Your Balance</Link></li>
              <li><Link to="#" className="hover:underline">Amazon Currency Converter</Link></li>
            </ul>
          </div>
        </div>

        {/* Lien "View more information" central */}
        <div className="text-center mb-8">
          <Link to="#" className="text-gray-600 text-[11px] font-medium hover:underline flex items-center justify-center">
            View more information <span className="ml-1 text-[8px]">▼</span>
          </Link>
        </div>

        {/* Ligne de séparation et Copyright final */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mb-4 text-[10px] text-gray-400">
              <Link to="#" className="hover:underline">Conditions of Use</Link>
              <Link to="#" className="hover:underline">Privacy Notice</Link>
              <Link to="#" className="hover:underline">Interest-Based Ads</Link>
            </div>
            
            <div className="text-[10px] text-gray-400">
              © 1996-{currentYear}, Amazon.com, Inc. or its affiliates
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;