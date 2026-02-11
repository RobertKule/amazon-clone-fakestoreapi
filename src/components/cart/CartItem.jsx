const CartItem = ({ item, variant = "extended" }) => {
  if (!item) return null;

  const quantity = item.quantity || 1;
  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="flex gap-6 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
      {/* Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className={
            variant === "compact"
              ? "w-20 h-20 object-contain"
              : "w-32 h-32 object-contain"
          }
        />
      </div>

      {/* Infos produit */}
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-900 leading-snug mb-1">
          {item.title}
        </h3>

        {variant === "extended" && (
          <p className="text-xs text-gray-600 mb-2">
            {item.description}
          </p>
        )}

        <p className="text-sm font-bold text-gray-900 mb-3">
          ${item.price}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
          {/* Quantité */}
          <div className="flex items-center gap-1">
            <span>Qté :</span>
            <select
              defaultValue={quantity}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
            >
              {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <span className="text-gray-300">|</span>

          <button className="hover:underline text-blue-600">
            Supprimer
          </button>

          {variant === "extended" && (
            <>
              <span className="text-gray-300">|</span>
              <button className="hover:underline text-blue-600">
                Sauvegarder pour plus tard
              </button>
            </>
          )}
        </div>
      </div>

      {/* Prix total */}
      {variant === "extended" && (
        <div className="text-right text-sm font-bold text-gray-900 min-w-[80px]">
          ${totalPrice}
        </div>
      )}
    </div>
  );
};

export default CartItem;