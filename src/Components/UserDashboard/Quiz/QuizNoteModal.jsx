import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import Spinner from "@/Components/ui/Spinner";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const QuizNoteModal = ({ isOpen, setIsOpen, question, notes }) => {
  const query = useQueryClient();
  const [note, setNote] = useState("");
  const { createEntity: createNotes } = useCrudOperations("note/create");

  const addNotes = () => {
    createNotes.mutate(
      { notes: note, quiz: question },
      {
        onSuccess: (data) => {
          toast.success(data?.message);
          query.invalidateQueries({
            queryKey: ["quiz"],
          });
          query.invalidateQueries({
            queryKey: ["quiz-session/user-session"],
          });
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(error?.message);
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen) {
      setNote(notes);
    } else {
      setNote(null);
    }
  }, [isOpen, question, notes]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="overflow-y-auto max-h-screen max-w-xl bg-[#ECF2F8] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
            <span className="whitespace-nowrap">Quiz Note</span>
          </DialogTitle>
        </DialogHeader>

        <textarea
          name="notes"
          id="notes"
          rows={10}
          className="w-full bg-white text-gray-900 text-sm rounded-3xl focus:ring-none focus:border-none block p-4 focus:outline-none focus:shadow-none resize-none mb-3"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>

        <DialogFooter className="flex gap-5 items-center">
          <button
            disabled={createNotes?.isPending}
            onClick={addNotes}
            className="bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-medium text-white rounded-full w-full flex items-center justify-center"
          >
            {createNotes?.isPending ? (
              <Spinner size={20} className="text-white" />
            ) : (
              "Save"
            )}
          </button>

          <DialogClose asChild>
            <button className="border border-secondary/90 px-6 py-2.5 text-sm font-medium text-secondary rounded-full w-full">
              Back
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizNoteModal;
