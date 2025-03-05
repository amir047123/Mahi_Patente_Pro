import Typography from "@/Components/Typography";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { Ban, CircleX, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import QuizReviewCard from "../QuizReviewCard";

export default function QuizReviewModal({ isOpen, setIsOpen, item }) {
  const [tab, setTab] = useState("wrong");
  const activeTab =
    "data-[state=active]:text-primary data-[state=active]:!font-semibold data-[state=active]:border-b-4 data-[state=active]:border-primary";

  const quizReviewData = [
    {
      _id: "67baf1c2359fbd8c03e15562",
      question: "Quo in natus in maio",
      options: ["True", "False"],
      correctAnswer: "0",
      inherit: {
        category: "67b6fb4ad69d13441660b357",
        chapter: "67b6ff602c181da4eea6e33e",
        subject: "67b74d95a14b8cbfa66896bf",
      },
      meta: {
        difficulty: "Easy",
        quizType: "true_false",
        status: "Active",
      },
      media: {
        image:
          "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740304824/development/myFile-1740304823051.png",
        sound: "Aut cum sed assumend",
      },
      answer: 0,
    },
    {
      _id: "67b9c4b64e12d4facb9a6554",
      question: "Ut voluptatem fugia",
      options: ["True", "False"],
      correctAnswer: "0",
      inherit: {
        category: "67b6fb4ad69d13441660b357",
        chapter: "67b6ff602c181da4eea6e33e",
        subject: "67b74d95a14b8cbfa66896bf",
      },
      meta: {
        difficulty: "Easy",
        quizType: "true_false",
        status: "Active",
      },
      media: {
        image:
          "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740227755/development/myFile-1740227754144.png",
        sound: "Blanditiis culpa et",
      },
      answer: 1,
    },
    {
      _id: "67b98565c97fb1868cc45e43",
      question: "Dolore vel est ut e",
      options: ["True", "False"],
      correctAnswer: "0",
      inherit: {
        category: "67b6fb4ad69d13441660b357",
        chapter: "67b6ff2f2c181da4eea6e326",
        subject: "67b74d9fa14b8cbfa66896c3",
      },
      meta: {
        difficulty: "Easy",
        quizType: "true_false",
        status: "Inactive",
      },
      media: {
        image:
          "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740211236/development/myFile-1740211230539.jpg",
        sound: "Alias ipsum fuga Es",
      },
      answer: 0,
    },
    {
      _id: "67baee7f359fbd8c03e154fa",
      question: "Vero eius cupidatat",
      options: [
        "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740303985/development/myFile-1740303984053.png",
        "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740303989/development/myFile-1740303988650.png",
        "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740303991/development/myFile-1740303991462.png",
        "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740303994/development/myFile-1740303994008.png",
      ],
      correctAnswer: "1",
      inherit: {
        category: "67b6fb4ad69d13441660b357",
        chapter: "67b6ff272c181da4eea6e322",
        subject: "67b74d9fa14b8cbfa66896c3",
      },
      meta: {
        difficulty: "Easy",
        quizType: "image_selector",
        status: "Active",
      },
      media: {
        sound: "Amet laborum sint s",
      },
      answer: 1,
    },
    {
      _id: "67b9c7864e12d4facb9a65b2",
      question: "Quisquam officiis du",
      options: ["True", "False"],
      correctAnswer: "0",
      inherit: {
        category: "67b6fb4ad69d13441660b357",
        chapter: "67b6ff2f2c181da4eea6e326",
        subject: "67b74d9fa14b8cbfa66896c3",
      },
      meta: {
        difficulty: "Easy",
        quizType: "true_false",
        status: "Inactive",
      },
      media: {
        image:
          "https://res.cloudinary.com/dqfrn46e7/image/upload/v1740228460/development/myFile-1740228459649.png",
        sound: "Iste sint ab dolorem",
      },
    },
  ];

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
                  className="flex items-center gap-10 mb-4 border-b border-slate-300 text-secondaryText"
                >
                  <Tabs.Trigger
                    value="wrong"
                    className={`flex items-center gap-2 py-2 ${activeTab}`}
                    onClick={() => setTab("wrong")}
                  >
                    <ThumbsDown size={20} className="text-red-500" />
                    <Typography.Base
                      variant={tab === "wrong" ? "semibold" : "regular"}
                    >
                      Wrong
                    </Typography.Base>
                    <span className="px-2 text-white bg-red-500 rounded-full">
                      {
                        quizReviewData?.filter(
                          (item) =>
                            item?.answer !== undefined &&
                            String(item?.answer) !== item?.correctAnswer
                        )?.length
                      }
                    </span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="right"
                    className={`flex items-center gap-2 py-2 font-normal ${activeTab}`}
                    onClick={() => setTab("right")}
                  >
                    <ThumbsUp size={20} className="text-green-500" />
                    <Typography.Base
                      variant={tab === "right" ? "semibold" : "regular"}
                    >
                      Right
                    </Typography.Base>
                    <span className="px-2 text-white bg-green-500 rounded-full">
                      {
                        quizReviewData?.filter(
                          (item) =>
                            item?.answer !== undefined &&
                            String(item?.answer) === item?.correctAnswer
                        )?.length
                      }
                    </span>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="skip"
                    className={`flex items-center gap-2 py-2 font-normal ${activeTab}`}
                    onClick={() => setTab("skip")}
                  >
                    <Ban size={20} className="text-secondaryText" />
                    <Typography.Base
                      variant={tab === "skip" ? "semibold" : "regular"}
                    >
                      No Answer
                    </Typography.Base>
                    <span className="px-2 text-white bg-primaryText rounded-full">
                      {
                        quizReviewData?.filter(
                          (item) => item?.answer === undefined
                        )?.length
                      }
                    </span>
                  </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="wrong">
                  <div className="flex flex-col gap-5 w-full">
                    {quizReviewData
                      ?.filter(
                        (item) =>
                          item?.answer !== undefined &&
                          String(item?.answer) !== item?.correctAnswer
                      )
                      ?.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={quizReviewData}
                        />
                      ))}
                  </div>
                </Tabs.Content>
                <Tabs.Content value="right">
                  <div className="flex flex-col gap-5 w-full">
                    {quizReviewData
                      ?.filter(
                        (item) =>
                          item?.answer !== undefined &&
                          String(item?.answer) === item?.correctAnswer
                      )
                      ?.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={quizReviewData}
                        />
                      ))}
                  </div>
                </Tabs.Content>
                <Tabs.Content value="skip">
                  <div className="flex flex-col gap-5 w-full">
                    {quizReviewData
                      ?.filter((item) => item?.answer === undefined)
                      ?.map((item, index) => (
                        <QuizReviewCard
                          key={index}
                          question={item}
                          quizReviewData={quizReviewData}
                        />
                      ))}
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
