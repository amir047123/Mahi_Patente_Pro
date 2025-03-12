import Typography from "@/Components/Typography";
import book from "../../assets/Home/WhyChoseUs/book.svg";
import anytime from "../../assets/Home/WhyChoseUs/anytime-learn.svg";
import document from "../../assets/Home/WhyChoseUs/document.svg";
import support from "../../assets/Home/WhyChoseUs/support.svg";
import learning from "../../assets/Home/WhyChoseUs/learning.svg";

const WhyChoseUs = () => {
  return (
    <div className="max-w-screen-max_screen mx-auto xl:px-0 lg:px-8 md:px-6 px-4 md:pt-28 pt-20">
      {/* Header Section */}
      <div className="text-center mb-12">
        <Typography.Heading2 className="">
          Why Choose{" "}
          <span className="bg-gradient text-transparent bg-clip-text w-fit">
            Us?
          </span>
        </Typography.Heading2>
        <Typography.Body className="text-gray-600 mt-2">
          Learn in Bangla, practice with real tests, and pass your Italian
          driving exam with confidence!
        </Typography.Body>
      </div>

      <div className="">
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 ">
          {/* 100% Bangla Course */}
          <div className="bg-[#FEFCCE] rounded-2xl p-6 ">
            <img className=" w-20 mb-3" src={book} alt="" />
            <Typography.Title className="mb-3 text-gray-800">
              100% Bangla Course
            </Typography.Title>
            <Typography.Body className="text-gray-600 text-sm">
              Step-by-step driving lessons in Bangla, making learning easy and
              stress-free.
            </Typography.Body>
          </div>

          {/* Real Mock Test */}
          <div className="bg-[#D6FED9] rounded-2xl p-6 ">
            <img className=" w-20 mb-3" src={document} alt="" />
            <Typography.Title className="mb-3 text-gray-800">
              Real Mock Test
            </Typography.Title>
            <Typography.Body className="text-gray-600 text-sm">
              Practice with real exam questions to increase your chances of
              passing.
            </Typography.Body>
          </div>

          {/* Interactive Learning */}
          <div className="bg-[#D6EFFE] rounded-2xl p-6 ">
            <img className=" w-20 mb-3" src={learning} alt="" />
            <Typography.Title className="mb-3 text-gray-800">
              Interactive Learning
            </Typography.Title>
            <Typography.Body className="text-gray-600 text-sm">
              Learn with videos, quizzes, and voice-assisted lessons.
            </Typography.Body>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expert Support */}
          <div className="bg-[#FEDAFD] rounded-2xl p-6">
            <img className=" w-20 mb-3" src={support} alt="" />
            <Typography.Title className="mb-3 text-gray-800">
              Expert Support
            </Typography.Title>
            <Typography.Body className="text-gray-600 text-sm">
              Whenever you need support, don't hesitate to reach out to experts
              who can provide insights to help you navigate your challenges.
            </Typography.Body>
          </div>

          {/* Learn Anytime, Anywhere */}
          <div className="bg-[#FEE4DA] rounded-2xl p-6">
            <img className=" w-20 mb-3" src={anytime} alt="" />
            <Typography.Title className="mb-3 text-gray-800">
              Learn Anytime, Anywhere
            </Typography.Title>
            <Typography.Body className="text-gray-600 text-sm">
              Enhance your learning experience by studying on the go with our
              user-friendly mobile app or comprehensive website support.
            </Typography.Body>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;
