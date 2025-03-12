import QuestionLeftModal from "@/Components/UserDashboard/Quiz/QuestionLeftModal";
import QuickSettingsModal from "@/Components/UserDashboard/Quiz/QuickSettingsModal";
import TimeLeftModal from "@/Components/UserDashboard/Quiz/TimeLeftModal";
import { useState } from "react";

export default function ModalPractice() {
  const [isTimeLeftModalOpen, setIsTimeLeftModalOpen] = useState(false);
  const [isQuestionLeftModalOpen, setIsQuestionLeftModalOpen] = useState(false);
  const [isQuickSettingsModalOpen, setIsQuickSettingsModalOpen] =
    useState(false);
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsTimeLeftModalOpen(true)}
      >
        Open Time Left Modal
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
        onClick={() => setIsQuestionLeftModalOpen(true)}
      >
        Open Question Left Modal
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
        onClick={() => setIsQuickSettingsModalOpen(true)}
      >
        Open Quick Settings Modal
      </button>
      <TimeLeftModal
        isOpen={isTimeLeftModalOpen}
        setIsOpen={setIsTimeLeftModalOpen}
      />

      <QuestionLeftModal
        isOpen={isQuestionLeftModalOpen}
        setIsOpen={setIsQuestionLeftModalOpen}
      />

      <QuickSettingsModal
        isOpen={isQuickSettingsModalOpen}
        setIsOpen={setIsQuickSettingsModalOpen}
      />
    </div>
  );
}
