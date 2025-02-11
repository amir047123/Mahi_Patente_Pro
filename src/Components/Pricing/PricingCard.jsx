import Typography from "../Typography";
import { IoCheckmarkCircle } from "react-icons/io5";

const PricingCard = ({isSpecial=false}) => {
    return (
      <div
        className={` rounded-[27px] ${
          isSpecial ? "bg-gradient p-[4px]":"bg-gray-200 p-[2px]"
        }`}
      >
        <div className={` rounded-3xl p-7 bg-white`}>
          <Typography.Heading4 className="text-secondary">
            Basic Plan
          </Typography.Heading4>

          <div className="flex items-center gap-2 mb-6 mt-8">
            <Typography.Heading1>€19.99</Typography.Heading1>{" "}
            <Typography.Body className="text-secondaryText">
              /month
            </Typography.Body>
          </div>

          <Typography.Heading6>What’s included</Typography.Heading6>

          <div className="space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-xl text-secondary" />
              <Typography.Body className="text-secondaryText">
                Access to all Bangla driving lessons
              </Typography.Body>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-xl text-secondary" />
              <Typography.Body className="text-secondaryText">
                Access to all Bangla driving lessons
              </Typography.Body>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-xl text-secondary" />
              <Typography.Body className="text-secondaryText">
                Access to all Bangla driving lessons
              </Typography.Body>
            </div>
            <div className="flex items-center gap-2">
              <IoCheckmarkCircle className="text-xl text-secondary" />
              <Typography.Body className="text-secondaryText">
                Access to all Bangla driving lessons
              </Typography.Body>
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