import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


const AdminAddChapterModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="px-6 py-2 text-sm font-medium text-white bg-secondary rounded-full shadow-sm hover:bg-secondary/90">
          Add a Chapter
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et sint
          facere adipisci excepturi quae. Necessitatibus, placeat cupiditate.
          Amet, cupiditate labore.
        </p>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminAddChapterModal;
