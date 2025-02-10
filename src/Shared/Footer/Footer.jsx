import { Link } from "react-router-dom";
import logo from "@/assets/Navbar/logo.svg";
import Typography from "@/Components/Typography";
import {
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdOutlinePhone,
} from "react-icons/md";
import playStore from "@/assets/Home/MobileApp/play-store.svg";
import appStore from "@/assets/Home/MobileApp/app-store.svg";
const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 lg:px-6">
      <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-sm text-gray-500 mb-5">
              Making Driving Easy for Everyone.
            </p>
            <Typography.Body className=" text-gray-500 leading-relaxed">
              Mahi Patente Pro offers step-by-step driving lessons in Bengali,
              helping learners pass Italy's driving test with ease
            </Typography.Body>
          </div>

          {/* Quick Links */}
          <div className="lg:px-4">
            <h4 className="text-base font-semibold mb-4">Quick Link</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:px-4 ">
            <h4 className="text-base font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:px-4 ">
            <h4 className="text-base font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MdOutlinePhone className="text-lg" />
                +39 351 103 2106
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MdOutlineEmail className="text-lg" />
                vipersitaly@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <div>
                  <MdOutlineLocationOn className="text-lg" />
                </div>
                Mahi Patente Pro Office, 80086 Palma Campania, Italy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* App Download */}
            <div>
              <p className="text-sm text-gray-600 mb-4">Install our app from</p>
              <div className="flex gap-3 mt-5">
                <button>
                  <img draggable={false} src={playStore} alt="icon" />
                </button>
                <button>
                  <img draggable={false} src={appStore} alt="icon" />
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-600 mb-4">Connect with us on</p>
              <div className="flex gap-4">
                <Link
                  to="/"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </Link>
                <Link
                  to="/"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                  </svg>
                </Link>
                <Link
                  to="/"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </Link>
                <Link
                  to="/"
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Subscribe our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary focus:primary"
                />
                <button className="px-6 py-2 text-sm text-white bg-gradient rounded-r-md hover:bg-gradient/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            © 2025 Mahi Patente Pro - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
