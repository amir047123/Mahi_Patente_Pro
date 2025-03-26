import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import demoUser from "@/assets/UserDashboard/demoUser.svg";
import Spinner from "@/Components/ui/Spinner";
import toast from "react-hot-toast";
import useImageUploader from "@/Hooks/useImageUploader";
import { FaCamera } from "react-icons/fa6";
import Typography from "@/Components/Typography";

const ProfileSettings = ({ user, onSubmit, isLoading }) => {
  const methods = useForm();
  const { handleSubmit, register, setValue } = methods;
  const [profilePic, setProfilePic] = useState(
    user?.profile?.profilePicture || demoUser
  );

  useEffect(() => {
    setValue("auth.phone", user?.auth?.phone);
    setValue("profile.name", user?.profile?.name);
    setValue("profile.gender", user?.profile?.gender);
    setValue(
      "profile.dateOfBirth",
      user?.profile?.dateOfBirth
        ? new Date(user?.profile?.dateOfBirth).toISOString().split("T")[0]
        : ""
    );
    setProfilePic(user?.profile?.profilePicture || demoUser);
  }, [user, setValue]);

  const { uploadImage } = useImageUploader();

  const [isHovered, setIsHovered] = useState(false);
  const handleFileChangeDirectly = async (file) => {
    const toastId = toast.loading("Uploading profile picture...");
    try {
      const uploadedFileUrl = await uploadImage(file);
      if (uploadedFileUrl) {
        setProfilePic(uploadedFileUrl);
        setValue("profile.profilePicture", uploadedFileUrl);
        await onSubmit({
          profile: { profilePicture: uploadedFileUrl },
        });
      } else {
        toast.error("Failed to upload file. Please try again.");
      }
    } catch (error) {
      toast.error(
        `An error occurred while uploading: ${
          error instanceof Error ? error.message : error
        }`
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileChangeDirectly(file);
    }
  };

  const handleRemovePicture = async () => {
    const toastId = toast.loading("Removing profile picture...");
    try {
      await onSubmit({
        profile: { profilePicture: null },
      });
      setProfilePic(null);
      setValue("profile.profilePicture", null);
    } catch (error) {
      toast.error(
        `An error occurred while removing profile picture: ${
          error instanceof Error ? error.message : error
        }`
      );
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <TabsContent value="profile" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <div className="sm:px-10 lg:px-20 xl:px-36">
            <div className="flex min-[400px]:flex-row flex-col items-center gap-4 justify-center mb-6">
              <Typography.Heading5 variant="medium" className="text-secondary">
                Profile Picture
              </Typography.Heading5>
              <div>
                <label
                  tabIndex={0}
                  htmlFor="profilePicture"
                  className="cursor-pointer"
                  role="button"
                  aria-label="Upload profile picture"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      document.getElementById("profilePicture")?.click();
                    }
                  }}
                >
                  <div
                    className={`relative object-cover rounded-full cursor-pointer group`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img
                      src={
                        profilePic || user?.profile?.profilePicture || demoUser
                      }
                      alt={user?.profile?.name}
                      className="min-w-28 min-h-28 w-28 h-28 rounded-full"
                    />

                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black/50 rounded-full transition-opacity duration-300 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <FaCamera className="text-white w-4 h-4 opacity-80" />
                    </div>
                  </div>
                </label>

                <input
                  id={"profilePicture"}
                  type="file"
                  accept="image/*, application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-2 lg:gap-4">
                <label
                  tabIndex={0}
                  role="button"
                  aria-label="Upload profile picture"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      document.getElementById("profilePicture")?.click();
                    }
                  }}
                  htmlFor="profilePicture"
                  className="px-4 py-1.5 sm:py-2.5 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed rounded-full text-white font-medium flex items-center justify-center text-sm min-w-[135px] cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner size={24} className="text-white" />
                  ) : (
                    "Change Picture"
                  )}
                </label>

                <button
                  type="button"
                  className="px-4 py-1.5 sm:py-2.5 disabled:cursor-not-allowed rounded-full text-secondary font-medium flex items-center justify-center text-sm min-w-[135px]"
                  disabled={isLoading}
                  onClick={handleRemovePicture}
                >
                  {isLoading ? (
                    <Spinner size={24} className="text-secondary" />
                  ) : (
                    "Remove Picture"
                  )}
                </button>
              </div>
            </div>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CustomInput
                    type="text"
                    name="profile.name"
                    label="Full name"
                    placeholder="Enter your full name"
                    iconType="name"
                  />

                  <CustomInput
                    type="number"
                    name="auth.phone"
                    label="Enter mobile number"
                    placeholder="Enter your mobile number"
                    iconType="phone"
                    isEditable={user?.auth?.phone ? false : true}
                  />

                  <div>
                    <label
                      className="block text-primary_text text-base mb-2"
                      htmlFor={"profile.dateOfBirth"}
                    >
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      {...register("profile.dateOfBirth")}
                      max={new Date().toISOString().split("T")[0]}
                      className="appearance-none border bg-white focus:outline-none focus:shadow-outline rounded-full w-full py-2.5 px-3 text-gray-700 leading-tight cursor-pointer"
                    />
                  </div>

                  <CustomSelect
                    name="profile.gender"
                    label="Gender"
                    options={[
                      { key: "male", label: "Male" },
                      { key: "female", label: "Female" },
                      { key: "other", label: "Other" },
                    ]}
                    placeholder="Select your gender"
                  />
                </div>
              </form>
            </FormProvider>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            className="mt-8 sm:mt-16 md:mt-24 px-4 py-1.5 sm:py-2 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={24} className="text-white" /> : "Save"}
          </button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProfileSettings;
