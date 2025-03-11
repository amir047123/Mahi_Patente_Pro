import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddressSettings = ({ user }) => {
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
    <TabsContent value="address" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-6">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-6">
                <CustomSelect
                  name="country"
                  label="Country"
                  placeholder="Select your country"
                  options={[
                    { key: "Bangladesh", label: "Bangladesh" },
                    { key: "Italy", label: "Italy" },
                    { key: "India", label: "India" },
                    { key: "Nepal", label: "Nepal" },
                    { key: "Pakistan", label: "Pakistan" },
                    { key: "Srilanka", label: "Srilanka" },
                  ]}
                />
                <CustomInput
                  type="text"
                  name="countryCode"
                  label="Country Code"
                  placeholder="Enter your country code"
                />
                <CustomInput
                  type="text"
                  name="state"
                  label="State"
                  placeholder="Enter your state"
                />
                <CustomInput
                  type="text"
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                />
                <CustomInput
                  type="text"
                  name="city"
                  label="City"
                  placeholder="Enter your city"
                />

                <CustomInput
                  type="text"
                  name="street"
                  label="Street"
                  placeholder="Enter your street address"
                />
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddressSettings;
