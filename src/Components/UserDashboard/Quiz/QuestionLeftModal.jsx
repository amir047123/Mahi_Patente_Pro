import * as Dialog from "@radix-ui/react-dialog";
import clock from "@/assets/UserDashboard/clock.svg";
import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";

export default function QuestionLeftModal({
  isOpen,
  setIsOpen,
  skippedAnswer,
  isSubmitting,
  submitAnswers,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          <Dialog.Content className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-fadeIn">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={clock} alt="clock" />
              <Typography.Base variant="regular" className="mt-6">
                You still have to answer
              </Typography.Base>
              <Typography.Heading2 variant="bold" className="mt-2">
                {skippedAnswer?.length || 0} questions
              </Typography.Heading2>
              <Typography.Base variant="regular" className="my-8">
                To increase your chances of passing the test, we recommend that
                you answer all the questions.
              </Typography.Base>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full font-semibold border border-secondary text-secondary px-4 py-3 mb-4"
              >
                Review missing questions
              </button>

              <button
                onClick={submitAnswers}
                className="px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner size={24} className="text-white" />
                ) : (
                  "Submit answers"
                )}
              </button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
