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
    const tl = gsap.timeline({ 
      defaults: { ease: "power2.out", force3D: true } 
    });

    // Snappier, high-performance entrance
    tl.fromTo(".aesthetic-header", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.3 }
    )
    .fromTo(".aesthetic-card", 
      { y: 30, opacity: 0, scale: 0.99 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1 },
      "-=0.4"
    );

    // Ultra-subtle drift with hardware acceleration
    gsap.to(".aesthetic-card", {
      y: "random(-4, 4)",
      duration: "random(4, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      force3D: true
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
      // Auto-unlock with a restored profile if none exists
      if (!useStore.getState().userProfile) {
        setProfile({ name: "Restored User", email: "local@flux.os", photo: "" });
      }
      alert("Intelligence restored successfully. Redirecting to your dashboard.");
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

        {/* Sexy Modern Main Card - Sharper Glassmorphism */}
        <div className="aesthetic-card relative w-full max-w-lg group px-4">
          <div className="p-10 md:p-12 rounded-2xl bg-white/70 dark:bg-stone-950/80 border border-white dark:border-stone-800/20 backdrop-blur-[120px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-all relative ring-1 ring-black/5">
            
            {/* Sexy Amber Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-80" />
            
            <header className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2 tracking-tighter">Sign In</h2>
              <p className="text-stone-400 dark:text-stone-500 text-xs font-bold uppercase tracking-[0.3em]">Access local intelligence</p>
            </header>

            <form onSubmit={handleStart} className="flex flex-col gap-8">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 bg-stone-50/30 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white dark:focus:bg-stone-900 text-stone-800 dark:text-white transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="Satoshi Nakamoto" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-stone-50/30 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 rounded-xl focus:outline-none focus:border-orange-500/50 focus:bg-white dark:focus:bg-stone-900 text-stone-800 dark:text-white transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="local@flux.os" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-stone-400 dark:text-stone-600 uppercase tracking-[0.2em] ml-1">Avatar / Identity Signature</label>
                  <div className="flex gap-3">
                    <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} className="flex-1 p-4 bg-stone-50/30 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 rounded-xl focus:outline-none focus:border-orange-500/50 text-stone-800 dark:text-white truncate transition-all text-sm font-medium placeholder-stone-300 dark:placeholder-stone-700 shadow-sm" placeholder="Image URL..." />
                    <label className="cursor-pointer p-4 bg-stone-100/60 dark:bg-stone-800/60 rounded-xl border border-stone-200/50 dark:border-stone-800/50 transition-all flex items-center justify-center hover:bg-orange-500 hover:text-white dark:hover:bg-orange-600 shadow-sm">
                      <ImageIcon className="w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full mt-2 flex items-center justify-center gap-3 p-5 bg-stone-900 dark:bg-orange-600 text-white font-bold text-sm rounded-xl active:scale-[0.98] transition-all hover:shadow-2xl hover:shadow-orange-500/30 tracking-tight">
                Enter Dashboard <ArrowRight className="w-4 h-4" />
              </button>

              {lastProfile ? (
                <button type="button" onClick={() => setProfile(lastProfile)} className="w-full py-4 text-[10px] font-bold text-stone-400 dark:text-stone-500 hover:text-orange-500 transition-colors tracking-[0.3em] uppercase border-t border-stone-100 dark:border-stone-800/50 mt-2">
                  RESUME: {lastProfile.name.split(' ')[0]}
                </button>
              ) : (
                <div className="flex justify-center border-t border-stone-100 dark:border-stone-800/50 pt-6 mt-2">
                   <label className="cursor-pointer flex items-center gap-2 group">
                      <Download className="w-3.5 h-3.5 text-stone-400 group-hover:text-orange-500 transition-colors" />
                      <span className="text-[10px] font-bold text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 uppercase tracking-widest transition-colors">Restore from CSV</span>
                      <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                    </label>
                </div>
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
