import Typography from "@/Components/Typography";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Ban, CircleX, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import QuizReviewCard from "../QuizReviewCard";

export default function QuizReviewModal({ isOpen, setIsOpen, data }) {
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState([]);
  const [skipped, setSkipped] = useState([]);

  const [tab, setTab] = useState("wrong");
  const activeTab =
    "data-[state=active]:text-primary data-[state=active]:!font-semibold data-[state=active]:border-b-4 data-[state=active]:border-primary";

  useEffect(() => {
    if (data) {
      setWrong(
        data?.filter(
          (item) => item?.selectedAnswer !== null && item?.isCorrect === false
        )
      );
      setRight(
        data?.filter(
          (item) => item?.selectedAnswer !== null && item?.isCorrect === true
        )
      );
      setSkipped(
        data?.filter(
          (item) =>
            item?.selectedAnswer === null || item?.selectedAnswer === undefined
        )
      );
    }
  }, [data]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          <Dialog.Content className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#ECF2F8] p-6 shadow-lg focus:outline-none animate-fadeIn">
            <div className="flex items-center justify-between text-secondary mb-4">
              <Dialog.Title className="!text-xl font-semibold">
                Quiz Answer Review
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)}>
                <CircleX />
              </button>
            </div>

            <>
              <Tabs.Root value={tab} onValueChange={setTab}>
                <Tabs.List
                  aria-label="quiz review tabs"
                  className="flex items-center gap-4 sm:gap-10 mb-4 border-b border-slate-300 text-secondaryText"
                >
                  <Tabs.Trigger
                    value="wrong"
                    className={`flex items-center gap-2 py-2 ${activeTab}`}
                    onClick={() => setTab("wrong")}
                  >
                    <ThumbsDown
                      size={20}
                      className="text-red-500 hidden min-[450px]:block"
                    />
                    <Typography.Base
                      variant={tab === "wrong" ? "semibold" : "regular"}
                      className="text-xs min-[450px]:text-sm sm:text-base"
                    >
                      Wrong
                    </Typography.Base>
                    <span className="px-2 text-white bg-red-500 rounded-full text-xs min-[450px]:text-sm sm:text-base">
                      {wrong?.length}
                    </span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="right"
                    className={`flex items-center gap-2 py-2 font-normal ${activeTab}`}
                    onClick={() => setTab("right")}
                  >
                    <ThumbsUp
                      size={20}
                      className="text-green-500 hidden min-[450px]:block"
                    />
                    <Typography.Base
                      variant={tab === "right" ? "semibold" : "regular"}
                      className="text-xs min-[450px]:text-sm sm:text-base"
                    >
                      Right
                    </Typography.Base>
                    <span className="px-2 text-white bg-green-500 rounded-full text-xs min-[450px]:text-sm sm:text-base">
                      {right?.length}
                    </span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="skip"
                    className={`flex items-center gap-2 py-2 font-normal ${activeTab}`}
                    onClick={() => setTab("skip")}
                  >
                    <Ban
                      size={20}
                      className="text-secondaryText hidden min-[450px]:block"
                    />
                    <Typography.Base
                      variant={tab === "skip" ? "semibold" : "regular"}
                      className="text-xs min-[450px]:text-sm sm:text-base"
                    >
                      No Answer
                    </Typography.Base>
                    <span className="px-2 text-white bg-primaryText rounded-full text-xs min-[450px]:text-sm sm:text-base">
                      {skipped?.length}
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="wrong">
                  <div className="flex flex-col gap-5 w-full">
                    {wrong?.length > 0 ? (
                      wrong?.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={data}
                        />
                      ))
                    ) : (
                      <p className="my-4 text-center">No wrong answers</p>
                    )}
                  </div>
                </Tabs.Content>
                <Tabs.Content value="right">
                  <div className="flex flex-col gap-5 w-full">
                    {right?.length > 0 ? (
                      right?.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={data}
                        />
                      ))
                    ) : (
                      <p className="my-4 text-center">No right answers</p>
                    )}
                  </div>
                </Tabs.Content>
                <Tabs.Content value="skip">
                  <div className="flex flex-col gap-5 w-full">
                    {skipped?.length > 0 ? (
                      skipped.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={data}
                        />
                      ))
                    ) : (
                      <p className="my-4 text-center">No skipped answers</p>
                    )}
                  </div>
                </Tabs.Content>
              </Tabs.Root>
            </>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
