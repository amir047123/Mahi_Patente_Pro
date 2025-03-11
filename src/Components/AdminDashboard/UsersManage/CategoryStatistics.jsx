import Typography from "@/Components/Typography";
import {
  CircleCheckBig,
  Grid2x2Check,
  ShieldCheck,
  Sigma,
  Signpost,
} from "lucide-react";

function CategoryStatistics({ data }) {
  const officialQuiz = data?.find((item) => item?.categoryName === "Theory");
  const guessTheSignal = data?.find(
    (item) => item?.categoryName === "Guess the Signal"
  );
  const chooseTheSignal = data?.find(
    (item) => item?.categoryName === "Choose 4 to 1 Signal"
  );

  return (
    <div className=" ">
      <Typography.Heading6 variant="bold" className="text-primaryText">
        Users quiz category statistics
      </Typography.Heading6>
      <div className=" bg-white mt-3 w-full h-[180px] rounded-2xl p-5 grid grid-cols-3 gap-4 sm:gap-8 lg:gap-16">
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-1">
            <Typography.Body
              variant="medium"
              className="text-secondaryText line-clamp-1"
            >
              Official
            </Typography.Body>
            <ShieldCheck className="text-blue-500 min-w-6 min-h-6" />
          </div>
          <div className="flex items-center gap-2">
            <Sigma className="text-blue-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {officialQuiz?.totalQuizzes || 0}
            </Typography.Heading3>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig className="text-green-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {officialQuiz?.correctQuizzes || 0}
            </Typography.Heading3>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-1">
            <Typography.Body
              variant="medium"
              className="text-secondaryText line-clamp-1"
            >
              Guess The Signal
            </Typography.Body>
            <Signpost className="text-red-500 min-w-6 min-h-6" />
          </div>
          <div className="flex items-center gap-2">
            <Sigma className="text-blue-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {guessTheSignal?.totalQuizzes || 0}
            </Typography.Heading3>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig className="text-green-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {guessTheSignal?.correctQuizzes || 0}
            </Typography.Heading3>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between gap-1">
            <Typography.Body
              variant="medium"
              className="text-secondaryText line-clamp-1"
            >
              Choose 4 to 1 Signal
            </Typography.Body>
            <Grid2x2Check className="text-green-500 min-w-6 min-h-6" />
          </div>
          <div className="flex items-center gap-2">
            <Sigma className="text-blue-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {chooseTheSignal?.totalQuizzes || 0}
            </Typography.Heading3>
          </div>
          <div className="flex items-center gap-2">
            <CircleCheckBig className="text-green-500" />
            <Typography.Heading3
              variant="bold"
              className="text-primaryText text-left"
            >
              {chooseTheSignal?.correctQuizzes || 0}
            </Typography.Heading3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryStatistics;
