import { Card, CardContent } from "@/Components/ui/card";
import { TabsContent } from "@/Components/ui/tabs";
import { Label } from "@radix-ui/react-dropdown-menu";

const FeedbackAndReview = () => {
  return (
    <TabsContent value="feedback" className="pt-6">
      <Card className="border-0 shadow-none">
        <CardContent className="p-0 space-y-6">
          <div className="space-y-1">
            <h2 className="text-secondary font-medium text-lg">
              Feedback & Review
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-primaryText">
                  Show Correct Answers After Quiz
                </Label>
                <p className="text-sm text-gray-500">
                  Allow users to see correct answers post-quiz
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-5">
              <div className="space-y-2">
                <Label className="text-lg font-medium text-primaryText">
                  Enable Review Mode
                </Label>
                <p className="text-sm text-gray-500">
                  Let users review answers after submission
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default FeedbackAndReview;
