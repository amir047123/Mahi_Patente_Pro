import Typography from "@/Components/Typography";
import { CircleCheck } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/Components/ui/dialog";

export default function SuccessModal({
  isOpen,
  setIsOpen,
  onClose = () => {},
  msg,
  desc,
  title,
  refetchData = () => {},
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className=" overflow-y-auto max-h-screen  w-[400px] bg-[#ECF2F8]"
        hideCloseButton={true}
      >
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
                {title}
              </Typography.Heading4>
              <Typography.Caption
                variant="regular"
                className="text-[#22AD5C] text-xs"
              >
                {msg}
              </Typography.Caption>
            </div>
            <Typography.Base variant="regular" className="text-slate-500">
              {desc}
            </Typography.Base>
          </div>

          <DialogFooter className="flex items-center !justify-center p-0 mt-6">
            <button
              onClick={() => {
                onClose();
                refetchData();
                setIsOpen(false);
              }}
              className="w-[150px] bg-green-500 py-2 rounded-xl text-white"
            >
              <Typography.Body variant="semibold">OK</Typography.Body>
            </button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
}
