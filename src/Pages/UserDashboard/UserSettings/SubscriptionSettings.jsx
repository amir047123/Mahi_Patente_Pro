import Typography from "@/Components/Typography";
import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import RedeemCodeModal from "./RedeemCodeModal";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/Context/AuthContext";

const SubscriptionSettings = () => {
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const {
    backupUser: { subscription },
  } = useAuthContext();

  return (
    <TabsContent value="subscription" className="pt-6 pb-40">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
              <div>
                <Typography.Heading4 variant="semibold">
                  <span className="text-secondary">
                    {subscription?.subscriptionData?.package?.name} Plan
                  </span>{" "}
                  | Mahi Patente Pro
                </Typography.Heading4>
                <Typography.Heading6
                  variant="normal"
                  className="text-secondaryText mt-1"
                >
                  €{subscription?.subscriptionData?.price} | Duration:{" "}
                  {subscription?.subscriptionData?.package?.duration === 30
                    ? "month"
                    : subscription?.subscriptionData?.package?.duration === 90
                    ? "3 month"
                    : subscription?.subscriptionData?.package?.duration === 180
                    ? "6 month"
                    : subscription?.subscriptionData?.package?.duration === 365
                    ? "1 year"
                    : `${
                        subscription?.subscriptionData?.package?.duration || 0
                      } days`}
                </Typography.Heading6>
              </div>

              <div className="mt-10">
                <Typography.Heading6 variant="semibold">
                  What’s included
                </Typography.Heading6>
                {subscription?.subscriptionData?.package?.features?.map(
                  (feature, index) => (
                    <div className="flex items-center gap-4 mt-2" key={index}>
                      <FaCheckCircle size={20} className="text-secondary" />
                      <Typography.Base
                        variant="regular"
                        className="text-secondaryText"
                      >
                        {feature}
                      </Typography.Base>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              <div className="flex item-center gap-2">
                <span className="px-2 py-1 bg-[#D97706] text-white rounded-full font-medium text-xs">
                  PREMIUM
                </span>
                <span className="px-2 py-1 bg-[#C2F3D6] text-[#1A8245] rounded-full font-medium text-xs">
                  {subscription?.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
              </div>

              <div className="mt-6 grid min-[400px]:grid-cols-2 gap-4">
                <div>
                  <Typography.Base variant="regular" className="">
                    Current Redeem Code
                  </Typography.Base>
                  <Typography.Heading5
                    variant="semibold"
                    className="mt-1 break-all"
                  >
                    {subscription?.subscriptionData?.token}
                  </Typography.Heading5>
                </div>
                <div>
                  <Typography.Base variant="regular" className="">
                    Expires At
                  </Typography.Base>
                  <Typography.Heading5 variant="semibold" className="mt-1">
                    {new Date(
                      subscription?.subscriptionData?.expiresAt
                    )?.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Typography.Heading5>
                </div>
              </div>

              <div className="mt-6 sm:mt-20">
                <button
                  onClick={() => setIsRedeemModalOpen(true)}
                  className="w-full bg-[#F3F4F6] px-10 py-3 rounded-full text-[#4B5563] flex items-center justify-between"
                >
                  Redeem Code
                  <ChevronRight className="text-secondaryText" size={24} />
                </button>

                <Link
                  to="/user-dashboard/settings/purchase-history"
                  className="w-full mt-4 bg-[#F3F4F6] px-10 py-3 rounded-full text-[#4B5563] flex items-center justify-between"
                >
                  Purchase History
                  <ChevronRight className="text-secondaryText" size={24} />
                </Link>
              </div>
            </div>
          </div>

          <RedeemCodeModal
            isOpen={isRedeemModalOpen}
            setIsOpen={setIsRedeemModalOpen}
          />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SubscriptionSettings;
