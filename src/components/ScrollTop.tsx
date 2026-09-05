import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previousScrollBehavior;
  }, [pathname]);

  return null;
}