import Typography from "@/Components/Typography";
import Spinner from "@/Components/ui/Spinner";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/Components/ui/dialog";

export default function WarningModal({
  onConfirm,
  isOpen,
  setIsOpen,
  isDeleting,
  msg,
  desc = "You are about to delete this item permanently.",
  success,
  refetchData = () => {},
  closeSuccess,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className=" overflow-y-auto max-h-screen  w-[400px] bg-[#ECF2F8]"
        hideCloseButton={true}
      >
        {!success ? (
          <>
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
                {desc}
                <br /> This action cannot be undone.
              </Typography.Base>
            </div>

            <DialogFooter className="flex items-center !justify-center p-0 mt-6 gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className={`w-[150px] border border-slate-300 py-2 rounded-xl ${
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
                className={`w-[150px] flex items-center justify-center bg-red-500 disabled:bg-red-500/70 py-2 rounded-xl text-white ${
                  isDeleting ? "cursor-wait" : "cursor-pointer"
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Spinner size={20} className={"text-white"} />
                ) : (
                  <Typography.Body variant="semibold">Delete</Typography.Body>
                )}
              </button>
            </DialogFooter>
          </>
        ) : (
          <>
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

            <DialogFooter className="flex items-center !justify-center p-0 mt-6">
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
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
