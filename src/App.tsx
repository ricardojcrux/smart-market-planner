import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Planner from "./pages/Planner";
import Settings from "./pages/Settings";
import {
  LayoutDashboard,
  History as HistoryIcon,
  ShoppingCart,
  Menu,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "./components/ui/button";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center px-4 justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-lg hidden sm:inline-block">
              Smart Market
            </span>
          </Link>

          {!isHome && (
            <div className="hidden md:flex gap-6 text-sm font-medium ml-4">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                  location.pathname === "/dashboard"
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <Link
                to="/planner"
                className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                  location.pathname === "/planner"
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                <ShoppingCart className="h-4 w-4" /> Planificador
              </Link>
              <Link
                to="/history"
                className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                  location.pathname === "/history"
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                <HistoryIcon className="h-4 w-4" /> Historial
              </Link>
              <Link
                to="/settings"
                className={`flex items-center gap-2 transition-colors hover:text-foreground/80 ${
                  location.pathname === "/settings"
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
              >
                <SettingsIcon className="h-4 w-4" /> Configuración
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isHome ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </>
          ) : (
            <div className="md:hidden">
              {/* Mobile Menu Trigger - simplified */}
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

function MainContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <main className={isHome ? "" : "w-full max-w-screen-xl mx-auto py-6 px-4"}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <MainContent />
      </div>
    </Router>
  );
}

export default App;
