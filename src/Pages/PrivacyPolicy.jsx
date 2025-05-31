import Typography from "@/Components/Typography";
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";
import { FaChevronRight } from "react-icons/fa6";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="py-10">
        <div className="max-w-screen-max_screen mx-auto">
          <div className="container mx-auto h-[1.2px] bg-gradient-to-r from-transparent via-white/80 to-transparent mt-7" />

          <div className=" py-16 grid lg:grid-cols-4 grid-cols-1 lg:gap-x-10 gap-y-7 lg:gap-y-0">
            <div className="col-span-1 gradient-border p-10  bg-primary/5 space-y-4 h-fit rounded-lg">
              <div className="group flex items-center justify-between gap-3 border-b border-b-[#3F568A] pb-4 cursor-pointer">
                <p className="text-[1rem] hover:font-semibold hover:text-secondary">
                  Terms and Conditions
                </p>
                <FaChevronRight className="hidden group-hover:block" />
              </div>
              <div className="group flex items-center justify-between gap-3 border-b border-b-[#3F568A] pb-4 cursor-pointer">
                <p className="text-[1rem] hover:font-semibold hover:text-secondary">
                  Privacy Policy
                </p>
                <FaChevronRight className="hidden group-hover:block" />
              </div>
              <div className="group flex items-center justify-between gap-3 border-b border-b-[#3F568A] pb-4 cursor-pointer">
                <p className="text-[1rem] hover:font-semibold hover:text-secondary">
                  Refund Policy
                </p>
                <FaChevronRight className="hidden group-hover:block" />
              </div>
            </div>
            <div className="col-span-3  gradient-border p-10 bg-primary/5 rounded-lg">
              <Typography.Heading4 variant="semibold" className="">
                Terms and Conditions
              </Typography.Heading4>
              <Typography.Body variant="normal" className="/70 my-5">
                Welcome to Mahi Patente Pro! These terms and conditions outline
                the rules and regulations for the use of our services and
                website. By accessing or using our services, you agree to comply
                with these terms. Please read them carefully.
              </Typography.Body>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  1. Acceptance of Terms
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  By accessing our website or services, you agree to be bound by
                  these terms and conditions, as well as any additional policies
                  or guidelines we may provide. If you do not agree, please
                  refrain from using our services.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  2. Definition
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  Company refers to Mahi Patente Pro. Services refer to all
                  digital solutions, including SIM activation, utility services,
                  and web development provided by the company. User refers to
                  any individual or business accessing or using our services.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  3. Egibility
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  You must be at least 18 years old to use our services. By
                  using our services, you confirm that you meet this
                  requirement.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  4. Use of Service
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  You agree to use our services only for lawful purposes and in
                  compliance with all applicable laws and regulations. You must
                  not use our services to violate any laws, distribute malicious
                  software or engage in unauthorized access to systems, or
                  commit fraud or other unethical practices.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  5. Account Responsibilities
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  To access certain services, you may be required to create an
                  account. You are responsible for maintaining the
                  confidentiality of your account credentials. You agree to
                  notify us immediately of any unauthorized use of your account.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  6. Payment and Billing
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  All payments must be made promptly as per the terms of the
                  selected service. Pricing and fees are subject to change, and
                  you will be notified of any updates in advance.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  7. Privacy Policy
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  Your privacy is important to us. Our use of your data is
                  governed by our Privacy Policy, which is incorporated into
                  these terms by reference.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  8. Intellectual Property
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  All content, including but not limited to text, graphics,
                  logos, and software, is the intellectual property of Mahi
                  Patente Pro or its licensors. You may not reproduce,
                  distribute, or use any content without prior written consent
                  from Mahi Patente Pro.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  9. Limitations of Liability
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  Mahi Patente Pro is not liable for any indirect, incidental,
                  or consequential damages resulting from the use of our
                  services. This includes loss of data, revenue, or profits
                  arising from delays, interruptions, or unauthorized access.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  10. Termination
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  We reserve the right to suspend or terminate your access to
                  our services at our discretion, without prior notice, for
                  violation of these terms or activities that harm or disrupt
                  the company or its users.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  11. Governing Law
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  These terms and conditions are governed by and construed in
                  accordance with the laws of Italy. Any disputes will be
                  resolved under the jurisdiction of Italian courts.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  12. Change of Terms
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  Mahi Patente Pro reserves the right to update or modify these
                  terms at any time. Changes will be effective immediately upon
                  posting, and it is your responsibility to review them
                  regularly.
                </Typography.Body>
              </div>

              <div className="my-7">
                <Typography.Base variant="semibold">
                  13. Contact Us
                </Typography.Base>
                <Typography.Body variant="normal" className="/70 mt-1">
                  If you have any questions about these terms and conditions,
                  please contact us: Email:{" "}
                  <span className="text-secondary">vipersitaly@gmail.com</span>{" "}
                  Phone:{" "}
                  <span className="text-secondary">+39 351 103 2106</span>{" "}
                  Address:{" "}
                  <span className="text-secondary">
                    Mahi Patente Pro Office, 80086 Palma Campania, Italy
                  </span>
                </Typography.Body>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
