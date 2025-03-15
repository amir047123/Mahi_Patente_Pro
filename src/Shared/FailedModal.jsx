import Typography from "@/Components/Typography";
import { Dialog, DialogContent, DialogFooter } from "@/Components/ui/dialog";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function FailedModal({
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
              <IoCloseCircleOutline size={60} className="text-red-400" />
            </div>
            <div>
              <Typography.Heading4 variant="semibold" className="text-red-500">
                {title}
              </Typography.Heading4>
              <Typography.Caption
                variant="regular"
                className="text-red-500 text-xs"
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
              className="w-[150px] bg-red-500 py-2 rounded-xl text-white"
            >
              <Typography.Body variant="semibold">Close</Typography.Body>
            </button>
          </DialogFooter>
        </>
      </DialogContent>
    </Dialog>
  );
}
