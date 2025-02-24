import Typography from "@/Components/Typography";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import quizResult from "@/assets/UserDashboard/quiz-result.svg";
import coin from "@/assets/UserDashboard/coin.svg";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function UserDashboardQuizResult({
  data = { progress: 120, total: 150 },
}) {
  const progressWidth = `${(data?.progress * 100) / data?.total}%`;
  return (
    <div>
      <DashboardBreadcrumb
        role="user"
        items={[
          { name: "Quiz", path: "quiz" },
          { name: "Result", path: "quiz/result" },
        ]}
      />

      <div className="p-4 bg-[#F7F7F7] rounded-md mt-4 grid grid-cols-2 gap-16 items-center justify-center">
        <img
          src={quizResult}
          alt="img"
          className="w-full h-full object-cover"
        />
        <div className="text-center mr-10">
          <Typography.Heading2>Incomplete quiz</Typography.Heading2>
          <Typography.Base variant="regular" className="mt-4">
            Almost there! You missed some questions,
            <br /> but you still earned{" "}
            <span className="text-orange-600 font-medium">120 Coins</span>. Try
            again!
          </Typography.Base>

          <div className="px-6 py-4 grid grid-cols-2 gap-16 bg-white rounded-md mt-12">
            <div>
              <div className="flex items-center justify-between">
                <Typography.Base variant="regular">Wrong</Typography.Base>
                <ThumbsDown className="text-red-500" />
              </div>
              <Typography.Heading3 className="text-left">3</Typography.Heading3>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Typography.Base variant="regular">Right</Typography.Base>
                <ThumbsUp className="text-green-500" />
              </div>
              <Typography.Heading3 className="text-left">4</Typography.Heading3>
            </div>
          </div>

          <div className="p-6 bg-white rounded-md mt-4">
            <Typography.Base variant="bold" className="text-left">
              Your daily goal
            </Typography.Base>

            <div className="flex items-center justify-between mt-3">
              <Typography.Base variant="regular" className="text-[#666]">
                Sunday
              </Typography.Base>
              <div className="flex items-center gap-2">
                <img src={coin} alt="coin" className="w-6" />
                <Typography.Body className="text-secondaryText">
                  {data?.progress}/{data?.total}
                </Typography.Body>
              </div>
            </div>

            <div className="w-full bg-[#E1E1E1] rounded-full h-2.5 mt-2">
              <div
                className="bg-secondary rounded-full h-2.5"
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>

          <button className="w-full rounded-full bg-secondary px-4 py-3 text-white mt-12">
            Try new quiz
          </button>
          <button className="mt-3 w-full rounded-full border border-secondary bg-white px-4 py-3 text-secondary">
            Review the answers
          </button>
        </div>
      </div>
    </div>
  );
}
