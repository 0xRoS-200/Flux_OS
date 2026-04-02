import React, { useState, useRef } from "react";
import { useStore } from "../store/useStore";
import { Upload, ArrowRight, WalletCards, ShieldCheck, Zap, Download, Image as ImageIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function LandingPage() {
    const setProfile = useStore(state => state.setProfile);
    const lastProfile = useStore(state => state.lastProfile);
    const importTransactions = useStore(state => state.importTransactions);
    const containerRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.fromTo(".bg-shape",
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, stagger: 0.3 }
        )
            .fromTo(".hero-title span",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
                "-=1.5"
            )
            .fromTo(".hero-item",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
                "-=1.0"
            )
            .fromTo(".hero-card",
                { scale: 0.95, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 1, ease: "expo.out" },
                "-=0.8"
            );

        gsap.to(".bg-shape-1", {
            y: -30, x: 20, rotation: 10,
            duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut"
        });
        gsap.to(".bg-shape-2", {
            y: 40, x: -30, rotation: -15,
            duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
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
            alert("Transactions successfully restored! Please complete your profile to access your dashboard.");
        };
        reader.readAsText(file);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
            setPhoto(evt.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div ref={containerRef} className="relative min-h-screen bg-slate-50 dark:bg-[#030712] overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 transition-colors duration-500">

            <div className="bg-shape bg-shape-1 absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500" />
            <div className="bg-shape bg-shape-2 absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500" />

            <div className="relative z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                <div className="lg:col-span-7 flex flex-col gap-8">
                    <div className="hero-item flex items-center gap-3 w-max px-4 py-2 bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-full backdrop-blur-md">
                        <WalletCards className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-bold text-blue-900 dark:text-blue-100 tracking-wide uppercase">Flux Payments OS</span>
                    </div>

                    <h1 className="hero-title text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                        <span className="block">Take Control of</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Your Wealth.</span>
                    </h1>

                    <p className="hero-item text-slate-600 dark:text-zinc-400 text-xl leading-relaxed max-w-2xl font-medium dark:font-light">
                        A beautiful, blazing-fast, and entirely local personal finance engine. Your data never leaves your device. No cloud. No subscriptions. Completely yours.
                    </p>

                    <div className="hero-item grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                        <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
                            <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            <h3 className="text-slate-900 dark:text-white font-bold">100% Local</h3>
                            <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium dark:font-normal">Offline-first standard via IndexedDB persistent cache.</p>
                        </div>
                        <div className="flex flex-col gap-2 p-5 rounded-2xl bg-white/60 dark:bg-zinc-900/40 border border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm dark:shadow-none">
                            <Zap className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                            <h3 className="text-slate-900 dark:text-white font-bold">PWA Ready</h3>
                            <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium dark:font-normal">Install locally without App Store bloat. Blazing fast.</p>
                        </div>
                    </div>

                    <div className="hero-item mt-6 p-6 bg-white/80 dark:bg-zinc-900/50 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 rounded-3xl flex flex-col sm:flex-row items-center gap-6 justify-between group hover:border-blue-300 dark:hover:border-blue-500/30 transition-all duration-300 shadow-md dark:shadow-none">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-100 dark:bg-zinc-800 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                                <Download className="h-6 w-6 text-slate-500 dark:text-zinc-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-zinc-100 font-bold mb-1">Recovering lost data?</h4>
                                <p className="text-sm text-slate-500 dark:text-zinc-500 max-w-xs font-medium dark:font-normal">Upload your previously exported transaction backup CSV.</p>
                            </div>
                        </div>
                        <label className="shrink-0 cursor-pointer bg-slate-900 dark:bg-white text-white dark:text-zinc-900 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:scale-105 active:scale-95">
                            Upload Backup
                            <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
                        </label>
                    </div>
                </div>

                <div className="lg:col-span-5 hero-card">
                    <div className="bg-white/90 dark:bg-zinc-900/80 backdrop-blur-3xl border border-slate-200 dark:border-zinc-800/80 rounded-[2.5rem] p-8 shadow-2xl dark:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Initialize Local Profile</h2>
                        <p className="text-slate-500 dark:text-zinc-400 text-sm mb-8 font-medium dark:font-normal">Setup your encrypted native dashboard.</p>

                        <form onSubmit={handleStart} className="flex flex-col gap-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300 block mb-1.5">Full Name</label>
                                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white transition-all text-sm shadow-inner font-medium placeholder-slate-400 dark:placeholder-zinc-600" placeholder="Jessica Alba" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300 block mb-1.5">Email Address</label>
                                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white transition-all text-sm shadow-inner font-medium placeholder-slate-400 dark:placeholder-zinc-600" placeholder="jessica@example.com" />
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 dark:text-zinc-300 block mb-1.5">Profile Photo <span className="text-slate-400 dark:text-zinc-600 font-normal">(Optional)</span></label>
                                <div className="flex gap-2">
                                    <input type="text" value={photo} onChange={e => setPhoto(e.target.value)} className="w-full flex-1 p-4 bg-slate-50 dark:bg-zinc-950/50 border border-slate-200 dark:border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-900 dark:text-white transition-all text-sm shadow-inner overflow-hidden text-ellipsis whitespace-nowrap font-medium placeholder-slate-400 dark:placeholder-zinc-600" placeholder="https://example.com/avatar.jpg" />
                                    <label className="cursor-pointer shrink-0 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 flex items-center justify-center px-5 rounded-2xl border border-slate-200 dark:border-zinc-700 transition-colors shadow-sm" title="Upload Local JPG">
                                        <ImageIcon className="h-5 w-5" />
                                        <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handlePhotoUpload} />
                                    </label>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-zinc-500 mt-2 font-semibold dark:font-medium">Link a URL or upload a JPG to set your avatar. Leave blank for initials.</p>
                            </div>

                            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-4 rounded-2xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 shadow-lg dark:shadow-none">
                                Launch Dashboard <ArrowRight className="h-5 w-5" />
                            </button>

                            {lastProfile && (
                                <button type="button" onClick={() => setProfile(lastProfile)} className="w-full mt-2 bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-bold py-4 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-zinc-700 shadow-sm dark:shadow-none">
                                    Rejoin as {lastProfile.name} <ArrowRight className="h-4 w-4" />
                                </button>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
