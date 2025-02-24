import * as Dialog from "@radix-ui/react-dialog";
import clock from "@/assets/UserDashboard/clock.svg";
import Typography from "@/Components/Typography";

export default function TimeLeftModal({ isOpen, setIsOpen, data }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Content className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-scaleIn">
            <div className="flex flex-col items-center justify-center text-center">
              <img src={clock} alt="clock" />
              <Typography.Base variant="regular" className="mt-6">
                Are you finished? You still have
              </Typography.Base>
              <Typography.Heading2 variant="bold" className="mt-2">
                19:29
              </Typography.Heading2>
              <Typography.Base variant="regular" className="my-8">
                You can recheck the questions and change your answer or check
                your result.
              </Typography.Base>

              <button className="w-full rounded-full bg-secondary px-4 py-3 text-white">
                Check the result
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full rounded-full border border-secondary bg-white px-4 py-3 text-secondary"
              >
                Check your answer again
              </button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
