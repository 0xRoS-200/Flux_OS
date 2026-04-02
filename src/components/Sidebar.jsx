import { useEffect } from "react";
import logo from "../assets/zoro.png";
import {
  LayoutDashboard, Search, HandCoins, ArrowRightLeft,
  Gem, Wallet, SquareActivity, ChevronLeft, RefreshCw, ShieldCheck, WalletCards, LogOut
} from "lucide-react";
import { useStore } from "../store/useStore";

const menuItems = [
  { label: "Dashboard", Icon: LayoutDashboard },
  { label: "Transactions", Icon: ArrowRightLeft },
  { label: "Analytics", Icon: SquareActivity },
];

export default function Sidebar() {
  const { userProfile, activeTab, setActiveTab, isExpanded, toggleSidebar, role, toggleRole } = useStore();

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ").filter(Boolean);
    if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const currentProfile = {
    name: userProfile?.name || "User",
    email: userProfile?.email || "user@example.com",
    avatar: userProfile?.photo || "",
    initials: getInitials(userProfile?.name),
    badgeColor: role === 'admin'
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        useStore.setState({ isExpanded: false });
      } else {
        useStore.setState({ isExpanded: true });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      id="sidebar"
      className={`h-screen bg-zinc-50 dark:bg-zinc-950 shadow-md flex flex-col relative transition-all duration-300 ease-in-out z-40 border-r border-transparent dark:border-zinc-800 ${isExpanded ? "w-64" : "w-20"
        }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3.5 top-8 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-slate-800 text-zinc-500 dark:text-zinc-400 shadow-[0_3px_10px_rgb(0,0,0,0.1)] ring-4 ring-[#F5F7F9] dark:ring-slate-900 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 transition-all duration-300 focus:outline-none"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-500 ${!isExpanded ? "rotate-180" : ""}`} />
      </button>

      <div id="logo" className="flex items-center gap-3 w-full px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden shrink-0">
        <div className="bg-blue-600 rounded-xl p-2 shrink-0 shadow-sm flex items-center justify-center">
          <WalletCards className="h-5 w-5 text-white" />
        </div>
        <span className={`font-extrabold tracking-tight text-xl text-zinc-900 dark:text-white whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>
          Flux
        </span>
      </div>

      <div id="searchbar" className={`transition-all duration-300 overflow-hidden ${isExpanded ? "mt-2 px-4 max-h-16 opacity-100" : "mt-0 px-4 max-h-0 opacity-0 pointer-events-none"}`}>
        <div className="border border-zinc-200 dark:border-slate-700 rounded-lg p-2 flex gap-2 items-center shadow-sm bg-white dark:bg-slate-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none w-full bg-transparent text-zinc-600 dark:text-zinc-300 text-sm font-medium"
            tabIndex={isExpanded ? 0 : -1}
          />
        </div>
      </div>

      <div id="sideBtns" className={`flex flex-col gap-2 w-full px-4 py-2 ${isExpanded ? "mt-4" : "mt-6"} transition-all duration-300`}>
        {menuItems.map((item, index) => {
          const Icon = item.Icon;
          const isActive = activeTab === item.label;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.label)}
              title={!isExpanded ? item.label : ""}
              className={`relative flex items-center text-sm text-left py-2.5 rounded-lg font-semibold transition-all duration-200 ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${isActive
                ? "bg-white dark:bg-blue-900/20 text-blue-900 dark:text-blue-400 shadow-sm"
                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-slate-800 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
            >
              {isActive && <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 h-5 w-1.5 bg-blue-900 dark:bg-blue-500 rounded-full"></div>}
              <Icon className="h-5 w-5 shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className={`mt-auto w-full transition-all duration-300 pb-4 flex flex-col gap-2 ${isExpanded ? "px-4" : "px-3"}`}>
        <button
          onClick={toggleRole}
          title={`Switch to ${role === 'user' ? 'Admin' : 'User'} View`}
          className={`group w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-zinc-200 dark:border-slate-700 flex items-center transition-all duration-300 hover:bg-zinc-50 dark:hover:bg-slate-700 hover:border-blue-200 dark:hover:border-slate-600 relative overflow-hidden ${isExpanded ? "p-3 gap-2" : "p-2 justify-center"}`}
        >
          <div className="relative shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-zinc-200 dark:bg-slate-700 ring-1 ring-zinc-200 dark:ring-slate-700 text-zinc-600 dark:text-zinc-300 font-bold overflow-hidden">
            {currentProfile.avatar ? (
              <img key={role} src={currentProfile.avatar} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span>{currentProfile.initials}</span>
            )}
            {role === 'admin' && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-0.5">
                <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}
          </div>

          <div className={`flex flex-col text-left transition-all duration-300 ${isExpanded ? "opacity-100 flex-1 min-w-0" : "opacity-0 w-0 hidden"}`}>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-gray-800 dark:text-white truncate">{currentProfile.name}</span>
              <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${currentProfile.badgeColor}`}>
                {role.toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{currentProfile.email}</span>
          </div>

          {isExpanded && (
            <div className="shrink-0 text-zinc-400 dark:text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-all duration-300">
              <RefreshCw className="h-4 w-4" />
            </div>
          )}
        </button>

        <button
          onClick={() => useStore.getState().clearProfile()}
          title="Sign Out"
          className={`flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900/50 ${isExpanded ? "p-3 gap-3" : "p-2.5"}`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 min-w-0" : "opacity-0 w-0 hidden"}`}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}