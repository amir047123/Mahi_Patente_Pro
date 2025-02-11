import PricingCard from "@/Components/Pricing/PricingCard";
import Typography from "@/Components/Typography";
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";

const Pricing = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 pt-32  pb-40">
        {/* Header Section */}
        <div className="text-center mb-14">
          <Typography.Heading2 className="">
            See our attractive{" "}
            <span className="bg-gradient text-transparent bg-clip-text w-fit">
              Pricing
            </span>
          </Typography.Heading2>
          <Typography.Body className="text-gray-600 mt-2">
            Pay once, Enjoy forever. No hidden fees, and No recurring charges –
            Just lifetime access and Free updates.
          </Typography.Body>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 gap-4 mt-5">
          <PricingCard />
          <PricingCard isSpecial={true} />
          <PricingCard  />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
