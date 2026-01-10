import React, { useState } from "react";
import { Home, Calendar, History, TrendingUp } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 pb-20 p-4">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="flex justify-around items-center h-16">
          <NavItem
            icon={<Home size={24} />}
            label="Inicio"
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />
          <NavItem
            icon={<Calendar size={24} />}
            label="Planear"
            isActive={activeTab === "plan"}
            onClick={() => setActiveTab("plan")}
          />
          <NavItem
            icon={<History size={24} />}
            label="Historial"
            isActive={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
          <NavItem
            icon={<TrendingUp size={24} />}
            label="Predicción"
            isActive={activeTab === "prediction"}
            onClick={() => setActiveTab("prediction")}
          />
        </div>
      </nav>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
        isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
      }`}
    >
      <div
        className={`transition-transform duration-200 ${
          isActive ? "scale-110" : "scale-100"
        }`}
      >
        {icon}
      </div>
      <span className="text-[10px] font-medium mt-1">{label}</span>
    </button>
  );
}
