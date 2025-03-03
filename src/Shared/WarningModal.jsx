import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { TicketCheck } from "lucide-react";
import { CiWarning } from "react-icons/ci";
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
            <Dialog.Content className="m-0 p-0 bg-white rounded-xl border border-slate-300 border-dashed">
              <div className="py-6 space-y-4 text-center">
                <CiWarning />

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

              <div className="justify-center p-0 mt-6 gap-6">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`w-[150px] ${
                    isDeleting ? "cursor-not-allowed" : "cursor-pointer "
                  }`}
                  disabled={isDeleting}
                >
                  <Typography.Body variant="medium">Cancel</Typography.Body>
                </button>
                <button
                  color="danger"
                  onClick={onConfirm}
                  className={`w-[150px] ${
                    isDeleting ? "cursor-wait" : "cursor-pointer"
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Spinner size={20} sx={{ color: "white" }} />
                  ) : (
                    <Typography.Body variant="medium">Delete</Typography.Body>
                  )}
                </button>
              </div>
            </Dialog.Content>
          ) : (
            <Dialog.Content className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-scaleIn m-0  border border-slate-300 border-dashed">
              <div className="p-6 space-y-4 text-center">
                <TicketCheck />
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

              <div className="justify-center p-0 mt-6">
                <button
                  color="primary"
                  onClick={() => {
                    refetchData();
                    closeSuccess();
                    setIsOpen(false);
                  }}
                  className="w-[150px] bg-title_gradient"
                >
                  <Typography.Body variant="medium">OK</Typography.Body>
                </button>
              </div>
            </Dialog.Content>
          )}
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
