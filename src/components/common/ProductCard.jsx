import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const truncatedTitle = product.title.length > 50 
    ? `${product.title.substring(0, 50)}...` 
    : product.title;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden group">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="h-48 bg-white flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-gray-800 mb-2 hover:text-amazon-blue transition-colors">
            {truncatedTitle}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm ml-2">
            ({product.rating.count})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-amazon-blue font-bold text-xl">
              ${product.price}
            </span>
            {product.price > 50 && (
              <span className="ml-2 text-gray-500 text-sm line-through">
                ${(product.price * 1.2).toFixed(2)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-amazon-orange text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
            aria-label="Ajouter au panier"
          >
            <FaShoppingCart />
          </button>
        </div>

        {/* Category */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 capitalize">
            {product.category.replace(/'/g, '')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;