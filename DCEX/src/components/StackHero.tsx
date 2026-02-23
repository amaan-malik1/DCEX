import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      gsap.from(cards, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 150,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.2,
      });

      // Subtle floating motion
      gsap.to(cards, {
        y: "+=10",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.2,
          from: "center",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[900px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-100 to-white"
    >
      {/* Background blur glow */}
      <div className="absolute w-[800px] h-[800px] bg-blue-300/30 rounded-full blur-[120px] top-[-200px]" />

      <div className="relative perspective-[1200px]">
        {/* Card 1 */}
        <div
          className="stack-card absolute w-[650px] h-[260px] bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex items-center px-10"
          style={{
            transform: "translateY(0px) scale(1)",
            zIndex: 3,
          }}
        >
          <h2 className="text-2xl font-semibold">TipLink Pro</h2>
        </div>

        {/* Card 2 */}
        <div
          className="stack-card absolute w-[650px] h-[260px] bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.12)] flex items-center px-10"
          style={{
            transform: "translateY(40px) scale(0.96)",
            zIndex: 2,
          }}
        >
          <h2 className="text-2xl font-semibold">TipLink Wallet</h2>
        </div>

        {/* Card 3 */}
        <div
          className="stack-card absolute w-[650px] h-[260px] bg-white/60 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.10)] flex items-center px-10"
          style={{
            transform: "translateY(80px) scale(0.92)",
            zIndex: 1,
          }}
        >
          <h2 className="text-2xl font-semibold">TipLink Wallet Adapter</h2>
        </div>
      </div>
    </section>
  );
}
