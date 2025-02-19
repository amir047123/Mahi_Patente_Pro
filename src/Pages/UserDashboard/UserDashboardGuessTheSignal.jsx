import DashboardBreadcrumb from '@/Shared/DashboardBreadcrumb/DashboardBreadcrumb';
import  { useState } from 'react';
import img from "@/assets/UserDashboard/guess-the-signal.svg";
import { CircleHelp, Clock } from 'lucide-react';
import Typography from '@/Components/Typography';
import { Link } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const UserDashboardGuessTheSignal = () => {
    const [position, setPosition] = useState(1);
    const [selected, setSelected] = useState("Supplimentary Panels");
    return (
      <div>
        <DashboardBreadcrumb
          items={[
            { name: "Quiz", path: "quiz" },
            { name: "guess-the-signal", path: "Guess the Signal" },
          ]}
        />

        <div className="col-span-1 md:col-span-3 grid grid-cols-5 md:grid-cols-10 gap-2 bg-[#E5E7EB] p-3 rounded-lg my-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              onClick={() => setPosition(num)}
              key={num}
              className={`rounded-lg bg-white py-1.5 font-semibold text-2xl shadow-sm text-center 
                ${num === position ? " text-[#CB2A8A]" : " text-[#9CA3AF]"}`}
            >
              {num}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
          <div className="bg-white rounded-2xl p-5 col-span-1">
            <img className="w-full" src={img} alt="image" />
          </div>
          <div className="bg-white rounded-2xl px-5 col-span-2 pb-10">
            <div className="flex items-center justify-between md:p-4 p-2 border-b">
              <div className="flex items-center md:gap-5 gap-2">
                <Typography.Body
                  variant="medium"
                  className="text-secondaryText whitespace-nowrap"
                >
                  <span className="hidden md:inline-block">Question</span> No.
                </Typography.Body>
                <button className="px-3 py-2 font-semibold rounded-md border text-secondary">
                  3
                </button>
              </div>

              <div className="flex items-center md:gap-5 gap-2">
                <Typography.Body
                  variant="medium"
                  className="text-secondaryText whitespace-nowrap"
                >
                  Remaining Time:
                </Typography.Body>
                <button className="px-3 font-semibold whitespace-nowrap md:text-xl text-base py-1.5 rounded-sm bg-[#FEF3C7] flex items-center gap-2">
                  <Clock size={20} /> 32 : 31
                </button>
              </div>
            </div>

            <Typography.Body
              variant="semibold"
              className="text-secondaryText my-4"
            >
              Guess the sign depicted
            </Typography.Body>

            <div className="grid sm:grid-cols-2 grid-cols-1 md:gap-5 gap-3 mt-8">
              <button
                onClick={() => setSelected("Supplimentary Panels")}
                className={`py-3 md:px-7 px-2 rounded-lg w-full ${
                  selected === "Supplimentary Panels"
                    ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                    : "text-primaryText bg-white border"
                }`}
              >
                Supplimentary Panels
              </button>
              <button
                onClick={() => setSelected("Danger Signs")}
                className={`py-3 md:px-7 px-2 rounded-lg w-full ${
                  selected === "Danger Signs"
                    ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                    : "text-primaryText bg-white border"
                }`}
              >
                Danger Signs
              </button>
              <button
                onClick={() => setSelected("Mandatory Signs")}
                className={`py-3 md:px-7 px-2 rounded-lg w-full ${
                  selected === "Mandatory Signs"
                    ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                    : "text-primaryText bg-white border"
                }`}
              >
                Mandatory Signs
              </button>
              <button
                onClick={() => setSelected("Indecator Signs")}
                className={`py-3 md:px-7 px-2 rounded-lg w-full ${
                  selected === "Indecator Signs"
                    ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                    : "text-primaryText bg-white border"
                }`}
              >
                Indecator Signs
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-5 text-primaryText w-fit mx-auto mt-8">
          <Link
            to="/user-dashboard/quiz"
            className="bg-white rounded-lg px-5 py-2.5 font-medium shadow-sm flex items-center text-red-600 gap-2"
          >
            <IoIosCloseCircleOutline className="text-xl" />
            Close Quiz
          </Link>
          <button className="bg-white rounded-lg px-5 py-2.5 font-medium shadow-sm flex items-center  gap-2 text-sm">
            <CircleHelp size={18} className="text-sm" />
            Start New Quiz
          </button>
        </div>
      </div>
    );
};

export default UserDashboardGuessTheSignal;