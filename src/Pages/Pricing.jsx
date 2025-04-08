import PricingCard from "@/Components/Pricing/PricingCard";
import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";
import toast from "react-hot-toast";

const Pricing = () => {
  const { useFetchEntities } = useCrudOperations("package/all");
  const { data: response, error, isError, isLoading } = useFetchEntities();

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

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
          {isLoading ? (
            <div className="flex items-center justify-center mt-10">
              <Spinner size={40} />
            </div>
          ) : response?.data?.length > 0 ? (
            response?.data?.map((item, index) => (
              <PricingCard
                key={index}
                item={item}
                isSpecial={index === 1 ? true : false}
              />
            ))
          ) : (
            <p className="text-center mt-10">No pricing plan found!</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
