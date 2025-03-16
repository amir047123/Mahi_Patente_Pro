import { Card, CardContent } from "@/Components/ui/card";
import Spinner from "@/Components/ui/Spinner";
import { TabsContent } from "@/Components/ui/tabs";
import { baseURL } from "@/Config";
import CustomInput from "@/Shared/Form/CustomInput";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ForgottenPasswordModal from "./ForgottenPasswordModal";

const AccountSettings = ({ user, isLoading, onSubmit }) => {
  const [isForgottenPassword, setIsForgottenPassword] = useState(false);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  const passwordMethods = useForm();
  const {
    handleSubmit: handlePasswordSubmit,
    reset: passwordReset,
    setError,
  } = passwordMethods;

  const onSubmitPassword = async (data) => {
    if (data?.oldPassword?.length < 6) {
      toast.error("Password must be at least 6 characters");

      setError("oldPassword", {
        type: "manual",
        message: "Old Password must be at least 6 characters",
      });
      return;
    }

    if (data?.newPassword?.length < 6) {
      toast.error("New Password must be at least 6 characters");
      setError("newPassword", {
        type: "manual",
        message: "New Password must be at least 6 characters",
      });
      return;
    }

    if (data?.newPassword !== data?.confirmPassword) {
      toast.error("New Password and Confirm Password must match");
      setError("newPassword", {
        type: "manual",
        message: "New Password and Confirm Password must match",
      });
      setError("confirmPassword", {
        type: "manual",
        message: "New Password and Confirm Password must match",
      });
      return;
    }

    try {
      setIsPasswordLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/user/reset-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      passwordReset();
      toast.success(responseData?.message || "Password updated successfully");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsPasswordLoading(false);
    }
  };

  useEffect(() => {
    setValue("profile.username", user?.profile?.username);
    setValue("auth.email", user?.auth?.email);
  }, [user, setValue]);

  return (
    <TabsContent value="account" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="grid grid-cols-2 px-28">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="border-r-2 pr-6"
              >
                <div className="space-y-6">
                  <CustomInput
                    type="text"
                    name="profile.username"
                    label="Account Username"
                    placeholder="Enter your username"
                    isEditable={user?.profile?.username ? false : true}
                  />

                  <CustomInput
                    type="email"
                    name="auth.email"
                    label="Account Email"
                    placeholder="Your email address"
                    isEditable={false}
                  />

                  <div
                    className={`col-span-2 flex justify-center ${
                      user?.profile?.username ? "hidden" : ""
                    }`}
                  >
                    <button
                      type="submit"
                      className="px-4 py-1.5 sm:py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/60 disabled:cursor-not-allowed w-fit rounded-full text-white font-semibold flex items-center justify-center min-w-[180px]"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner size={24} className="text-white" />
                      ) : (
                        "Update Username"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </FormProvider>
            <FormProvider {...passwordMethods}>
              <form
                onSubmit={handlePasswordSubmit(onSubmitPassword)}
                className="pl-6"
              >
                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <CustomInput
                        type={oldPasswordShown ? "text" : "password"}
                        name="oldPassword"
                        label="Old Password"
                        placeholder="Enter your old password"
                        iconType="password"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-[42px] text-secondaryText"
                        onClick={() => setOldPasswordShown((prev) => !prev)}
                      >
                        {oldPasswordShown ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => setIsForgottenPassword(true)}
                        type="button"
                        className="w-fit text-sm text-secondary"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <CustomInput
                      type={newPasswordShown ? "text" : "password"}
                      name="newPassword"
                      label="New Password"
                      placeholder="Set New Password"
                      iconType="password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[42px] text-secondaryText"
                      onClick={() => setNewPasswordShown((prev) => !prev)}
                    >
                      {newPasswordShown ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <CustomInput
                      type={confirmPasswordShown ? "text" : "password"}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      iconType="password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-[42px] text-secondaryText"
                      onClick={() => setConfirmPasswordShown((prev) => !prev)}
                    >
                      {confirmPasswordShown ? (
                        <Eye size={20} />
                      ) : (
                        <EyeOff size={20} />
                      )}
                    </button>
                  </div>
                  {!user?.profile?.username && (
                    <button
                      type="submit"
                      className="mt-8 px-4 py-1.5 sm:py-2 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
                      disabled={isPasswordLoading}
                    >
                      {isPasswordLoading ? (
                        <Spinner size={24} className="text-white" />
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  )}
                </div>
              </form>
            </FormProvider>

            <ForgottenPasswordModal
              isOpen={isForgottenPassword}
              setIsOpen={setIsForgottenPassword}
            />
          </div>

          {user?.profile?.username && (
            <button
              onClick={handlePasswordSubmit(onSubmitPassword)}
              className="col-span-2 mt-24 px-4 py-1.5 sm:py-2 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
              disabled={isPasswordLoading}
            >
              {isPasswordLoading ? (
                <Spinner size={24} className="text-white" />
              ) : (
                "Save"
              )}
            </button>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AccountSettings;
