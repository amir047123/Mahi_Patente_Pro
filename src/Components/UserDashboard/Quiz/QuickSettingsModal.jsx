import * as Dialog from "@radix-ui/react-dialog";
import settings from "@/assets/UserDashboard/settings.svg";
import Typography from "@/Components/Typography";
import * as Switch from "@radix-ui/react-switch";
import { Link } from "react-router-dom";
import Spinner from "@/Components/ui/Spinner";

export default function QuickSettingsModal({
  isOpen,
  setIsOpen,
  getQuizzes,
  isLoading,
  showAnswer,
  setShowAnswer,
  hasTimer,
  setHasTimer,
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          <Dialog.Content
            onInteractOutside={(e) => e.preventDefault()}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-fadeIn"
          >
            <Dialog.Title className="text-secondary !text-xl font-semibold">
              Quick Settings
            </Dialog.Title>
            <div className="flex flex-col items-center justify-center text-center mt-8">
              <img src={settings} alt="settings" className="mb-10" />

              <div className="w-full mb-10 px-8">
                <div className="flex items-center gap-4 justify-between">
                  <Typography.Heading5 variant="bold" className="">
                    Show answers after each question
                  </Typography.Heading5>

                  <Switch.Root
                    className="relative h-[25px] w-[42px] cursor-default rounded-full bg-slate-300/70 shadow-md outline-none transition-all data-[state=checked]:bg-secondary"
                    id="showAnswer"
                    checked={showAnswer}
                    onCheckedChange={setShowAnswer}
                  >
                    <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                </div>
                <div className="flex items-center gap-4 justify-between mt-4">
                  <Typography.Heading5 variant="bold" className="">
                    Set Timer Preference
                  </Typography.Heading5>

                  <Switch.Root
                    className="relative h-[25px] w-[42px] cursor-default rounded-full bg-slate-300/70 shadow-md outline-none transition-all data-[state=checked]:bg-secondary"
                    id="hasTimer"
                    checked={hasTimer}
                    onCheckedChange={setHasTimer}
                  >
                    <Switch.Thumb className="block size-[21px] translate-x-0.5 rounded-full bg-white shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                </div>
              </div>
              <button
                onClick={getQuizzes}
                className="px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size={24} className="text-white" />
                ) : (
                  "Start Quiz"
                )}
              </button>
              <Link
                to="/user-dashboard/quiz"
                className="mt-3 w-full rounded-full border border-secondary bg-white px-4 py-3 text-secondary"
              >
                Back to Home
              </Link>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
