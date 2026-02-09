/**
 * Composant de chargement
 */
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-amazon-blue border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 border-2 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Chargement en cours...</p>
    </div>
  );
};

export default Loading;
