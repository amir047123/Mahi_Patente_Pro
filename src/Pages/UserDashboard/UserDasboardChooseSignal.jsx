import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import { useState } from "react";
import oneWay from "@/assets/UserDashboard/one-way-road.svg";
import twoWay from "@/assets/UserDashboard/two-way-road.svg";
import twoCar from "@/assets/UserDashboard/two-car.svg";
import twoRoad from "@/assets/UserDashboard/two-road.svg";
import { CircleHelp, Clock } from "lucide-react";
import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const UserDasboardChooseSignal = () => {
  const [position, setPosition] = useState(1);
  const [selected, setSelected] = useState("two-car");
  return (
    <div>
      <DashboardBreadcrumb
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Choose 4 to 1 Signal", path: "quiz/choose-4-to-1-signal" },
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

      <div className="bg-white rounded-2xl px-5 pb-10 col-span-2">
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

        <Typography.Body variant="semibold" className="text-secondaryText my-4">
          Select the right signal
        </Typography.Body>
        <Typography.Body variant="nomal" className="text-primaryText my-4">
          Stopping lines for the public transport vehicles - Parking Spaces
        </Typography.Body>

        <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-3 mt-8">
          <button
            onClick={() => setSelected("two-car")}
            className={`py-3 px-7 rounded-lg w-full ${
              selected === "two-car"
                ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                : "text-primaryText bg-white border"
            }`}
          >
            <img src={twoCar} alt="" />
          </button>
          <button
            onClick={() => setSelected("two-road")}
            className={`py-3 px-7 rounded-lg w-full ${
              selected === "two-road"
                ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                : "text-primaryText bg-white border"
            }`}
          >
            <img src={twoRoad} alt="" />
          </button>
          <button
            onClick={() => setSelected("one-way")}
            className={`py-3 px-7 rounded-lg w-full ${
              selected === "one-way"
                ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                : "text-primaryText bg-white border"
            }`}
          >
            <img src={oneWay} alt="" />
          </button>
          <button
            onClick={() => setSelected("two-way")}
            className={`py-3 px-7 rounded-lg w-full ${
              selected === "two-way"
                ? "text-[#22AD5C] bg-[#EAFEEA] border border-[#22AD5C]"
                : "text-primaryText bg-white border"
            }`}
          >
            <img src={twoWay} alt="" />
          </button>
        </div>
      </div>

      <div className="flex gap-5 text-primaryText w-fit mx-auto mt-5">
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

export default UserDasboardChooseSignal;
