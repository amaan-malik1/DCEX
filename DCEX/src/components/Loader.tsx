const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-400 text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
