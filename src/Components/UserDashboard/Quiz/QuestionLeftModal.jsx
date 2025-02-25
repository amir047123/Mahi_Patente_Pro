import * as Dialog from "@radix-ui/react-dialog";
import clock from "@/assets/UserDashboard/clock.svg";
import Typography from "@/Components/Typography";

export default function QuestionLeftModal({ isOpen, setIsOpen, data }) {
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
                23 questions
              </Typography.Heading2>
              <Typography.Base variant="regular" className="my-8">
                To increase your chances of passing the test, we recommend that
                you answer all the questions.
              </Typography.Base>

              <button className="w-full rounded-full bg-secondary px-4 py-3 text-white">
                Review missing questions
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full rounded-full border border-secondary bg-white px-4 py-3 text-secondary"
              >
                Check anyway
              </button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
