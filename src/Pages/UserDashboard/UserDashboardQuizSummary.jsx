import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { Check, CircleHelp, Clock } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import quizImg from '@/assets/UserDashboard/quiz-img.svg'
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";


const UserDashboardQuizSummary = () => {
    return (
      <div>
        <DashboardBreadcrumb
          items={[
            { name: "Quiz", path: "quiz" },
            { name: "Official Quiz", path: "quiz/official-quiz" },
          ]}
        />

        <div className="bg-white  lg:p-8 p-5 rounded-2xl mt-5">
          <div className="flex items-center justify-between">
            <Typography.Heading4 className="text-secondaryText ">
              Summary
            </Typography.Heading4>
            <Link to="/user-dashboard/quiz">
              <IoCloseCircleOutline className="text-red-600 text-2xl" />
            </Link>
          </div>

          <div className="w-full overflow-x-auto my-5 ">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 border border-gray-300 text-left">No.</th>
                  <th className="p-4 border border-gray-300 text-left">
                    <Typography.Body>Image</Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-left">
                    <Typography.Body className="whitespace-nowrap">
                      Question Text
                    </Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-center">
                    <Typography.Body>True</Typography.Body>
                  </th>
                  <th className="p-4 border border-gray-300 text-center">
                    <Typography.Body>False</Typography.Body>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-red-100">
                  <td className="p-4 border border-gray-300">01</td>
                  <td className="p-4 border border-gray-300">
                    <img
                      className="rounded-full w-24"
                      src={quizImg}
                      alt="img"
                    />
                  </td>
                  <td className="p-4 border border-gray-300">
                    Following a road accident, the vehicles involved must not be
                    moved until any injured parties have been assisted and the
                    police have collected all the elements useful for
                    reconstructing the accident.
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    <Check className="inline-block text-green-600" size={24} />
                  </td>
                  <td className="p-4 border border-gray-300"></td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-4 border border-gray-300">02</td>
                  <td className="p-4 border border-gray-300"></td>
                  <td className="p-4 border border-gray-300">
                    On the digital tachograph display, the symbol in the figure
                    indicates the ferry or train mode
                  </td>
                  <td className="p-4 border border-gray-300 text-center"></td>
                  <td className="p-4 border border-gray-300">
                    {" "}
                    <Check className="inline-block text-green-600" size={24} />
                  </td>
                </tr>
                <tr className="bg-green-50">
                  <td className="p-4 border border-gray-300">03</td>
                  <td className="p-4 border border-gray-300">
                    <div className="w-12 h-8">
                      <svg viewBox="0 0 48 32" className="w-full h-full">
                        <path
                          d="M8 8 L40 8 L40 24 L8 24 Z"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 16 L32 16 M32 16 L28 12 M32 16 L28 20"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="p-4 border border-gray-300">
                    The warning light shown in the figure may come on if the oil
                    has not been replaced at the scheduled time.
                  </td>
                  <td className="p-4 border border-gray-300 text-center">
                    <Check className="inline-block text-green-600" size={24} />
                  </td>
                  <td className="p-4 border border-gray-300"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between mt-5">
          <div className="flex gap-5 text-primaryText">
            <Link
              to="/user-dashboard/quiz"
              className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center text-red-600 gap-2"
            >
              <IoIosCloseCircleOutline className="text-xl" />
              Close Quiz
            </Link>
            <button className="bg-white rounded-lg px-4 py-2 font-medium shadow-sm flex items-center  gap-2 text-sm">
              <CircleHelp size={18} className="text-sm" />
              Start New Quiz
            </button>
          </div>

          <div className="flex items-center gap-5">
            <Typography.Body variant="medium" className="text-secondaryText">
              Remaining Time:
            </Typography.Body>
            <button className="px-3 font-semibold text-xl py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
              <Clock size={20} /> 32 : 31
            </button>
          </div>
        </div>
      </div>
    );
};

export default UserDashboardQuizSummary;