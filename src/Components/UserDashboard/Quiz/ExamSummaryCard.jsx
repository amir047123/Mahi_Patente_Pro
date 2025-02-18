import Typography from "@/Components/Typography";

export default function ExamSummaryCard({ item }) {
  const progressWidth = `${(item?.correct * 100) / item?.total}%`;

  return (
    <div className="px-8 py-6 text-[#333] bg-white border rounded-3xl w-full flex items-center gap-6">
      <div className="w-full">
        <Typography.Heading4
          className="text-primaryText leading-7  mt-1"
          variant="semibold"
        >
          Exam Summary
        </Typography.Heading4>
        <Typography.Body variant="medium" className="text-secondaryText mt-1">
          {new Date(item?.updatedAt).toLocaleString()}
        </Typography.Body>
      </div>
      <div className="w-full">
        <Typography.Base variant="semibold">
          Total Questions: {item?.total}
        </Typography.Base>
        <div className="w-full bg-red-500 rounded-full h-2.5 my-2">
          <div
            className="bg-green-500 rounded-full h-2.5"
            style={{ width: progressWidth }}
          ></div>
        </div>
        <div className="flex items-center justify-between">
          <Typography.Base variant="medium" className="text-green-500">
            Correct: {item?.correct}
          </Typography.Base>
          <Typography.Base variant="medium" className="text-red-500">
            Wrong: {item?.wrong}
          </Typography.Base>
          <Typography.Base variant="medium" className="text-orange-500">
            Skipped: {item?.skip}
          </Typography.Base>
        </div>
      </div>

      <div className="w-full text-right">
        <button className="rounded-full px-6 py-2 bg-pink-600 text-white font-semibold text-nowrap">
          Review Errors
        </button>
      </div>
    </div>
  );
}
