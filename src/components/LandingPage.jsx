import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { ArrowRight, Download, Image as ImageIcon } from "lucide-react";

export default function LandingPage() {
  const setProfile = useStore(state => state.setProfile);
  const lastProfile = useStore(state => state.lastProfile);
  const importTransactions = useStore(state => state.importTransactions);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#fdfcfd] dark:bg-[#0e0c08] selection:bg-sky-500/20">
      
      {/* Subtle Static Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 via-transparent to-sky-500/5 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg flex flex-col gap-8 items-center">
        {/* Brand Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-stone-900 dark:text-stone-100 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white text-lg">F</span>
            </span>
            Flux Payments
          </h1>
        </div>

        {/* Main Sign In Card */}
        <div className="w-full p-10 md:p-12 rounded-2xl bg-white/70 dark:bg-stone-950/80 border border-white dark:border-stone-800/20 backdrop-blur-[120px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] dark:shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden transition-all relative ring-1 ring-black/5">
          
          {/* Accent Line */}
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
    </div>
  );
}
