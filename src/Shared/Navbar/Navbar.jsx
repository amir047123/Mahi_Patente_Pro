import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/Navbar/logo.svg";
import { useAuthContext } from "@/Context/AuthContext";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthContext();

  const links = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blogs", label: "Blogs" },
    { href: "", label: "Contact" },
  ];

  return (
    <div className="fixed w-full z-50 flex justify-center items-center px-4 pt-4 ">
      <nav className=" backdrop-blur-md md:rounded-full rounded-b-2xl md:rounded-b-none w-full max-w-screen-max_screen mx-auto">
        <div
          className={`mx-auto w-full px-3 bg-headerGradient shadow-sm ${
            isMobileMenuOpen ? "rounded-none " : "rounded-full"
          }`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img src={logo} alt="logo" />
              <Link href="/">
                <p className="text-xl font-bold text-gray-900 font-mono">
                  Mahi
                </p>

                <div className="flex">
                  <p className="text-xl font-bold bg-gradient text-transparent bg-clip-text font-mono -mt-1.5">
                    Patente{" "}
                  </p>
                  <p className="text-gray-600 -mt-4 font-semibold">Pro</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Login/Sign Up Button */}
            <div className="hidden md:block">
              <Link
                to={user ? `/${user?.profile?.role}-dashboard` : "/login"}
                className="relative inline-flex items-center justify-center p-4 px-5 py-2.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>

                {user ? (
                  <span className="relative text-white text-sm">Dashboard</span>
                ) : (
                  <span className="relative text-white text-sm">
                    <span className="hidden lg:inline-block">Login or </span>{" "}
                    Sign Up
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 md:hidden "
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={35} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md rounded-b-3xl border-t">
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                to={user ? `/${user?.profile?.role}-dashboard` : "/login"}
                className="w-full relative inline-flex items-center justify-center  bg-white rounded-full group mt-4 p-[2px]"
              >
                <span className="absolute inset-0 rounded-full bg-gradient"></span>
                <span className="relative px-6 py-2 bg-white rounded-full border-2 border-transparent bg-clip-border w-full">
                  <span className="bg-gradient bg-clip-text text-transparent">
                    Login or Sign Up
                  </span>
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
