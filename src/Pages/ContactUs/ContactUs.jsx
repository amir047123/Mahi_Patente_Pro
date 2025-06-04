import { motion } from "framer-motion";
import contactImg from "@/assets/contact/contact-img.svg";
import { MdAlternateEmail } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import {
  FaFacebook,
  FaWhatsapp,
} from "react-icons/fa";
import Typography from "@/components/Typography";
import Navbar from "@/Shared/Navbar/Navbar";
import ContactUsForm from "./ContactUsForm";
import Footer from "@/Shared/Footer/Footer";


const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

const ContactUs = () => {

  return (
    <div>
      <Navbar />
       
      <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 pt-28  pb-20">
        <motion.div
          className="2xl:px-0 md:px-10 px-5 max-w-screen-max_screen mx-auto "
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-10 gap-10 md:py-16">
            <div className="col-span-4 order-2 md:order-1">
              {/* image */}
              <img
                className="mx-auto hidden md:block"
                src={contactImg}
                alt="img"
              />

              {/* title */}
              <Typography.Base variant="normal" className="my-5">
                Join our growing network and unlock exciting opportunities
              </Typography.Base>

              {/* contact */}
              <div>
                <Typography.Heading5 variant="semibold" className=" mb-8">
                  Need any 
                  <span className="text-secondary"> help?</span>
                </Typography.Heading5>

                <div className=" flex flex-col gap-4">
                  <button
                    className="flex gap-3 items-center w-fit"
                    onClick={() => window.open("mailto:vipersitaly@gmail.com")}
                  >
                    <span className="w-9 h-9 rounded-full group gradient-border flex items-center justify-center cursor-pointer bg-secondary/10 shadow shadow-secondary/20 hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20 text-gray-500 transition-all duration-300">
                      <MdAlternateEmail className="w-5 h-5" />
                    </span>
                    <Typography.Base variant="normal" className="text-gray-600">
                      vipersitaly@gmail.com

                    </Typography.Base>
                  </button>

                  <button
                    className="flex gap-3 items-center w-fit"
                    onClick={() => window.open("tel:+393511032106")}
                  >
                    <span className="w-9 h-9 rounded-full group gradient-border flex items-center justify-center cursor-pointer bg-secondary/10 shadow shadow-secondary/20 hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20 text-gray-500 transition-all duration-300">
                      <LuPhoneCall className="w-5 h-5" />
                    </span>
                    <Typography.Base variant="normal" className="text-gray-600">
                      +39 351 103 2106
                    </Typography.Base>
                  </button>
                  <button
                    className="flex gap-3 items-center w-fit"
                   
                  >
                    <span className="w-9 h-9 rounded-full group gradient-border flex items-center justify-center cursor-pointer bg-secondary/10 shadow shadow-secondary/20 hover:bg-secondary hover:text-white hover:shadow-lg hover:shadow-secondary/20 text-gray-500 transition-all duration-300">
                      <GrLocation className="w-5 h-5" />
                    </span>
                    <Typography.Base
                      variant="normal"
                      className="text-gray-600 max-w-xs text-left"
                    >
                      Mahi Patente Pro Office, 80086 Palma Campania, Italy
                    </Typography.Base>
                  </button>
                </div>

                <div className="py-7 flex gap-5 items-center">
                  <button
                    className="whitespace-nowrap bg-[#0866FF] px-5 py-2 rounded-full  flex items-center gap-2 text-sm text-white"
                    onClick={() =>
                      window.open("https://www.facebook.com/share/1BnVVQbQTW/?mibextid=wwXIfr")
                    }
                  >
                    <FaFacebook className="w-5 h-5 " /> Follow us on:
                  </button>
                  <button
                    className="whitespace-nowrap text-white bg-[#198F45] px-5 py-2 rounded-full  flex items-center gap-2 text-sm"
                    onClick={() => window.open("https://wa.me/+393511032106")}
                  >
                    <FaWhatsapp className="w-5 h-5 " />{" "}
                    Chat via Whatsapp
                  </button>
                </div>

              </div>
            </div>

            <div className="col-span-6 order-1 md:order-2">
              <ContactUsForm />
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
