// src/components/Layout.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginModal from "./LoginModal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const logoLoadedRef = useRef<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedLogin === "true" && savedEmail) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setLoginModalOpen(false);

    // Save in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setProfileDropdownOpen(false);
    setMobileOpen(false);

    // Clear localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
  };

  const getInitial = (email: string) => {
    if (!email) return "";
    return email.charAt(0).toUpperCase();
  };

  // Stable outside-click handler for profile dropdown and drawer
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const node = profileRef.current;
      if (
        node &&
        event.target instanceof Node &&
        !node.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }

      const dnode = drawerRef.current;
      if (
        dnode &&
        event.target instanceof Node &&
        !dnode.contains(event.target)
      ) {
        // If clicked outside the drawer (and mobileOpen), close it
        if (mobileOpen) setMobileOpen(false);
      }
    },
    [mobileOpen],
  );

  // Attach global listeners once (use same callback reference)
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // Close on Escape key
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfileDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [handleClickOutside]);

  // defensive: ensure we don't leave dropdown open when login state changes or route changes
  useEffect(() => {
    if (!isLoggedIn) setProfileDropdownOpen(false);
    // close mobile menu on route change
    setMobileOpen(false);
  }, [isLoggedIn, location.pathname]);

  // Logo load handlers — if logo doesn't load, we fallback so UI doesn't hang waiting
  const handleLogoLoad = () => {
    logoLoadedRef.current = true;
  };
  const handleLogoError = () => {
    logoLoadedRef.current = false;
  };

  // Active / normal classes
  const activeButtonClasses = [
    "px-2",
    "py-1",
    "rounded-[50px]",
    "bg-[#66A6FF]",
    "border",
    "border-transparent",
    "flex",
    "items-center",
    "justify-center",
    "text-white",
    "font-semibold",
    "text-sm",
    "transition",
  ].join(" ");

  const normalLinkClasses =
    "text-sm font-medium text-gray-700 hover:text-primary transition";

  const navLinks = (
    <>
      <Link
        to="/"
        className={
          location.pathname === "/" ? activeButtonClasses : normalLinkClasses
        }
      >
        Search & Book
      </Link>

      <Link
        to="/appointments"
        className={
          location.pathname === "/appointments"
            ? activeButtonClasses
            : normalLinkClasses
        }
      >
        My appointments
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F5F4EF]">
      <header
        className="
          sticky 
          top-5 
          z-50 
          bg-white 
          rounded-[6rem] 
          px-4 md:px-8 
          py-3 
          shadow-md 
          flex 
          items-center 
          justify-between
          w-[95%] 
          max-w-[1400px]
          mx-auto
        "
      >
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2" aria-label="Home">
            <img
              src="/logo.png"
              alt="PockyDoc Logo"
              className="h-[25px] w-[100px]"
              onLoad={handleLogoLoad}
              onError={handleLogoError}
            />
          </Link>
        </div>

        {/* Center Nav (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {/* If not logged in - show public nav; else show logged-in nav */}
          {!isLoggedIn ? (
            <nav className="flex items-center gap-8 text-sm font-medium">
              <a
                href="https://www.pockydoc.com/doctors/"
                target="_blank"
                rel="noreferrer"
                className="
                  relative text-black hover:text-[#0066ff]
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:w-0 after:h-[3px] after:bg-[#0066ff] after:rounded-full
                  hover:after:w-full after:transition-all after:duration-300
                "
              >
                Doctors
              </a>

              <div className="group relative">
                <span
                  className="
                    relative text-black hover:text-[#0066ff] cursor-pointer flex items-center gap-1
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:w-0 after:h-[3px] after:bg-[#0066ff] after:rounded-full
                    group-hover:after:w-full after:transition-all after:duration-300
                  "
                >
                  Partner <ChevronDown size={14} />
                </span>

                <div className="hidden group-hover:block absolute left-0 top-full mt-3 bg-white shadow-lg rounded-xl p-3 w-40 z-50">
                  <a
                    href="https://www.pockydoc.com/investors/"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Investors
                  </a>
                  <a
                    href="https://www.pockydoc.com/corporate/"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Corporate
                  </a>
                </div>
              </div>

              <div className="group relative">
                <span
                  className="
                    relative text-black hover:text-[#0066ff] cursor-pointer flex items-center gap-1
                    after:content-[''] after:absolute after:left-0 after:-bottom-1
                    after:w-0 after:h-[3px] after:bg-[#0066ff] after:rounded-full
                    group-hover:after:w-full after:transition-all after:duration-300
                  "
                >
                  About <ChevronDown size={14} />
                </span>

                <div className="hidden group-hover:block absolute left-0 top-full mt-3 bg-white shadow-lg rounded-xl p-3 w-48 z-50">
                  <a
                    href="https://www.pockydoc.com/about/"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    About Us
                  </a>
                  <a
                    href="https://www.pockydoc.com/ourservices/"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Our Services
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pockydoc"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    LinkedIn (Company)
                  </a>
                  <a
                    href="https://www.linkedin.com/company/pockydoc/posts/?feedView=all"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-3 py-2 hover:bg-gray-50"
                  >
                    Posts Feed
                  </a>
                </div>
              </div>
            </nav>
          ) : (
            <nav className="flex items-center gap-4 text-sm font-medium">
              {navLinks}
            </nav>
          )}
        </div>

        {/* Right side (desktop) + mobile hamburger */}
        <div className="flex items-center gap-2">
          {/* Mobile: menu button (visible on small screens) */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          {/* Logged OUT (desktop) */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center gap-6">
              <Button
                type="button"
                onClick={() => setLoginModalOpen(true)}
                className="
                  relative text-sm font-medium text-black hover:text-[#0066ff]
                  after:content-[''] after:absolute after:left-0 after:bottom-1
                  after:w-0 after:h-[3px] after:bg-[#0066ff] after:rounded-full
                  hover:after:w-full after:transition-all after:duration-300 bg-transparent
                  hover:bg-transparent
                "
              >
                Login
              </Button>

              <a
                href="https://links.pockydoc.com/register"
                className="
                  relative text-sm font-medium text-black hover:text-[#0066ff]
                  after:content-[''] after:absolute after:left-0 after:-bottom-1
                  after:w-0 after:h-[3px] after:bg-[#0066ff] after:rounded-full
                  hover:after:w-full after:transition-all after:duration-300
                "
              >
                Sign up
              </a>
            </div>
          )}

          {/* Logged IN (desktop) */}
          {isLoggedIn && (
            <>
              {/* small notification + name */}
              <div className="hidden md:flex items-center mr-2">
                <button
                  type="button"
                  className="flex flex-col items-end text-sm text-gray-600 hover:text-gray-900"
                >
                  <span className="text-gray-800">Approva Joshi</span>
                  <span className="font-montserrat font-semibold text-[13px] leading-none tracking-normal text-center text-[#0152FFB2]">
                    1 New notification
                  </span>
                </button>
              </div>

              <div ref={profileRef} className="relative">
                <Button
                  type="button"
                  onClick={() => setProfileDropdownOpen((s) => !s)}
                  className="flex items-center gap-2 hover:bg-transparent hover:opacity-80 transition group bg-transparent"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {getInitial(userEmail)}
                  </div>
                </Button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User size={18} className="text-primary" />
                      <span>My profile</span>
                    </Link>

                    <Button
                      type="button"
                      onClick={() => {
                        handleLogout();
                      }}
                      className="bg-transparent w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 transition border-t border-gray-100"
                    >
                      <LogOut size={18} className="text-red-500" />
                      <span className="text-red-500 font-medium">Logout</span>
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Mobile Drawer (Option A) */}
      {/* Overlay */}
      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-40 transition-opacity ${mobileOpen ? "opacity-50 visible" : "opacity-0 invisible"}`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          transitionProperty: "opacity",
          transitionDuration: "200ms",
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        className={`fixed top-0 right-0 z-50 h-full w-[280px] bg-white shadow-xl transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        aria-label="Mobile menu"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setMobileOpen(false)}
          >
            <img src="/logo.png" alt="PockyDoc Logo" className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            className="p-2"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 flex flex-col gap-4">
          {/* If not logged in */}
          {!isLoggedIn ? (
            <>
              <a
                href="https://www.pockydoc.com/doctors/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Doctors
              </a>

              <a
                href="https://www.pockydoc.com/about/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-800 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                About
              </a>

              <button
                type="button"
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileOpen(false);
                }}
                className="w-full h-[45px] rounded-md bg-[#66A6FF] text-white font-semibold"
              >
                Login
              </button>

              <a
                href="https://links.pockydoc.com/register"
                className="w-full inline-flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? `${activeButtonClasses} block`
                    : "text-gray-800 font-medium block"
                }
                onClick={() => setMobileOpen(false)}
              >
                Search & Book
              </Link>

              <Link
                to="/appointments"
                className={
                  location.pathname === "/appointments"
                    ? `${activeButtonClasses} block`
                    : "text-gray-800 font-medium block"
                }
                onClick={() => setMobileOpen(false)}
              >
                My appointments
              </Link>

              <div className="border-t mt-4 pt-4">
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                >
                  <User size={18} />
                  <span>My profile</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                  }}
                  className="bg-transparent w-full mt-3 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-100 rounded-md hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </>
          )}
        </nav>
      </aside>

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
