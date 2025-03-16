import * as Dialog from "@radix-ui/react-dialog";
import redeemCodeImg from "@/assets/UserDashboard/redeemCode.svg";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Typography from "@/Components/Typography";

export default function RedeemCodeModal({ isOpen, setIsOpen }) {
  const query = useQueryClient();
  const [redeemCode, setRedeemCode] = useState("");

  const { createEntity } = useCrudOperations("redeemCode/create");

  const onSubmit = async () => {
    createEntity.mutate(
      { redeemCode },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          query.invalidateQueries({
            queryKey: ["redeemCode"],
          });
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn z-30" />

        <div className="fixed inset-0 flex items-center justify-center p-4 z-30">
          <Dialog.Content className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-lg focus:outline-none animate-fadeIn">
            <Dialog.Title className="text-secondary !text-xl font-semibold">
              Redeem Subscription
              <span className="block text-sm mt-2 text-secondaryText font-normal">
                To activate subscription, enter the redeem code and click the
                redeem button
              </span>
            </Dialog.Title>
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <img src={redeemCodeImg} alt="redeemCodeImg" className="py-4" />
              <Typography.Heading5 variant="medium">
                Enter Redeem Code
              </Typography.Heading5>
              <div className="px-20 w-full mb-6">
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value)}
                  placeholder="Enter your Redeem Code"
                  className="w-full px-4 py-2 sm:py-3 border border-secondaryText/40 rounded-full focus:outline-none"
                />
              </div>

              <button
                onClick={onSubmit}
                className="px-4 py-2 sm:py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
                disabled={createEntity.isPending}
              >
                {createEntity.isPending ? (
                  <Spinner size={24} className="text-white" />
                ) : (
                  "Redeem"
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full rounded-full border border-secondary bg-white px-4 py-2 sm:py-3 text-secondary"
              >
                Cancle
              </button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
