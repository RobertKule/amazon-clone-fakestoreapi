import { useEffect, useState } from "react";
import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import ReviewSection from "../components/products/ReviewSection";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/1")
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="p-6">Chargement du produit...</p>;

  if (!product)
    return <p className="p-6">Produit introuvable.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
      <div className="md:col-span-2">
        <ReviewSection />
      </div>
    </div>
  );
};

export default ProductDetail;
