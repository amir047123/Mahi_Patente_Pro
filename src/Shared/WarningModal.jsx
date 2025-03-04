import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { CircleCheck, TriangleAlert } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

export default function WarningModal({
  onConfirm,
  isOpen,
  setIsOpen,
  isDeleting,
  msg,
  success,
  refetchData = () => console.log("Implement refetchData!"),
  closeSuccess,
}) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          {!success ? (
            <Dialog.Content className="m-0 p-6 min-w-96 bg-white rounded-xl border border-slate-300 border-dashed">
              <div className="py-6 space-y-4 text-center">
                <div className="flex items-center justify-center">
                  <TriangleAlert size={60} className="text-red-400" />
                </div>

                <Typography.Heading4
                  variant="semibold"
                  className="text-primary_text"
                >
                  Are you Sure?
                </Typography.Heading4>

                <Typography.Base variant="regular" className="text-slate-500">
                  You are about to delete this item permanently.
                  <br /> This action cannot be undone.
                </Typography.Base>
              </div>

              <div className="flex items-center justify-center p-0 mt-6 gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-[150px] border py-2 rounded-xl ${
                    isDeleting ? "cursor-not-allowed" : "cursor-pointer "
                  }`}
                  disabled={isDeleting}
                >
                  <Typography.Body
                    variant="semibold"
                    className="text-secondaryText"
                  >
                    Cancel
                  </Typography.Body>
                </button>
                <button
                  onClick={onConfirm}
                  className={`w-[150px] bg-red-500 py-2 rounded-xl text-white ${
                    isDeleting ? "cursor-wait" : "cursor-pointer"
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Spinner size={20} sx={{ color: "white" }} />
                  ) : (
                    <Typography.Body variant="semibold">Delete</Typography.Body>
                  )}
                </button>
              </div>
            </Dialog.Content>
          ) : (
            <Dialog.Content className="relative min-w-96 overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-scaleIn m-0 border border-slate-300 border-dashed">
              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center">
                  <CircleCheck size={60} className="text-green-400" />
                </div>
                <div>
                  <Typography.Heading4
                    variant="semibold"
                    className="text-[#1A8245]"
                  >
                    Success!
                  </Typography.Heading4>
                  <Typography.Caption
                    variant="regular"
                    className="text-[#22AD5C] text-xs"
                  >
                    {msg}
                  </Typography.Caption>
                </div>
                <Typography.Base variant="regular" className="text-slate-500">
                  The item has been successfully <br />
                  deleted from the system.
                </Typography.Base>
              </div>

              <div className="flex items-center justify-center p-0 mt-6">
                <button
                  onClick={() => {
                    refetchData();
                    closeSuccess();
                    setIsOpen(false);
                  }}
                  className="w-[150px] bg-green-500 py-2 rounded-xl text-white"
                >
                  <Typography.Body variant="semibold">OK</Typography.Body>
                </button>
              </div>
            </Dialog.Content>
          )}
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
