import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";

const QuizExplanationModal = ({ isOpen, setIsOpen, explanation }) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen max-w-xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
            <span className="whitespace-nowrap">Question Explanation</span>
          </DialogTitle>
        </DialogHeader>

        <textarea
          name="explanation"
          id="explanation"
          rows={10}
          className="w-full bg-white text-gray-900 text-sm rounded-3xl focus:ring-none focus:border-none block p-4 focus:outline-none focus:shadow-none resize-none mb-3"
          value={explanation}
          readOnly
        ></textarea>

        <DialogFooter className="flex gap-5 items-center">
          <DialogClose asChild>
            <button className="bg-secondary hover:bg-secondary/90 px-6 py-2.5 text-sm font-medium text-white rounded-full w-full">
              Back
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizExplanationModal;
