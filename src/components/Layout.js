import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 backdrop-blur-lg bg-white bg-opacity-70 dark:bg-secondary-900 dark:bg-opacity-70 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-xl font-bold flex items-center text-primary-600 dark:text-primary-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            Smart Flashcards
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-primary-600 dark:text-primary-400"
                  : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/study"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-primary-600 dark:text-primary-400"
                  : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }
            >
              Study
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-primary-600 dark:text-primary-400"
                  : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 mr-2"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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
                  xmlns="http://www.w3.org/2000/svg"
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
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-secondary-900 px-4 py-2 shadow-md"
            >
              <nav className="flex flex-col space-y-4 py-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-primary-600 dark:text-primary-400 py-1"
                      : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                  }
                  onClick={closeMobileMenu}
                  end
                >
                  Home
                </NavLink>
                <NavLink
                  to="/study"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-primary-600 dark:text-primary-400 py-1"
                      : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                  }
                  onClick={closeMobileMenu}
                >
                  Study
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-primary-600 dark:text-primary-400 py-1"
                      : "text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors py-1"
                  }
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </NavLink>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <ThemeToggle />
        <Outlet />
      </main>

      <footer className="py-6 text-center text-secondary-500 dark:text-secondary-400 text-sm backdrop-blur-lg bg-white bg-opacity-70 dark:bg-secondary-900 dark:bg-opacity-70">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Smart Flashcards. All rights
            reserved.
          </p>
          <p className="mt-1">
            Built with React, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
