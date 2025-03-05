import * as Dialog from "@radix-ui/react-dialog";
import clock from "@/assets/UserDashboard/clock.svg";
import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";

export default function TimeLeftModal({
  isOpen,
  setIsOpen,
  time,
  isSubmitting,
  submitAnswers,
}) {
  const formatTime = () => {
    // const hours = Math.floor(time / 3600)
    //   .toString()
    //   .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
    // return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          <Dialog.Content className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-scaleIn">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={clock} alt="clock" />
              <Typography.Base variant="regular" className="mt-6">
                Are you finished? You still have
              </Typography.Base>
              <Typography.Heading2 variant="bold" className="mt-2">
                {formatTime()}
              </Typography.Heading2>
              <Typography.Base variant="regular" className="my-8">
                You can recheck the questions and change your answer or check
                your result.
              </Typography.Base>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full font-semibold border border-secondary text-secondary px-4 py-3 mb-4"
              >
                Check your answer again
              </button>

              <button
                onClick={submitAnswers}
                className="px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center mb-4"
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
