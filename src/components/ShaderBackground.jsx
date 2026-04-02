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
        scale: "random(1.4, 2.0)",
        rotation: "random(-30, 30)",
        duration: "random(50, 80)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 3,
      });
    });

    // Subtle grain animation
    gsap.to("#baseFrequency", {
      attr: { baseFrequency: 0.012 },
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 bg-[#fdfcfd] dark:bg-[#0e0c08] transition-colors duration-1000"
    >
      {/* SVG Filter for Pure Watercolor Diffusion */}
      <svg className="hidden">
        <defs>
          <filter id="liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="130" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -9"
              result="liquid"
            />
          </filter>
          
          <filter id="noise">
            <feTurbulence id="baseFrequency" type="fractalNoise" baseFrequency="0.01" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.04" />
            </feComponentTransfer>
            <feBlend mode="overlay" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Airy Blob Container */}
      <div className="blob-container absolute inset-0 opacity-40 dark:opacity-60 mix-blend-multiply dark:mix-blend-screen" style={{ filter: "url(#liquid)" }}>
        {/* Soft Rose / Deep Amber */}
        <div className="blob absolute top-[10%] left-[10%] w-[50vw] h-[50vw] bg-rose-400/30 dark:bg-orange-600/40 rounded-full" />
        
        {/* Sky Blue / Bright Orange */}
        <div className="blob absolute top-[5%] right-[10%] w-[55vw] h-[55vw] bg-sky-400/25 dark:bg-amber-500/30 rounded-full" />
        
        {/* Soft Mint / Warm Gold */}
        <div className="blob absolute bottom-[10%] left-[5%] w-[60vw] h-[60vw] bg-emerald-300/20 dark:bg-yellow-600/20 rounded-full" />
        
        {/* Soft Lavender / Ember */}
        <div className="blob absolute bottom-[5%] right-[5%] w-[45vw] h-[45vw] bg-indigo-300/25 dark:bg-orange-800/20 rounded-full" />
      </div>

      {/* Refined Grain Texture */}
      <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.15] pointer-events-none mix-blend-overlay" style={{ filter: "url(#noise)" }} />

      {/* Brightness Balance Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20 dark:from-orange-900/5 dark:via-transparent dark:to-orange-900/5" />
    </div>
  );
}
