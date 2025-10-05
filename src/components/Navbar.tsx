import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
  const baseClasses =
    "px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm uppercase tracking-wide transition-colors";
  const activeClasses = "bg-brand-gray text-brand-text";
  const inactiveClasses = "text-brand-subtext hover:text-brand-text";

  return (
    <nav className="sticky top-0 z-50 bg-brand-black/90 backdrop-blur shadow-md border-b-2 border-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Left: logo + tagline (tagline hidden on small screens) */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Richard Casey logo"
              className="h-8 w-auto"
            />
            <h1 className="hidden md:block text-brand-text text-lg font-bold whitespace-nowrap">
              Software &amp; Full-Stack Developer&nbsp;|&nbsp;C# · React · WPF
            </h1>
            {/* Optional: a tiny brand text on mobile if you want something there */}
            {/* <span className="md:hidden text-brand-text font-semibold">Richard Casey</span> */}
          </Link>
        </div>

        {/* Right: nav links */}
        <div className="flex items-center gap-1 sm:gap-2">
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
