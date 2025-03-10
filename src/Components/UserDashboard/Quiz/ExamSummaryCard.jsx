import Typography from "@/Components/Typography";
import { Link } from "react-router-dom";

export default function ExamSummaryCard({ item }) {
  const progressWidth = `${
    (item?.scoreInfo?.correctQuizzes * 100) / item?.scoreInfo?.totalQuizzes
  }%`;

  return (
    <div className="px-8 py-6 text-[#333] bg-white border rounded-3xl w-full flex flex-wrap lg:flex-nowrap items-center gap-6">
      <div className="w-full">
        <Typography.Heading5
          className="text-primaryText leading-7 whitespace-nowrap  mt-1"
          variant="semibold"
        >
          Exam Summary
        </Typography.Heading5>
        <Typography.Body variant="normal" className="text-secondaryText mt-1">
          {new Date(item?.timeInfo?.end).toLocaleString()}
        </Typography.Body>
      </div>
      <div className="w-full">
        <Typography.Base variant="semibold">
          Total Questions: {item?.scoreInfo?.totalQuizzes}
        </Typography.Base>
        <div className="w-full bg-red-500 rounded-full h-2.5 my-2">
          <div
            className="bg-green-500 rounded-full h-2.5"
            style={{ width: progressWidth }}
          ></div>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Typography.Base variant="medium" className="text-green-500">
            Correct: {item?.scoreInfo?.correctQuizzes || 0}
          </Typography.Base>
          <Typography.Base variant="medium" className="text-red-500">
            Wrong: {item?.scoreInfo?.incorrectQuizzes || 0}
          </Typography.Base>
          <Typography.Base variant="medium" className="text-orange-500">
            Skipped: {item?.scoreInfo?.notSubmittedQuizzes || 0}
          </Typography.Base>
        </div>
      </div>

      <div className="w-full text-right">
        <Link
          to={`/user-dashboard/quiz/error-review/${item?._id}`}
          className="rounded-full px-6 py-2 bg-pink-600 text-white font-semibold text-nowrap"
        >
          Review Errors
        </Link>
      </div>
    </div>
  );
}
