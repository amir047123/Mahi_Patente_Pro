import Typography from "@/Components/Typography";
import FeedQuizQuestionCard from "@/Components/UserDashboard/Quiz/FeedQuizQuestionCard";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import FailedModal from "@/Shared/FailedModal";
import SuccessModal from "@/Shared/SuccessModal";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserDashboardFeedQuizQuestion() {
  const query = useQueryClient();
  const [quizzes, setQuizzes] = useState([]);
  const { useFetchEntities } = useCrudOperations("quiz/feed");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailedModalOpen, setIsFailedModalOpen] = useState(false);

  const {
    data: response,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useFetchEntities({ category: "Theory" });

  useEffect(() => {
    if (isSuccess && response?.success && response?.data?.length > 0) {
      setQuizzes(response?.data);
    }
  }, [response, isSuccess]);

  useEffect(() => {
    if (quizzes?.length === 0) {
      query.invalidateQueries({
        queryKey: ["quiz/feed"],
      });
    }
  }, [quizzes, query]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const handleAnswer = (index, answer) => {
    if (`${answer}` === quizzes[index]?.correctAnswer) {
      setIsSuccessModalOpen(true);
    } else {
      setIsFailedModalOpen(true);
    }

    setQuizzes((prev) => prev?.filter((_, i) => index !== i));
  };

  return (
    <>
      <div>
        <Typography.Heading4
          variant="semibold"
          className="mt-4 text-primaryText"
        >
          Feed Quiz Question
        </Typography.Heading4>
        <Typography.Body className="text-secondaryText mt-1">
          Earn a QuizCoin or lose a kW of charge. Are you up for the challenge?
        </Typography.Body>
      </div>

      <div className="mt-5 space-y-4">
        {quizzes?.map((quiz, index) => (
          <FeedQuizQuestionCard
            key={index}
            quiz={quiz}
            index={index}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        setIsOpen={setIsSuccessModalOpen}
        title="Awesome"
        msg="Your answer is correct."
        desc="You are doing very well! Try solving more quizzes."
      />

      <FailedModal
        isOpen={isFailedModalOpen}
        setIsOpen={setIsFailedModalOpen}
        title="Sorry!"
        msg="Your answer is wrong."
        desc="You failed this time. Try solving more quizzes."
      />
    </>
  );
}
