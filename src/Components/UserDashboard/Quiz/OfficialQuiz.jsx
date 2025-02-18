import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Clock, ChevronLeft, ChevronRight, AlignJustify } from "lucide-react";
import { useState } from "react";
import demoImg from "@/assets/UserDashboard/quiz-img.svg";
import Typography from "@/Components/Typography";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";

const OfficialQuiz = () => {
  const [range, setRange] = useState("1-10");
  const [position, setPosition] = useState(1);
  return (
    <>
      <DashboardBreadcrumb
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Official Quiz", path: "quiz/official-quiz" },
        ]}
      />
      <div className="">
        <div className="grid grid-cols-3">
          <button
            onClick={() => setRange("1-10")}
            className={`text-secondaryText p-3 rounded-t-lg ${
              range === "1-10" ? "bg-[#E5E7EB] !text-secondary" : ""
            }`}
          >
            <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
              Question 1 to 10
            </div>
          </button>
          <button
            onClick={() => setRange("11-20")}
            className={`text-secondaryText p-3 rounded-t-lg ${
              range === "11-20" ? "bg-[#E5E7EB] !text-secondary" : ""
            }`}
          >
            <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
              Question 11 to 20
            </div>
          </button>
          <button
            onClick={() => setRange("21-30")}
            className={`text-secondaryText p-3 rounded-t-lg ${
              range === "21-30" ? "bg-[#E5E7EB] !text-secondary" : ""
            }`}
          >
            <div className="bg-white rounded-lg px-10 py-2.5 font-semibold">
              Question 21 to 30
            </div>
          </button>
        </div>

        {/* Question number buttons */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-5 md:grid-cols-10 gap-2 bg-[#E5E7EB] p-3 rounded-r-lg rounded-bl-lg">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              onClick={() => setPosition(num)}
              key={num}
              className={`rounded-lg bg-white py-2 font-semibold text-2xl shadow-sm text-center 
                ${num === position ? " text-[#CB2A8A]" : " text-[#9CA3AF]"}`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="col-span-1 md:col-span-3 flex items-center space-x-1 overflow-x-auto bg-[#E5E7EB] p-3 mt-3 rounded-md">
          {[...Array(30)].map((_, i) => {
            const num = i + 1;

            return (
              <div
                key={num}
                className={`text-[#9CA3AF] bg-white rounded-sm w-[29px] h-[23px] flex items-center justify-center text-[12px] font-medium`}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="col-span-1 bg-white rounded-lg overflow-hidden">
            <img className="mx-auto" src={demoImg} alt="" />
          </div>
          <div className="col-span-2 bg-white rounded-lg flex flex-col justify-between pb-5">
            <div>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-5">
                  <Typography.Body
                    variant="medium"
                    className="text-secondaryText"
                  >
                    Question No.
                  </Typography.Body>
                  <button className="px-3 py-2 rounded-md border text-secondary">
                    3
                  </button>
                </div>

                <div className="flex items-center gap-5">
                  <Typography.Body
                    variant="medium"
                    className="text-secondaryText"
                  >
                    Remaining Time:
                  </Typography.Body>
                  <button className="px-3 font-semibold text-xl py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                    <Clock size={20} /> 32 : 31
                  </button>
                </div>
              </div>

              <div className="p-4">
                <Typography.Body>
                  The road can be divided into carriageways. The sign shown may
                  be associated with a maximum speed limit sign
                </Typography.Body>
              </div>
            </div>

            <div className="w-full flex items-center gap-5 px-4">
              <button className="w-full  flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-green-500 font-medium gap-2 border">
                <CiCircleCheck className="text-xl" /> True
              </button>
              <button className="w-full flex items-center justify-center py-2.5 rounded-full bg-[#E3FAFF] text-red-500 font-medium gap-2 border">
                <IoIosCloseCircleOutline className="text-xl" /> False
              </button>
            </div>
          </div>
        </div>

        {/* prev and next btn */}
        <div className="col-span-1 md:col-span-3 flex justify-between mt-5">
          <div className="flex space-x-2">
            <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2">
              <IoIosCloseCircleOutline className="text-xl" />
              Close
            </button>
            <button className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 gap-2 font-medium">
              <AlignJustify className="w-4 h-4 mr-1" />
              Summary
            </button>
          </div>

          <div className="flex space-x-2">
            <button className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Prev
            </button>
            <button className="bg-white rounded-lg px-4 py-2 shadow-sm flex items-center text-gray-600 font-medium">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficialQuiz;
