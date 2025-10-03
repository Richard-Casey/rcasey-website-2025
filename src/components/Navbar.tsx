import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseClasses =
    "px-4 py-3 text-sm uppercase tracking-wide transition-colors";
  const activeClasses = "bg-brand-gray text-brand-text";
  const inactiveClasses = "text-brand-subtext hover:text-brand-text";

  return (
    <nav className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur shadow-md border-b-2 border-white">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <img src="./logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-brand-text text-lg font-bold py-3">
            Richard Casey
          </h1>
        </div>

        <div className="flex gap-2">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/projects", label: "Projects" },
            { to: "/cv", label: "CV" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
