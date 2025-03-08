import Typography from "@/Components/Typography";
import { RiQuestionnaireLine } from "react-icons/ri";
import { BsBarChart } from "react-icons/bs";
import { IoTimerOutline } from "react-icons/io5";

const QuizPerformanceMetrics = () => {
  return (
    <>
      <Typography.Heading5 className="text-primaryText">
        Quiz Performance Metrics
      </Typography.Heading5>
      <div className="bg-white rounded-2xl p-5 lg:col-span-3 col-span-5 mt-3">
        <div className="flex flex-wrap gap-y-5 gap-x-2 justify-between">
          <div className="">
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Total Quiz Attempts
              </Typography.Body>
              <RiQuestionnaireLine className="text-blue-600 md:text-xl text-base" />
            </div>

            <Typography.Heading4
              variant="semibold"
              className="text-primaryText mt-3"
            >
              5,200
            </Typography.Heading4>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Avg. Quiz Pass Rate
              </Typography.Body>
              <BsBarChart className="text-red-600 md:text-xl text-base" />
            </div>

            <Typography.Heading4
              variant="semibold"
              className="text-primaryText mt-3"
            >
              52%
            </Typography.Heading4>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Avg. Time per Quiz
              </Typography.Body>
              <IoTimerOutline className="text-blue-600 md:text-xl text-base" />
            </div>

            <Typography.Heading4
              variant="semibold"
              className="text-primaryText mt-3"
            >
              7min 30sec
            </Typography.Heading4>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Most Failed Quiz
              </Typography.Body>
              <IoTimerOutline className="text-red-600 md:text-xl text-base" />
            </div>

            <Typography.Heading4
              variant="semibold"
              className="text-primaryText mt-3"
            >
              Chapter 3
            </Typography.Heading4>
          </div>
        </div>

        <div className="md:text-sm text-[12px] text-gray-500 mt-3">
          Last Update: 22 Jan 2025, 12:28 PM
        </div>
      </div>
    </>
  );
};

export default QuizPerformanceMetrics;
