import { useState } from "react";

const ProductGallery = ({ product }) => {
  const [zoom, setZoom] = useState(false);

  return (
    <div className="border bg-white p-4 rounded">
      <img
        src={product.image}
        alt={product.title}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        className={`mx-auto transition-transform duration-300 object-contain
          ${zoom ? "scale-110" : "scale-100"}
          h-80`}
      />
    </div>
  );
};

export default ProductGallery;