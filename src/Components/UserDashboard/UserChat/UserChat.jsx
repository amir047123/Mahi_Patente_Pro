import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Paperclip, Send } from "lucide-react";
import { LuMessageCircleMore } from "react-icons/lu";
import demoImg from "../../../assets/Navbar/logo.svg";
import Typography from "@/Components/Typography";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";

const UserChat = () => {
      const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <LuMessageCircleMore
          onClick={() => setOpen(true)}
          className="text-2xl text-primaryText cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-full sm:min-w-[400px] sm:max-w-[400px]">
        <div className=" relative  w-full">
          <div className="flex justify-between gap-5 items-center border-b pb-3 border-b-gray-200">
            <div className="flex items-center gap-[16px]">
              <button className="relative">
                <img
                  src={demoImg}
                  alt="User avatar"
                  className="rounded-full w-12 border"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </button>

              <div>
                <Typography.Title variant="semibold" className="!text-[18px]">
                  Amir Faysal
                </Typography.Title>

                <Typography.Base
                  variant="normal"
                  className=" !text-[12px] text-gray-600"
                >
                  System support
                </Typography.Base>
              </div>
            </div>

            <div className="flex items-center gap-3">
             

              <button
                onClick={() => setOpen(false)}
                className="bg-[#F2F2F2] p-2  rounded-lg border"
              >
                <IoCloseCircleOutline className="text-xl text-red-500" />
              </button>
            </div>
          </div>

          {/* chats */}
          <div className="py-5 max-h-[50vh] overflow-y-scroll scrollbar-hide scroll-smooth">
            <div className="flex gap-2 mb-4">
              <img
                src={demoImg}
                alt="User avatar"
                className="rounded-full w-10 h-10 border"
              />
              <div>
                <p className="text-[#64748B] text-[10px]">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className="bg-[#DFE4EA] text-[13px] max-w-[250px] p-3 rounded-r-2xl rounded-b-2xl">
                  Apnar Account e taka nai apni ki deposit korben na bhai?
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-md justify-end ml-auto mb-4">
              <div>
                <p className="text-[#64748B] text-[10px] text-right">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className=" bg-gradient-to-r from-[#4B2BB2] to-[#B262B2] text-[13px] max-w-[250px] p-3 rounded-l-2xl rounded-b-2xl text-white">
                  Na korbo na kono somossha apnar?
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <img
                src={demoImg}
                alt="User avatar"
                className="rounded-full w-10 h-10 border"
              />
              <div>
                <p className="text-[#64748B] text-[10px]">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className="bg-[#DFE4EA] text-[13px] max-w-[250px] p-3 rounded-r-2xl rounded-b-2xl">
                  Hea, obossoi somossha ache
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-md justify-end ml-auto mb-4">
              <div>
                <p className="text-[#64748B] text-[10px] text-right">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className=" bg-gradient-to-r from-[#4B2BB2] to-[#B262B2] text-[13px] max-w-[250px] p-3 rounded-l-2xl rounded-b-2xl text-white">
                  ki somossha apnar
                </div>
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              <img
                src={demoImg}
                alt="User avatar"
                className="rounded-full w-10 h-10 border"
              />
              <div>
                <p className="text-[#64748B] text-[10px]">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className="bg-[#DFE4EA] text-[13px] max-w-[250px] p-3 rounded-r-2xl rounded-b-2xl">
                  Eto kichu bolte parbo na, taratari taka deposit koren
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 max-w-md justify-end ml-auto mb-4">
              <div>
                <p className="text-[#64748B] text-[10px] text-right">
                  Mahi-patente-Pro ꞏ 09:00AM{" "}
                </p>
                <div className=" bg-gradient-to-r from-[#4B2BB2] to-[#B262B2] text-[13px] max-w-[250px] p-3 rounded-l-2xl rounded-b-2xl text-white">
                  Parbo na
                </div>
              </div>
            </div>
          </div>
          {/* text input field */}

          <div className=" py-7">
            <div className=" flex gap-2 items-center absolute bottom-0 left-2 right-2">
              <div className="flex-1 relative flex items-center rounded-lg border border-gray-200 bg-white">
                <input
                  id="image-file"
                  type="file"
                  className="hidden"
                  multiple
                />{" "}
                <label
                  htmlFor="image-file"
                  className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors cursor-pointer"
                >
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </label>
                <input
                  type="text"
                  placeholder="Type or attached something"
                  className="w-full px-2 py-2.5 bg-transparent outline-none text-gray-600 placeholder:text-gray-400"
                />
              </div>

              <button
                className="p-3 rounded-lg bg-violet-500 hover:bg-violet-600 transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserChat;
