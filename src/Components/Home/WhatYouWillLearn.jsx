import Typography from "@/Components/Typography";
import roadSign from "../../assets/Home/WhatYouWillLearn/road-sign.svg";
import mock from "../../assets/Home/WhatYouWillLearn/mock-exam.svg";
import traffic from "../../assets/Home/WhatYouWillLearn/trafic-roules.svg";
import tips from "../../assets/Home/WhatYouWillLearn/driving-tips.svg";
import right from "../../assets/Home/WhatYouWillLearn/right-ind.svg";
import left from "../../assets/Home/WhatYouWillLearn/left-ind.svg";

const WhatYouWillLearn = () => {
  return (
    <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 md:py-28 py-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Typography.Heading2 className="">
          What You Will{" "}
          <span className="bg-gradient text-transparent bg-clip-text w-fit">
            Learn
          </span>
        </Typography.Heading2>
        <Typography.Body className="text-gray-600 mt-2">
          Learn in Bangla, practice with real tests, and pass your Italian
          driving exam with confidence!
        </Typography.Body>
      </div>

      <div className="lg:mt-28 md:mt-24 mt-20 space-y-10">
        <div className="flex items-center sm:w-fit w-full">
          <div className="flex sm:flex-row flex-col w-full  gap-5 sm:items-center">
            <img className="w-full sm:w-fit" src={roadSign} alt="img" />
            <div>
              <button className="rounded-lg px-4 bg-[#D6FED9]">
                <Typography.Heading3>1.</Typography.Heading3>
              </button>
              <Typography.Heading3 className="text-gray-800 my-3">
                Road Signs & Meanings
              </Typography.Heading3>
              <Typography.Body>
                Learn all Italian road signs with explanations.
              </Typography.Body>
            </div>
          </div>
          <img
            draggable={false}
            className="hidden md:block"
            src={right}
            alt="icon"
          />
        </div>

        <div className="flex items-center sm:w-fit w-full ml-auto ">
          <img
            draggable={false}
            className="hidden md:block mr-2"
            src={left}
            alt="icon"
          />
          <div className="flex sm:flex-row flex-col w-full  gap-5 sm:items-center">
            <img className="w-full sm:w-fit" src={traffic} alt="img" />
            <div>
              <button className="rounded-lg px-4 bg-[#D6FED9]">
                <Typography.Heading3>2.</Typography.Heading3>
              </button>
              <Typography.Heading3 className="text-gray-800 my-3">
                Traffic Rules & Safety
              </Typography.Heading3>
              <Typography.Body>
                Understand Italy’s driving laws and safety rules.
              </Typography.Body>
            </div>
          </div>
        </div>

        <div className="flex items-center  w-full sm:w-fit">
          <div className="flex sm:flex-row flex-col w-full  gap-5 sm:items-center">
            <img className="w-full sm:w-fit" src={mock} alt="img" />
            <div>
              <button className="rounded-lg px-4 bg-[#D6FED9]">
                <Typography.Heading3>3.</Typography.Heading3>
              </button>
              <Typography.Heading3 className="text-gray-800 my-3">
                Mock Exams & Practice
              </Typography.Heading3>
              <Typography.Body>
                Practice real test questions to prepare for the exam.
              </Typography.Body>
            </div>
          </div>
          <img
            draggable={false}
            className="hidden md:block"
            src={right}
            alt="icon"
          />
        </div>

        <div className="flex items-center sm:w-fit w-full ml-auto ">
          <div className="flex sm:flex-row flex-col w-full  gap-5 sm:items-center">
            <img className="w-full sm:w-fit" src={tips} alt="img" />
            <div>
              <button className="rounded-lg px-4 bg-[#D6FED9]">
                <Typography.Heading3>4.</Typography.Heading3>
              </button>
              <Typography.Heading3 className="text-gray-800 my-3">
                Practical Driving Tips
              </Typography.Heading3>
              <Typography.Body>
                Master real-world driving techniques for success.
              </Typography.Body>
            </div>
          </div>
        </div>
      </div>

      <button className="rounded-full bg-gradient p-[2px] block lg:mt-16 mt-10 mx-auto">
        <div className="bg-white rounded-full px-10 py-2.5">
          <span className="bg-gradient text-transparent bg-clip-text font-medium text-sm ">
            Get Started Now
          </span>
        </div>
      </button>
    </div>
  );
};

export default WhatYouWillLearn;
