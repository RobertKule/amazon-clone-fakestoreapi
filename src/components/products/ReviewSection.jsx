const ReviewSection = () => {
  const reviews = [
    { id: 1, user: "Alice", text: "Très bon produit !" },
    { id: 2, user: "Marc", text: "Bonne qualité." },
  ];

  return (
    <div className="bg-white border rounded p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">
        Avis clients
      </h2>

      {reviews.map(r => (
        <div key={r.id} className="mb-3">
          <p className="font-medium">{r.user}</p>
          <p className="text-gray-600 text-sm">{r.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;