import { FaGithub, FaCode } from 'react-icons/fa';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      
      {/* Titre Principal */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6">
        🛒 <span className="text-amazon-blue">Amazon Clone</span>
      </h1>
      
      {/* Badge d'état */}
      <div className="inline-flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 mb-8">
        <span className="text-yellow-800 font-medium">🚧 En cours de développement</span>
      </div>
      
      {/* Phrase d'accroche */}
      <p className="text-xl text-gray-600 text-center max-w-2xl mb-12">
        Une plateforme e-commerce moderne développée avec <span className="font-semibold text-amazon-blue">React</span>, 
        <span className="font-semibold text-amazon-orange"> Tailwind CSS</span> et intégrant <span className="font-semibold">FakeStoreAPI</span>.
      </p>
      
      {/* Boutons CTA */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Bouton 1 : Code source GitHub */}
        <a 
          href="https://github.com/RobertKule/amazon-clone-fakestoreapi" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[200px]"
        >
          <FaGithub className="text-xl" />
          <span>Code source GitHub</span>
        </a>
        
        {/* Bouton 2 : Documentation */}
        <a 
          href="https://github.com/RobertKule/amazon-clone-fakestoreapi#readme" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-amazon-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg min-w-[200px]"
        >
          <FaCode className="text-xl" />
          <span>Documentation</span>
        </a>
      </div>
      
      {/* Note en bas */}
      <p className="mt-12 text-gray-500 text-sm text-center max-w-md">
        Projet développé par <span className="font-semibold">Afrix Global - Groupe 1</span>. 
        L'application est actuellement en phase de développement.
      </p>
    </div>
  );
}

export default App;