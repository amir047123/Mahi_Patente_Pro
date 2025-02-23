import Typography from "@/Components/Typography";
import bg from '@/assets/UserDashboard/daily-goal.png'
import SmallPieChart from "./SmallPieChart";
import coin from '@/assets/UserDashboard/coin.svg'



function DailyGoal() {

  return (
    <div className="">
      <Typography.Heading5 className="text-primaryText">
        Daily Goal
      </Typography.Heading5>

      <div className="mt-3 relative ">
        <img className="w-full h-[190px] object-cover rounded-2xl" src={bg} alt="bg" />

        <Typography.Heading4
          variant="bold"
          className="text-[#FEF3C7] absolute top-3 left-5 w-[235px] leading-7"
        >
          Answer the quizzes and Earn daily coins!
        </Typography.Heading4>

        <div className="absolute bottom-3 left-3 flex items-center">
          <SmallPieChart
            primaryColor={"#FDE68A"}
            secondaryColor={"#666666"}
            value={75}
          />

          <img className="w-6 ml-3 mr-2" src={coin} alt="coin" />
          <Typography.Title variant="bold" className="text-[#FDE68A]">
            120
          </Typography.Title>
          <Typography.Heading6 variant="bold" className="text-[#7C7C7C]">
            /150
          </Typography.Heading6>
        </div>
      </div>
    </div>
  );
}

export default DailyGoal;
