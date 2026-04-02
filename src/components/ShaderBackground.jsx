import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ShaderBackground() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const blobs = gsap.utils.toArray(".blob");

    blobs.forEach((blob, i) => {
      // Very slow, airy, meditative drift
      gsap.to(blob, {
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        scale: "random(1.4, 2.2)",
        rotation: "random(-30, 30)",
        duration: "random(40, 70)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 2,
        force3D: true // Hardware acceleration
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#fdfcfd] dark:bg-[#0e0c08] transition-colors duration-1000"
    >
      {/* Zero-Lag Blob Container (No Filters) */}
      <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.55] overflow-hidden" style={{ transform: "translateZ(0)" }}>
        {/* Soft Rose / Deep Amber - Radial Gradient Simulates Blur */}
        <div className="blob absolute top-[10%] left-[10%] w-[60vw] h-[60vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(251, 113, 133, 0.4) 0%, transparent 70%)" }} />
        <div className="blob absolute top-[10%] left-[10%] hidden dark:block w-[60vw] h-[60vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)" }} />
        
        {/* Sky Blue / Bright Orange */}
        <div className="blob absolute top-[5%] right-[10%] w-[65vw] h-[65vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 70%)" }} />
        <div className="blob absolute top-[5%] right-[10%] hidden dark:block w-[65vw] h-[65vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)" }} />
        
        {/* Soft Mint / Warm Gold */}
        <div className="blob absolute bottom-[10%] left-[5%] w-[70vw] h-[70vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(110, 231, 183, 0.25) 0%, transparent 70%)" }} />
        <div className="blob absolute bottom-[10%] left-[5%] hidden dark:block w-[70vw] h-[70vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(202, 138, 4, 0.2) 0%, transparent 70%)" }} />
        
        {/* Soft Lavender / Ember */}
        <div className="blob absolute bottom-[5%] right-[5%] w-[55vw] h-[55vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(165, 180, 252, 0.3) 0%, transparent 70%)" }} />
        <div className="blob absolute bottom-[5%] right-[5%] hidden dark:block w-[55vw] h-[55vw] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(153, 27, 27, 0.2) 0%, transparent 70%)" }} />
      </div>

      {/* High-Performance Grain Pattern (Base64 SVG Noise) */}
      <div 
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.1] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Brightness Balance Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/10 dark:from-orange-950/5 dark:via-transparent dark:to-orange-950/5" />
    </div>
  );
}
