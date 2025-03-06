import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { TabsContent } from "@/Components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";

const GeneralSettings = () => {
    return (
      <TabsContent value="general" className="pt-6">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0 space-y-6">
            <div className="space-y-1">
              <h2 className="text-secondary font-medium text-lg">
                General Settings
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5">
                <div className="space-y-2">
                  <Label className="text-lg font-medium text-primaryText">
                    Default Time per Quiz
                  </Label>
                  <p className="text-sm text-gray-500">
                    Set the default time limit for quizzes
                  </p>
                </div>
                <Select defaultValue="10">
                  <SelectTrigger className="w-full md:w-64 ">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Minutes</SelectItem>
                    <SelectItem value="10">10 Minutes</SelectItem>
                    <SelectItem value="15">15 Minutes</SelectItem>
                    <SelectItem value="20">20 Minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 justify-between">
                <div className="space-y-2">
                  <Label className="text-lg font-medium text-primaryText">
                    Time per Question
                  </Label>
                  <p className="text-sm text-gray-500">
                    Set time limit per question (Overrides quiz time if set)
                  </p>
                </div>
                <Input
                  type="number"
                  placeholder="Enter seconds"
                  className="w-full md:w-64"
                  defaultValue={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-lg font-medium text-primaryText">
                      Randomize Questions
                    </Label>
                    <p className="text-sm text-gray-500">
                      Shuffle question order for each attempt
                    </p>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input  type="checkbox" value="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    );
};

export default GeneralSettings;