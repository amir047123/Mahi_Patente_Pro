import { Card, CardContent } from "@/Components/ui/card";
import Spinner from "@/Components/ui/Spinner";
import { TabsContent } from "@/Components/ui/tabs";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const AddressSettings = ({ user, isLoading, onSubmit }) => {
  const methods = useForm();
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue("address.street", user?.address?.street);
    setValue("address.city", user?.address?.city);
    setValue("address.state", user?.address?.state);
    setValue("address.postalCode", user?.address?.postalCode);
    setValue("address.country", user?.address?.country);
    setValue("address.countryCode", user?.address?.countryCode);
  }, [user, setValue]);

  return (
    <TabsContent value="address" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="px-28">
              <div className="grid grid-cols-2 gap-6">
                <CustomSelect
                  name="address.country"
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
                  name="address.countryCode"
                  label="Country Code"
                  placeholder="Enter your country code"
                />
                <CustomInput
                  type="text"
                  name="address.state"
                  label="State"
                  placeholder="Enter your state"
                />
                <CustomInput
                  type="text"
                  name="address.postalCode"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                />
                <CustomInput
                  type="text"
                  name="address.city"
                  label="City"
                  placeholder="Enter your city"
                />

                <CustomInput
                  type="text"
                  name="address.street"
                  label="Street"
                  placeholder="Enter your street address"
                />
              </div>
            </form>
          </FormProvider>
          <button
            onClick={handleSubmit(onSubmit)}
            className="mt-24 px-4 py-1.5 sm:py-2 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size={24} className="text-white" /> : "Save"}
          </button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default AddressSettings;
