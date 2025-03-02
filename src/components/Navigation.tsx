import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Trading",
    url: "/trading",
  },
  {
    title: "AI Insights",
    url: "/ai-insights",
  },
  {
    title: "Portfolio",
    url: "/portfolio",
  },
];

const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-lg py-3 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="padding-x max-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/assets/svg/logo.svg" alt="Logo" className="h-8 w-8" />
          <h1 className="text-white font-bold text-[24px]">CentriTrade</h1>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 border-[0.5px] border-[#FFFFFF]/15 px-4 py-2 rounded-full backdrop-blur-md bg-[#FFFFFF]/10">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`text-white font-medium px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-white/10 ${
                  location.pathname === link.url
                    ? "bg-blue-500/20 text-blue-400"
                    : ""
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <WalletMultiButton className="font-medium text-white cursor-pointer !bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 rounded-full" />
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white my-1 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden absolute w-full bg-black/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-[300px] py-4" : "max-h-0"
        }`}
      >
        <div className="padding-x flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className={`text-white font-medium py-3 px-4 rounded-lg ${
                location.pathname === link.url
                  ? "bg-blue-500/20 text-blue-400"
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
