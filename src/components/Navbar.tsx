import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, external }) => {
  const baseClasses =
    "transition-all duration-300 text-white/90 hover:text-white hover:bg-[#008374] rounded-md px-3 py-2";

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} hover:scale-105`}
    >
      {label}
    </a>
  ) : (
    <Link to={href} className={baseClasses}>
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
    const { username, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const menuItems = {
    resources: [
      { label: "Data Science", href: "https://science.dataidea.org" },
      { label: "Blog", href: "https://blog.dataidea.org" },
      { label: "Movies", href: "https://movies.dataidea.org" },
    ],
    community: [
      {
        label: "Forum Group",
        href: "https://chat.whatsapp.com/GuCZRyJICgO3Y7MPvDQKhi",
      },
      { label: "YouTube", href: "https://www.youtube.com/@dataideascience" },
      { label: "Twitter", href: "https://twitter.com/dataideaorg" },
    ],
  };

  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const DropdownMenu: React.FC<{ items: typeof menuItems.resources }> = ({
    items,
  }) => (
    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-[#66fdee]/20 overflow-hidden z-10">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-gray-700 hover:bg-[#008374]/10 transition-colors duration-200"
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <nav
      ref={navRef}
      className="bg-[#008374] w-full shadow-md sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link
            to="https://www.dataidea.org/"
            className="group flex items-center space-x-2"
          >
            <span className="font-heading text-white text-3xl font-bold transition-all duration-300 group-hover:text-[#66fdee]">
              DATAIDEA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink href="/" label="Home" />

            {/* Desktop Dropdowns */}
            {["resources", "community"].map((menuType) => (
              <div key={menuType} className="relative">
                <button
                  onClick={() =>
                    setActiveMenu(activeMenu === menuType ? null : menuType)
                  }
                  className={`transition-all duration-300 text-white/90 hover:text-white hover:bg-[#008374] rounded-md px-3 py-2 capitalize
                    ${activeMenu === menuType ? "bg-[#008374]" : ""}`}
                >
                  {menuType}
                </button>
                {activeMenu === menuType && (
                  <DropdownMenu
                    items={menuItems[menuType as keyof typeof menuItems]}
                  />
                )}
              </div>
            ))}

            {/* User Account Section */}
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === "account" ? null : "account")
                }
                className={`transition-all duration-300 text-white/90 hover:text-white hover:bg-[#008374] rounded-md px-3 py-2
                  ${activeMenu === "account" ? "bg-[#008374]" : ""}`}
              >
                {username ? username : "Account"}
              </button>
              {activeMenu === "account" && (
                <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-[#66fdee]/20 overflow-hidden">
                  {username ? (
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#008374]/10 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#008374]/10 transition-colors duration-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-700 hover:bg-[#008374]/10 transition-colors duration-200"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-white hover:bg-[#008374] transition-colors duration-200"
          >
            <span className="sr-only">Toggle menu</span>
            {isMobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#007367]/95 backdrop-blur-sm">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <NavLink href="/" label="Home" />

            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category} className="py-2">
                <div className="text-white font-semibold mb-2 capitalize">
                  {category}
                </div>
                {items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/80 hover:bg-[#008374] rounded-md px-3 py-2 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ))}

            <div className="pt-2 border-t border-[#66fdee]/20">
              {username ? (
                <>
                  <div className="px-3 py-2 text-white/80">
                    Signed in as {username}
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left text-white/80 hover:bg-[#008374] rounded-md px-3 py-2 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-white/80 hover:bg-[#008374] rounded-md px-3 py-2 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-white/80 hover:bg-[#008374] rounded-md px-3 py-2 transition-colors duration-200"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
