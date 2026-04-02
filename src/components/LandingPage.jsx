import React, { useState, useRef } from "react";
import { useStore } from "../store/useStore";
import { ArrowRight, WalletCards, ShieldCheck, Zap, Download, Image as ImageIcon, Sparkles } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ShaderBackground from "./ShaderBackground";

export default function LandingPage() {
  const setProfile = useStore(state => state.setProfile);
  const lastProfile = useStore(state => state.lastProfile);
  const importTransactions = useStore(state => state.importTransactions);
  const containerRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Balanced, centered entrance
    tl.fromTo(".aesthetic-header", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
    )
    .fromTo(".aesthetic-card", 
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15 },
      "-=0.6"
    );

    // Soft floating effect for the cards
    gsap.to(".aesthetic-card", {
      y: "random(-6, 6)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  const handleStart = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setProfile({ name, email, photo });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      importTransactions(evt.target.result);
      alert("Welcome back! Your data has been restored.");
    };
    reader.readAsText(file);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => setPhoto(evt.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden selection:bg-sky-500/20">
      <ShaderBackground />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-16 text-center">
        
        {/* Aesthetic Header Section */}
        <div className="aesthetic-header flex flex-col items-center gap-6">
          <div className="aesthetic-card flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-black/20 border border-white/60 dark:border-white/10 rounded-full backdrop-blur-md shadow-sm transition-transform hover:scale-105">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest">Flux Intelligence v1.0</span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-stone-200 leading-tight tracking-tight">
              Manage Wealth <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Beautifully.</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-slate-500 dark:text-stone-400 font-medium leading-relaxed">
              Experience a private, local-first finance engine designed for simplicity. Your data is encrypted, secure, and stays entirely on your device.
            </p>
          </div>
        </div>

        {/* Aesthetic Main Card - Centered Glassmorphism */}
        <div className="aesthetic-card relative w-full max-w-xl group px-4">
          <div className="p-8 md:p-14 rounded-[3.5rem] bg-white/60 dark:bg-stone-900/60 border border-white dark:border-stone-800/10 backdrop-blur-[120px] shadow-[0_30px_90px_rgba(249,115,22,0.08)] dark:shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden transition-all hover:bg-white/70 dark:hover:bg-stone-900/70 relative ring-1 ring-white/10">
            
            {/* Edge Glow Effect - Sunlight / Ember */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/30 dark:via-orange-500/20 to-transparent" />
            
            <header className="mb-12">
              <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tight">Get Started</h2>
              <p className="text-stone-500 dark:text-stone-500 text-sm font-medium">Create your secure local profile to continue</p>
            </header>

            <form onSubmit={handleStart} className="flex flex-col gap-8 text-left">
              <div className="space-y-7">
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] ml-1">Identity</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="e.g. Satoshi Nakamoto" />
                </div>

                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em] ml-1">Communication</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 focus:bg-white dark:focus:bg-stone-800 text-stone-800 dark:text-stone-200 transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="hello@flux.com" />
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex justify-between items-center mb-1 px-1">
                    <label className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-[0.2em]">Signature Profile</label>
                  </div>
                  <div className="flex gap-4">
                    <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} className="flex-1 p-5 bg-stone-50/40 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/50 rounded-2xl focus:outline-none focus:border-orange-400 text-stone-800 dark:text-stone-200 truncate transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="Avatar URL..." />
                    <label className="cursor-pointer p-5 bg-stone-100/60 hover:bg-white dark:bg-stone-800/60 dark:hover:bg-stone-700/80 rounded-2xl border border-stone-200/60 dark:border-stone-700/50 transition-all flex items-center justify-center shadow-sm">
                      <ImageIcon className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-4 flex items-center justify-center gap-4 p-6 bg-stone-900 dark:bg-orange-600 text-white font-bold text-sm rounded-[2rem] active:scale-[0.98] transition-all hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1">
                Launch Intelligence Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              {lastProfile && (
                <button type="button" onClick={() => setProfile(lastProfile)} className="w-full py-5 text-[10px] font-bold text-stone-400 dark:text-stone-500 hover:text-orange-500 transition-colors tracking-[0.2em] uppercase border-t border-stone-100 dark:border-stone-800/50 mt-4">
                  RE-ACCESS: {lastProfile.name.split(' ')[0]}
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Aesthetic Secondary Content - Horizontal Feature Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="aesthetic-card p-6 rounded-[2rem] bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl flex flex-col items-center gap-4 transition-all hover:bg-white/40 hover:scale-105">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-slate-800 dark:text-stone-200 font-bold text-sm">Encrypted</h3>
          </div>
          <div className="aesthetic-card p-6 rounded-[2rem] bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl flex flex-col items-center gap-4 transition-all hover:bg-white/40 hover:scale-105">
            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-slate-800 dark:text-stone-200 font-bold text-sm">Offline</h3>
          </div>
          <div className="aesthetic-card p-6 rounded-[2rem] bg-white/20 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-xl flex flex-col items-center gap-4 transition-all hover:bg-white/40 hover:scale-105 group cursor-pointer overflow-hidden">
            <label className="cursor-pointer flex flex-col items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-500/10 text-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-slate-800 dark:text-stone-200 font-bold text-sm">Restore</h3>
              <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
