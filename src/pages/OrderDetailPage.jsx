import React, { useState } from "react";

const STATUS_STEPS = [
  "Confirmée",
  "En préparation",
  "Expédiée",
  "Livrée",
];

const OrderDetailPage = () => {
  const [order] = useState({
    id: "CMD-2024-00123",
    date: "05/02/2026",
    status: "Expédiée",
    trackingNumber: "FR123456789",
    address: {
      name: "Jean Dupont",
      street: "12 rue de Paris",
      city: "75001 Paris",
      country: "France",
    },
    paymentMethod: "Carte bancaire (**** 4242)",
    products: [
      { id: 1, name: "Casque Bluetooth", price: 89.99, quantity: 1 },
      { id: 2, name: "Souris Gaming", price: 49.99, quantity: 2 },
    ],
    subtotal: 189.97,
    shipping: 5.99,
    total: 195.96,
    history: [
      { status: "Confirmée", date: "05/02/2026 10:15" },
      { status: "En préparation", date: "05/02/2026 14:30" },
      { status: "Expédiée", date: "06/02/2026 09:00" },
    ],
  });

  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Détails de la commande</h1>

      {/* Informations commande */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Informations commande</h2>
        <p><strong>Numéro :</strong> {order.id}</p>
        <p><strong>Date :</strong> {order.date}</p>
        <p><strong>Statut :</strong> <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
      </section>

      {/* Statuts visuels */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Suivi de statut</h2>
        <div className="flex space-x-4 mt-4">
          {STATUS_STEPS.map((step, index) => (
            <div
              key={step}
              className={`px-4 py-2 rounded-full text-center ${index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {step}
            </div>
          ))}
        </div>
      </section>

      {/* Adresse */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Adresse de livraison</h2>
        <p>{order.address.name}</p>
        <p>{order.address.street}</p>
        <p>{order.address.city}</p>
        <p>{order.address.country}</p>
      </section>

      {/* Paiement */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Méthode de paiement</h2>
        <p>{order.paymentMethod}</p>
      </section>

      {/* Produits */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Produits commandés</h2>
        <ul className="space-y-2 mt-4">
          {order.products.map((product) => (
            <li key={product.id} className="flex justify-between">
              <span>{product.name} x {product.quantity}</span>
              <span>{(product.price * product.quantity).toFixed(2)} €</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Résumé */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Résumé financier</h2>
        <p>Sous-total : {order.subtotal.toFixed(2)} €</p>
        <p>Livraison : {order.shipping.toFixed(2)} €</p>
        <p className="font-semibold text-lg">Total : {order.total.toFixed(2)} €</p>
      </section>

      {/* Historique */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Historique des statuts</h2>
        <ul className="space-y-2 mt-4">
          {order.history.map((item, index) => (
            <li key={index} className="flex justify-between">
              <strong>{item.status}</strong> – {item.date}
            </li>
          ))}
        </ul>
      </section>

      {/* Suivi */}
      {order.status === "Expédiée" && (
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">Suivi de livraison</h2>
          <p><strong>Numéro de suivi :</strong> {order.trackingNumber}</p>
          <TrackingSimulator />
        </section>
      )}

      {/* Actions */}
      <section className="flex space-x-4 mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">📄 Télécharger la facture</button>
        <button
          disabled={order.status !== "Confirmée"}
          className={`px-6 py-2 rounded-lg ${order.status !== "Confirmée" ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
        >
          ❌ Annuler la commande
        </button>
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600">💬 Contacter le support</button>
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">🔁 Commander à nouveau</button>
      </section>
    </div>
  );
};

/* Simulateur de suivi */
const TrackingSimulator = () => {
  const [progress, setProgress] = useState(60);

  return (
    <div className="mt-4">
      <p>Avancement estimé :</p>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="w-full"
      />
      <p className="text-center">{progress}% livré</p>
    </div>
  );
};

export default OrderDetailPage;
