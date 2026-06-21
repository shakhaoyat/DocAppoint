"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@/components/ui/FormKit";

const LINKS = [
  { key: "bookings", label: "My Bookings", icon: "📋" },
  { key: "profile", label: "My Profile", icon: "👤" },
];

export default function Sidebar({ active, onSelect, user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    router.push("/login");
  };

  const avatarSrc =
    user?.image || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User");

  return (
    <aside className="flex flex-col w-56 shrink-0 bg-white border-r border-gray-100 min-h-screen p-4 gap-5">
      <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3">
        <Avatar src={avatarSrc} name={user?.name} size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-800 truncate">{user?.name}</p>
          <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {LINKS.map((l) => (
          <button
            key={l.key}
            onClick={() => onSelect(l.key)}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors
              ${active === l.key
                ? "bg-blue-600 text-white font-semibold shadow-sm"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"}`}
          >
            <span>{l.icon}</span>
            {l.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          🚪 Sign out
        </button>
      </div>
    </aside>
  );
}