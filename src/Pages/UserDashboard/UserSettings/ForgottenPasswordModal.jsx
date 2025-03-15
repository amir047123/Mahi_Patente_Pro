import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import Spinner from "@/Components/ui/Spinner";
import { baseURL } from "@/Config";
import { useAuthContext } from "@/Context/AuthContext";
import CustomInput from "@/Shared/Form/CustomInput";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ForgottenPasswordModal = ({ isOpen, setIsOpen, type = "" }) => {
  const { user } = useAuthContext();
  const [step, setStep] = useState("sendOTP");
  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);

  const methods = useForm();
  const { handleSubmit, setValue, setError, reset } = methods;

  const onSubmit = async (formData) => {
    let updatedData = {
      email: type === "signin" ? formData?.email : user?.auth?.email,
    };

    let url = `${baseURL}/user/sendOTP`;

    if (step === "sendOTP") {
      url = `${baseURL}/user/send-otp-for-forget-password`;
    } else if (step === "OTPSent") {
      url = `${baseURL}/user/verify-otp-for-security`;
      updatedData = {
        otp: formData?.otp,
        email: type === "signin" ? formData?.email : user?.auth?.email,
      };

      if (formData?.otp?.length !== 6) {
        toast.error("OTP Must Be At least 6 Digits");
        setError("otp", {
          type: "manual",
          message: "OTP Must Be At least 6 Digits",
        });

        return;
      }
    } else {
      url = `${baseURL}/user/reset-password-by-forgot-password`;
      updatedData = {
        email: type === "signin" ? formData?.email : user?.auth?.email,
        newPassword: formData?.newPassword,
      };
      if (formData?.newPassword?.length < 6) {
        toast.error("New Password must be at least 6 characters");
        setError("newPassword", {
          type: "manual",
          message: "Password must be at least 6 characters",
        });
        return;
      }
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (step === "sendOTP") {
        setStep("OTPSent");
      } else if (step === "OTPSent") {
        setStep("resetPassword");
      } else {
        setIsOpen(false);
      }

      toast.success(responseData?.message || "Action Successfull");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
    setStep("sendOTP");
    setValue("email", user?.auth?.email);
  }, [setValue, user, isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className=" overflow-y-auto max-h-screen  max-w-xl bg-[#ECF2F8]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
            <span className="whitespace-nowrap">Forgotten Password</span>
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="bg-white p-5 rounded-2xl pb-8 my-1 ">
            <div className="mt-4">
              <div className={`${step === "sendOTP" ? "" : "hidden"}`}>
                <p className="mb-6">
                  Send OTP To Your Email For Password Reset
                </p>

                <CustomInput
                  name="email"
                  placeholder="Your Email"
                  label="Your Email"
                  isEditable={type === "signin" ? true : false}
                  required={false}
                />
              </div>

              <div className={`${step === "OTPSent" ? "" : "hidden"}`}>
                <p className="mb-6">An OTP has sent to your email</p>

                <CustomInput
                  type="number"
                  name="otp"
                  placeholder="_ _ _ _ _ _"
                  label="OTP"
                  required={false}
                />
              </div>

              <div
                className={`relative ${
                  step === "resetPassword" ? "" : "hidden"
                }`}
              >
                <CustomInput
                  type={newPasswordShown ? "text" : "password"}
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter your new password"
                  iconType="password"
                  required={false}
                />
                <button
                  type="button"
                  className="absolute right-3 top-[42px] text-secondaryText"
                  onClick={() => setNewPasswordShown((prev) => !prev)}
                >
                  {newPasswordShown ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>

        <DialogFooter className="flex gap-5 items-center">
          <button
            onClick={handleSubmit(onSubmit)}
            className="text-sm px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner size={20} className="text-white" />
            ) : step === "sendOTP" ? (
              "Send OTP"
            ) : step === "OTPSent" ? (
              "Verify OTP"
            ) : (
              "Update Password"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgottenPasswordModal;
