import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { TabsContent } from "@/Components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";

const CategorySpecificSettings = () => {
  return (
    <TabsContent value="category" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-6">
          <div className="space-y-1">
            <h2 className="text-secondary font-medium text-lg">
              Category-Specific Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-primaryText">
                  Time for Guess the Signal
                </Label>
                <p className="text-sm text-gray-500">
                  Set time limit for this quiz type
                </p>
              </div>
              <Input
                type="number"
                placeholder="Number of retakes"
                className="w-full md:w-64"
                defaultValue={3}
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 justify-between">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-primaryText">
                  Time for Choose 4 to 1 Signal
                </Label>
                <p className="text-sm text-gray-500">
                  Set time for this quiz type
                </p>
              </div>
              <Input
                type="number"
                placeholder="retrying after failure"
                className="w-full md:w-64"
                defaultValue={7}
              />
            </div>

          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CategorySpecificSettings;
