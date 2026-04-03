import { useEffect, useState } from "react";
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
  const { userProfile, activeTab, setActiveTab, isExpanded, toggleSidebar, role, toggleRole, needAdminAction } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

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
      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
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
      className={`h-screen bg-stone-50 dark:bg-stone-950 shadow-md flex flex-col relative transition-all duration-300 ease-in-out z-40 border-r border-transparent dark:border-stone-800 ${isExpanded ? "w-64" : "w-20"
        }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute -right-3.5 top-8 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 shadow-[0_3px_10px_rgb(0,0,0,0.1)] ring-4 ring-[#F5F7F9] dark:ring-stone-900 hover:text-orange-600 dark:hover:text-orange-400 hover:scale-110 transition-all duration-300 focus:outline-none"
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-500 ${!isExpanded ? "rotate-180" : ""}`} />
      </button>

      <div id="logo" className="flex items-center gap-3 w-full px-6 py-5 border-b border-stone-200 dark:border-stone-800 overflow-hidden shrink-0">
        <div className="bg-orange-600 rounded-xl p-2 shrink-0 shadow-sm flex items-center justify-center">
          <WalletCards className="h-5 w-5 text-white" />
        </div>
        <span className={`font-extrabold tracking-tight text-xl text-stone-900 dark:text-white whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden"}`}>
          Flux
        </span>
      </div>

      <div id="searchbar" className={`transition-all duration-300 overflow-hidden ${isExpanded ? "mt-2 px-4 max-h-16 opacity-100" : "mt-0 px-4 max-h-0 opacity-0 pointer-events-none"}`}>
        <div className="border border-stone-200 dark:border-stone-700 rounded-lg p-2 flex gap-2 items-center shadow-sm bg-white dark:bg-stone-800">
          <Search className="h-4 w-4 text-stone-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none w-full bg-transparent text-stone-600 dark:text-stone-300 text-sm font-medium"
            tabIndex={isExpanded ? 0 : -1}
          />
        </div>
      </div>

      <div id="sideBtns" className={`flex flex-col gap-2 w-full px-4 py-2 ${isExpanded ? "mt-4" : "mt-6"} transition-all duration-300`}>
        {menuItems.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => {
          const Icon = item.Icon;
          const isActive = activeTab === item.label;

          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.label)}
              title={!isExpanded ? item.label : ""}
              className={`relative flex items-center text-sm text-left py-2.5 rounded-lg font-semibold transition-all duration-200 ${isExpanded ? "px-3 gap-3" : "justify-center px-0"} ${isActive
                ? "bg-white dark:bg-orange-900/20 text-orange-900 dark:text-orange-400 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
            >
              {isActive && <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 h-5 w-1.5 bg-orange-900 dark:bg-orange-500 rounded-full"></div>}
              <Icon className="h-5 w-5 shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className={`mt-auto w-full transition-all duration-300 pb-4 flex flex-col gap-2 ${isExpanded ? "px-4" : "px-3"}`}>
        <div className="relative group w-full">
          {needAdminAction && (
            <div className={`absolute z-50 bg-red-500 text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-[bounce_1s_infinite] ${isExpanded ? "-top-12 left-1/2 -translate-x-1/2" : "top-1/2 -translate-y-1/2 left-[100%] ml-4"}`}>
              Switch to Admin for changes
              <div className={`absolute border-[6px] border-transparent ${isExpanded ? "top-full left-1/2 -translate-x-1/2 border-t-red-500" : "right-full top-1/2 -translate-y-1/2 border-r-red-500"}`}></div>
            </div>
          )}
          <button
            onClick={toggleRole}
            title={`Switch to ${role === 'user' ? 'Admin' : 'User'} View`}
            className={`group w-full bg-white dark:bg-stone-800 rounded-xl shadow-sm border ${needAdminAction ? 'border-red-500 ring-2 ring-red-500' : 'border-stone-200 dark:border-stone-700 hover:border-orange-200 dark:hover:border-stone-600'} flex items-center transition-all duration-300 hover:bg-stone-50 dark:hover:bg-stone-700 relative overflow-hidden ${isExpanded ? "p-3 gap-2" : "p-2 justify-center"}`}
          >
          <div className="relative shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-stone-200 dark:bg-stone-700 ring-1 ring-stone-200 dark:ring-stone-700 text-stone-600 dark:text-stone-300 font-bold overflow-hidden">
            {currentProfile.avatar ? (
              <img key={role} src={currentProfile.avatar} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <span>{currentProfile.initials}</span>
            )}
            {role === 'admin' && (
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-stone-900 rounded-full p-0.5">
                <ShieldCheck className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            )}
          </div>

          <div className={`flex flex-col text-left transition-all duration-300 ${isExpanded ? "opacity-100 flex-1 min-w-0" : "opacity-0 w-0 hidden"}`}>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm text-stone-800 dark:text-white truncate">{currentProfile.name}</span>
              <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${currentProfile.badgeColor}`}>
                {role.toUpperCase()}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 truncate">{currentProfile.email}</span>
          </div>

          {isExpanded && (
            <div className="shrink-0 text-stone-400 dark:text-stone-500 opacity-0 group-hover:opacity-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-all duration-300">
              <RefreshCw className={`h-4 w-4 ${needAdminAction ? 'text-red-500 animate-spin' : ''}`} />
            </div>
          )}
          </button>
        </div>

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