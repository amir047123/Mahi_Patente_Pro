import Typography from "@/Components/Typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const AdminDashboardViewActivationModal = ({ isOpen, setIsOpen, item }) => {
  useEffect(() => {}, [isOpen, item]);

  const handleCopy = async () => {
    const activationCode = item?.token;
    try {
      if (!activationCode) {
        toast.error("Failed to copy activation code");
        return;
      }
      await navigator.clipboard.writeText(activationCode);
      toast.success(`${activationCode?.slice(0, 5)}... copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy activation code", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] lg:p-7 p-3 sm:p-5">
        <DialogHeader className=" border-b border-slate-300 pb-4 mb-2">
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">View Activation Details</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <div>
              <Typography.Heading4
                variant="semibold"
                className="text-secondary"
              >
                {item?.package?.name || "N/A"} Plan
              </Typography.Heading4>
              <Typography.Heading6
                variant="normal"
                className="text-secondaryText mt-1"
              >
                €{item?.price} | Duration:{" "}
                {item?.package?.duration === 30
                  ? "1 month"
                  : item?.package?.duration === 90
                  ? "3 month"
                  : item?.package?.duration === 180
                  ? "6 month"
                  : item?.package?.duration === 365
                  ? "1 year"
                  : `${item?.package?.duration || 0} days`}
              </Typography.Heading6>
            </div>

            <div className="mt-10">
              <Typography.Heading6 variant="semibold">
                What’s included
              </Typography.Heading6>
              <div className="">
                {item?.package?.features?.length > 0 ? (
                  item?.package?.features?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mt-2">
                      <FaCheckCircle size={16} className="text-secondary" />
                      <Typography.Base
                        variant="regular"
                        className="text-secondaryText text-sm"
                      >
                        {item}
                      </Typography.Base>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <FaCheckCircle size={16} className="text-secondary" />
                    <Typography.Base
                      variant="regular"
                      className="text-secondaryText text-sm"
                    >
                      N/A
                    </Typography.Base>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <div className="grid min-[400px]:grid-cols-2 gap-4">
                <div>
                  <Typography.Base variant="regular" className="">
                    Full Name
                  </Typography.Base>
                  <Typography.Base
                    variant="semibold"
                    className="mt-1 break-all"
                  >
                    {item?.subscriber?.user?.profile?.name || "N/A"}
                  </Typography.Base>
                </div>
                <div>
                  <Typography.Base variant="regular" className="">
                    Phone
                  </Typography.Base>
                  <Typography.Base
                    variant="semibold"
                    className="mt-1 break-all"
                  >
                    {item?.subscriber?.user?.auth?.phone || "N/A"}
                  </Typography.Base>
                </div>
                <div>
                  <Typography.Base variant="regular" className="">
                    Email
                  </Typography.Base>
                  <Typography.Base
                    variant="semibold"
                    className="mt-1 break-all"
                  >
                    {item?.subscriber?.user?.auth?.email || "N/A"}
                  </Typography.Base>
                </div>
                <div>
                  <Typography.Base variant="regular" className="">
                    Username
                  </Typography.Base>
                  <Typography.Base
                    variant="semibold"
                    className="mt-1 break-all"
                  >
                    {item?.subscriber?.user?.profile?.username || "N/A"}
                  </Typography.Base>
                </div>
              </div>
            </div>

            <div className="mt-2">
              <div className="flex item-center justify-end gap-2">
                <span className="px-2 py-1 bg-[#D97706] text-white rounded-full font-medium text-xs">
                  PREMIUM
                </span>
                <span className="px-2 py-1 bg-[#C2F3D6] text-[#1A8245] rounded-full font-medium text-xs">
                  Active
                </span>
              </div>

              <div className="mt-6 grid min-[400px]:grid-cols-2 gap-4">
                <div>
                  <Typography.Base variant="regular" className="">
                    Subscription ID
                  </Typography.Base>
                  <button onClick={handleCopy}>
                    <Typography.Heading5
                      variant="semibold"
                      className="mt-1 break-all text-left"
                    >
                      62114347517739008
                    </Typography.Heading5>
                  </button>
                </div>
                <div>
                  <Typography.Base variant="regular" className="">
                    Expires At
                  </Typography.Base>
                  <Typography.Heading5 variant="semibold" className="mt-1">
                    Fri, March 21, 2025
                  </Typography.Heading5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-5 items-center">
          <DialogClose asChild>
            <button className="border border-secondary/50 px-6 py-2.5 text-sm font-medium text-secondary rounded-full w-full">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboardViewActivationModal;
