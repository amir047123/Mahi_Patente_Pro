import Typography from "@/Components/Typography";
import { IoCheckmarkCircle } from "react-icons/io5";

const PricingCard = ({ item, isSpecial = false }) => {
  return (
    <div
      className={` rounded-[27px] h-full ${
        isSpecial ? "bg-gradient p-[4px]" : "bg-gray-200 p-[2px]"
      }`}
    >
      <div
        className={`flex flex-col justify-between rounded-3xl p-7  h-full bg-white`}
      >
        <div>
          <Typography.Heading4 className="text-secondary">
            {item?.name || "N/A"} Plan
          </Typography.Heading4>

          <div className="flex items-center gap-2 mb-6 mt-8">
            <Typography.Heading1>€{item?.price || 0}</Typography.Heading1>{" "}
            <Typography.Body className="text-secondaryText">
              /{" "}
              {item?.duration === 30
                ? "month"
                : item?.duration === 90
                ? "3 month"
                : item?.duration === 180
                ? "6 month"
                : item?.duration === 365
                ? "1 year"
                : `${item?.duration || 0} days`}
            </Typography.Body>
          </div>

          <Typography.Heading6>What’s included</Typography.Heading6>

          <div className="space-y-2 mt-5">
            {item?.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <IoCheckmarkCircle className="text-xl text-secondary" />
                <Typography.Body className="text-secondaryText">
                  {feature}
                </Typography.Body>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`px-10 w-full py-3 rounded-full border-[1px] font-medium border-secondary text-secondary mt-10 ${
            isSpecial && "bg-gradient border-none text-white"
          }`}
        >
          Get Start
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
