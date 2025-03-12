import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { TabsContent } from "@/Components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";

const QuizAttempts = () => {
  return (
    <TabsContent value="attempts" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-6">
          <div className="space-y-1">
            <h2 className="text-secondary font-medium text-lg">
              Quiz Attempts
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-primaryText">Pass Percentage</Label>
                <p className="text-sm text-gray-500">
                  Minimum % needed to pass
                </p>
              </div>
              <Input
                type="number"
                placeholder="Minimum % needed to pass"
                className="w-full md:w-64"
                defaultValue={70}
              />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-5 justify-between">
              <div className="space-y-2">
                <Label className="text-lg font-medium">
                  Max Wrong Answers Allowed
                </Label>
                <p className="text-sm text-gray-500">
                  Number of incorrect answers before failing
                </p>
              </div>

              <Select defaultValue="10">
                <SelectTrigger className="w-full md:w-64 ">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default QuizAttempts;
