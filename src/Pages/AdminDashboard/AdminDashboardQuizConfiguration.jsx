
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import DashboardBreadcrumb from "@/Shared/DashboardBreadcrumb/DashboardBreadcrumb";
import HorizontalScroll from "@/Shared/HorizontalScroll";
import { useState } from "react";
import GeneralSettings from "./QuizConfiguration/GeneralSettings";
import ScoringAndPassing from "./QuizConfiguration/ScoringAndPassing";
import QuizAttempts from "./QuizConfiguration/QuizAttempts";
import CategorySpecificSettings from "./QuizConfiguration/CategorySpecificSettings";
import FeedbackAndReview from "./QuizConfiguration/FeedbackAndReview";

const AdminDashboardQuizConfiguration = () => {
  const [activeTab, setActiveTab] = useState("general");
  return (
    <>
      <DashboardBreadcrumb
        role="admin"
        items={[{ name: "Quiz Configuration", path: "quiz-configuration" }]}
      />

      <div className="w-full bg-white lg:p-10 p-5 mt-5 rounded-2xl min-h-[600px]">
        <Tabs
          defaultValue="general"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <HorizontalScroll>
            <TabsList className="w-full flex justify-between bg-white border-b">
              <TabsTrigger
                value="general"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "general"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                General Settings
              </TabsTrigger>
              <TabsTrigger
                value="scoring"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "scoring"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Scoring & Passing
              </TabsTrigger>
              <TabsTrigger
                value="attempts"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "attempts"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Quiz Attempts
              </TabsTrigger>
              <TabsTrigger
                value="category"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "category"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Category-Specific Settings
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                className={`flex-1 py-2 font-medium text-sm ${
                  activeTab === "feedback"
                    ? "text-secondary border-b-2 border-secondary !rounded-none"
                    : "text-gray-600"
                }`}
              >
                Feedback & Review
              </TabsTrigger>
            </TabsList>
          </HorizontalScroll>

          <GeneralSettings />
          <ScoringAndPassing />
          <QuizAttempts />
          <CategorySpecificSettings />
          <FeedbackAndReview />
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboardQuizConfiguration;
