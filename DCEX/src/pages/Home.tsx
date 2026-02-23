import { Hero } from "../components/Hero";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 via-gray-50 to-white">
      {/* Top glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-300/20 rounded-full blur-[140px]" />

      {/* Secondary soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
