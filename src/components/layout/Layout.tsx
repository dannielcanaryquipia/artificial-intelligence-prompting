import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";
import { ScrollTop } from "@/components/ScrollTop";

interface NavContextType {
  openMobileNav: () => void;
}

export const NavContext = createContext<NavContextType>({
  openMobileNav: () => {},
});

export function useNavContext() {
  return useContext(NavContext);
}

export function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <NavContext.Provider value={{ openMobileNav: () => setIsMobileOpen(true) }}>
      <div className="min-h-screen flex flex-col">
        <ScrollTop />
        <Navbar onMenuClick={() => setIsMobileOpen(true)} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* MobileNav rendered OUTSIDE the header to avoid backdrop-blur stacking context trap */}
      <MobileNav isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
    </NavContext.Provider>
  );
}
