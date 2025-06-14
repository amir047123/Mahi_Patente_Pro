import bg from "../../assets/Home/Hero/hero_bg.svg";
import img from "../../assets/Home/Hero/hero-img.svg";
import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/Context/AuthContext";

const Hero = () => {
  const { user } = useAuthContext();
  return (
    <div
      className=" bg-cover lg:pt-44 lg:pb-32 md:pt-36 md:pb-28 pt-28 pb-20"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-12">
          {/* Left content */}
          <div className="">
            <Typography.Heading1 variant="bold" className="leading-tight">
              <span className="text-[#2D2D2D]">Italy Driving License in</span>{" "}
              <span className="bg-gradient text-transparent bg-clip-text">
                Bangla
              </span>{" "}
              <span className="text-[#2D2D2D]">- Learn, Practice,</span>
              <br />
              <span className="text-[#2D2D2D]">Succeed!</span>
            </Typography.Heading1>

            <p className="text-gray-600 mt-4 mb-8 text-lg">
              Step-by-step guidance in Bangla to help you pass the Italian
              driving license test easily.
            </p>

            <div className="flex gap-3 mt-10">
              <Link
                to={user ? `/${user?.profile?.role}-dashboard` : "/login"}
                className="relative inline-flex items-center justify-center p-4 px-5 py-2.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
                <span className="relative text-white text-sm">
                  {" "}
                  Get Started Today
                </span>
              </Link>

              <Link
                to="/contact-us"
                className="relative inline-flex items-center justify-center p-4 px-6 py-2.5 overflow-hidden font-medium  transition duration-300 ease-out  border-2 border-pink-500 rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center h-full bg-gradient text-transparent bg-clip-text w-full transition-all duration-300 transform group-hover:translate-x-full ease">
                  Contact Us
                </span>
                <span className="relative invisible">Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="">
            <div className="rounded-2xl overflow-hidden">
              <img
                src={img}
                alt="Woman driving"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
