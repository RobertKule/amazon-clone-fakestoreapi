import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      title: "Fjallraven Backpack - Fits 15 Laptops",
      description:
        "Your perfect pack for everyday use and walks in the forest.",
      price: 109.95,
      quantity: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Panier
      </h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            variant="extended"
          />
        ))}
      </div>

      {/* Résumé */}
      <div className="mt-6 text-right text-lg font-semibold">
        Sous-total ({cartItems.length} article) :{" "}
        <span className="font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Cart;