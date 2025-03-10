import Typography from "@/Components/Typography";
import { IoMdAddCircle } from "react-icons/io";
import list from "@/assets/AdminDashboard/icon/list.svg";
import book from "@/assets/AdminDashboard/icon/book.svg";
import question from "@/assets/AdminDashboard/icon/question.svg";

const QuizStatistics = ({ data }) => {
  return (
    <div className="grid grid-cols-5 lg:gap-5 gap-3">
      <div className="bg-white rounded-2xl p-5 lg:col-span-3 col-span-5">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                <span className="hidden sm:inline">Total</span> Chapters
              </Typography.Body>
              <IoMdAddCircle className="text-blue-600 md:text-xl text-base" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <img src={list} alt="list" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                {data?.totalChapter || 0}
              </Typography.Heading4>
            </div>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                <span className="hidden sm:inline">Total</span> Subject
              </Typography.Body>
              <IoMdAddCircle className="text-blue-600 md:text-xl text-base" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <img src={book} alt="book" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                {data?.totalSubject || 0}
              </Typography.Heading4>
            </div>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                <span className="hidden sm:inline">Official</span> Question
              </Typography.Body>
              <IoMdAddCircle className="text-secondary md:text-xl text-base" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <img src={question} alt="list" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                127
              </Typography.Heading4>
            </div>
          </div>
        </div>

        <div className="md:text-sm text-[12px] text-gray-500 mt-3">
          Last Update: 22 Jan 2025, 12:28 PM
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 lg:col-span-2 col-span-5 w-full">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Guess the Signal
              </Typography.Body>
              <IoMdAddCircle className="text-blue-600 md:text-xl text-base" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <img src={list} alt="list" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                27
              </Typography.Heading4>
            </div>
          </div>
          <div className="w-[1px] h-16 bg-gray-200" />
          <div>
            <div className="flex items-center gap-2 justify-between">
              <Typography.Body
                variant="medium"
                className="text-secondaryText whitespace-nowrap"
              >
                Choose 4 to 1
              </Typography.Body>
              <IoMdAddCircle className="text-blue-600 md:text-xl text-base" />
            </div>

            <div className="flex items-center gap-2 mt-3">
              <img src={book} alt="book" />
              <Typography.Heading4 variant="bold" className="text-primaryText">
                139
              </Typography.Heading4>
            </div>
          </div>
        </div>

        <div className="md:text-sm text-[12px] text-gray-500 mt-3">
          Last Update: 22 Jan 2025, 12:28 PM
        </div>
      </div>
    </div>
  );
};

export default QuizStatistics;
