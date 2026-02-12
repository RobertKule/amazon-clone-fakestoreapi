import { useState } from "react";

const ProductInfo = ({ product }) => {
  const [qty, setQty] = useState(1);

  const addToCart = () => {
    alert(`Ajouté ${qty} article(s) au panier`);
  };

  return (
    <div className="bg-white border rounded p-6">
      <h1 className="text-xl font-semibold mb-2">
        {product.title}
      </h1>

      <p className="text-gray-600 mb-4">
        {product.description}
      </p>

      <p className="text-2xl font-bold mb-2">
        ${product.price}
      </p>

      <p className="text-green-600 mb-4">
        En stock
      </p>

      {/* Quantité */}
      <div className="flex items-center gap-2 mb-4">
        <span>Quantité :</span>
        <select
          value={qty}
          onChange={e => setQty(e.target.value)}
          className="border px-2 py-1"
        >
          {[1,2,3,4,5].map(n => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </div>

      {/* Bouton panier */}
      <button
        onClick={addToCart}
        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded font-semibold w-full"
      >
        Ajouter au panier
      </button>

      {/* Caractéristiques */}
      <div className="mt-6 text-sm text-gray-700">
        <p><b>Catégorie :</b> {product.category}</p>
        <p><b>Note :</b> ⭐ {product.rating?.rate}</p>
      </div>
    </div>
  );
};

export default ProductInfo;