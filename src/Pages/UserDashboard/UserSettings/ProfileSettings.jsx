import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import demoUser from "@/assets/UserDashboard/demoUser.svg";
import Spinner from "@/Components/ui/Spinner";

const ProfileSettings = ({ user, onSubmit, isLoading }) => {
  const methods = useForm();
  const { handleSubmit, register, setValue } = methods;

  useEffect(() => {
    setValue("auth.phone", user?.auth?.phone);
    setValue("profile.name", user?.profile?.name);
    setValue("profile.gender", user?.profile?.gender);
    setValue("profile.dateOfBirth", user?.profile?.dateOfBirth);
  }, [user, setValue]);

  return (
    <TabsContent value="profile" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-6">
          <div className="flex justify-center">
            <button className="">
              <img
                src={user?.profile?.image || demoUser}
                alt={user?.profile?.name}
                className="w-32 h-32 rounded-full"
              />
            </button>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <CustomInput
                  type="text"
                  name="profile.name"
                  label="Name"
                  placeholder="Enter your name"
                />

                <CustomInput
                  type="number"
                  name="auth.phone"
                  label="Phone Number"
                  placeholder="Enter your phone"
                />

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
              </div>

              <button
                type="submit"
                className="mt-6 px-4 py-2 sm:py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size={24} className="text-white" />
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProfileSettings;
