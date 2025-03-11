import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import demoUser from "@/assets/UserDashboard/demoUser.svg";

const ProfileSettings = ({ user }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    reset({
      name: user?.profile?.name,
      phone: user?.auth?.phone,
    });
  }, [user, reset]);

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
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                />

                <CustomInput
                  type="number"
                  name="phone"
                  label="Phone Number"
                  placeholder="Enter your phone"
                />

                <CustomSelect
                  name="gender"
                  label="Gender"
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder="Select your gender"
                />

                <CustomInput
                  type="text"
                  name="dateOfBirth"
                  label="Date of Birth"
                  placeholder="Enter your date of birth"
                />
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProfileSettings;
