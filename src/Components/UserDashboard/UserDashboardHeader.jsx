import { IoNotificationsOutline } from "react-icons/io5";
import { SidebarTrigger } from "../ui/sidebar";
import languageIcon from '@/assets/UserDashboard/language.svg'
import demoUser from '@/assets/UserDashboard/demoUser.svg'
import { ChevronDown } from "lucide-react";
const UserDashboardHeader = () => {
    return (
      <header className=" w-full border-b ">
        <div className="md:h-[71px] h-16 flex  items-center max-w-screen-max_screen mx-auto px-5">
          <SidebarTrigger className="block md:hidden" />

          <div className="flex md:justify-between gap-x-5 justify-end items-center w-full ">
            <div className="relative max-w-sm hidden md:block">
              <label htmlFor="Search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="Search"
                placeholder="Search for..."
                className="bg-transparent w-full  rounded-full border py-1.5 pe-10 shadow-sm sm:text-sm pl-8 focus:outline-none"
              />
              <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700"
                >
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </span>
            </div>

            <div className="flex items-center md:gap-x-8 gap-x-6">
              <button className="relative">
                <IoNotificationsOutline className="text-2xl text-primaryText" />
                <span className="absolute text-[11px] -top-1 -right-2 bg-secondary/20 text-secondary rounded-full px-1.5 font-medium">
                  5
                </span>
              </button>

              <button className="flex items-center md:gap-2.5 gap-1.5">
                <img className="w-[22px]" src={languageIcon} alt="icon" />
                EN
              </button>

              <div className="flex items-center sm:gap-2.5 gap-1">
                <img
                  className="w-9 rounded-full border"
                  src={demoUser}
                  alt="user img"
                />
                <div className="hidden sm:block">
                  <p className="text-[12px] font-medium text-primaryText">
                    Ashikul islam ifty
                  </p>
                  <p className="text-secondaryText text-[12px]">
                    ashikulislamifty@gmail.com
                  </p>
                </div>
                <ChevronDown size={24} className="text-secondaryText" />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
};

export default UserDashboardHeader;