import Typography from "@/Components/Typography";
import { Button } from "@/Components/ui/button";

function Summary() {
  const totalQuestions = 30;
  const correct = 23;
  const wrong = 7;
  const skipped = 0;

  const correctPercent = (correct / totalQuestions) * 100;
  const wrongPercent = (wrong / totalQuestions) * 100;
  const skippedPercent = (skipped / totalQuestions) * 100;
  return (
    <div className="">
      <Typography.Heading5 className="text-primaryText">
        Your State
      </Typography.Heading5>
      <div className="flex xl:flex-nowrap flex-wrap items-center w-full bg-white mt-3  rounded-2xl p-7 xl:gap-16 lg:gap-10 gap-5">
        <div className="space-y-2">
          <Typography.Heading5
            variant="bold"
            className="whitespace-nowrap text-primaryText"
          >
            Exam Summary
          </Typography.Heading5>
          <p className="text-sm text-secondaryText">16 Feb 2025, 12:00 PM</p>
        </div>

        <div className="flex md:flex-nowrap flex-wrap items-center xl:gap-16 lg:gap-10 gap-5 w-full">
          <div className="space-y-2 w-full">
            <div className="flex justify-between text-sm text-gray-600">
              <Typography.Body variant="semibold" className="text-primaryText">
                Total Questions: {totalQuestions}
              </Typography.Body>
            </div>

            <div className="h-2.5 w-full rounded-full overflow-hidden flex">
              <div
                className="bg-[#2CD673] h-full"
                style={{ width: `${correctPercent}%` }}
              />
              <div
                className="bg-[#F23030] h-full"
                style={{ width: `${wrongPercent}%` }}
              />
              <div
                className="bg-orange-400 h-full"
                style={{ width: `${skippedPercent}%` }}
              />
            </div>

            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2CD673]" />
                <span>Correct: {correct}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F23030]" />
                <span>Wrong: {wrong}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400" />
                <span>Skipped: {skipped}</span>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white rounded-full  px-6"
          >
            Review Errors
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Summary;
