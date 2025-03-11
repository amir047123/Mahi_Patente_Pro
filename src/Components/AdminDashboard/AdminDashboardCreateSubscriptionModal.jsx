import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AdminDashboardCreateSubscriptionModal = ({ isOpen, setIsOpen }) => {
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState("");

  const addFeature = () => {
    if (!feature) {
      return toast.error("Type feature first");
    }
    setFeatures([...features, feature]);
    console.log("hey", feature);
    setFeature("");
  };

const removeFeature = (item) => {
  setFeatures((prevFeatures) => {
    const index = prevFeatures.indexOf(item);
    if (index !== -1) {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures.splice(index, 1); // Remove only the first occurrence
      return updatedFeatures;
    }
    return prevFeatures;
  });
};

  console.log("feature", feature);
  console.log("features", features);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] lg:p-7 p-3 sm:p-5">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">
                Create Subscription Plan
              </span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <div className="w-full sm:p-5 p-4 pb-6 rounded-xl  bg-white">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Plan Name
              </p>

              <Input
                className="px-5 py-5 border-gray-200 rounded-full"
                placeholder="Type Plan Name"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Price (€)
              </p>

              <Input
                type="number"
                className="px-5 py-5 border-gray-200 rounded-full"
                placeholder="Type Price"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Duration</p>
              <Select className="w-full py-5">
                <SelectTrigger className="w-full py-5 rounded-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
              <Select className="w-full py-5">
                <SelectTrigger className="w-full py-5 rounded-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-gray-600 mb-2">Features</p>

            <div className="mb-5 grid sm:grid-cols-3 grid-cols-2 gap-2">
              {features?.map((f) => (
                <li
                  key={f}
                  className="flex items-center text-primaryText text-sm font-medium"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2 text-secondary dark:secondary shrink-0"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {f}{" "}
                  <button
                    onClick={() => removeFeature(f)}
                    className="text-red-500 ml-1"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </div>

            <div className="flex items-center sm:gap-5 gap-3">
              <Input
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                className="px-5 py-5 border-gray-200 rounded-full"
                placeholder="Type Feature"
              />
              <button
                onClick={addFeature}
                className="text-sm px-4 py-2.5 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed whitespace-nowrap rounded-full text-white font-semibold flex items-center justify-center"
              >
                Add Features
              </button>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-5 items-center">
          <button className="text-sm px-4 py-3 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed w-full rounded-full text-white font-semibold flex items-center justify-center">
            Send Notification
          </button>
          <DialogClose asChild>
            <button className="border border-secondary/50 px-6 py-2.5 text-sm font-medium text-secondary rounded-full w-full">
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdminDashboardCreateSubscriptionModal;
