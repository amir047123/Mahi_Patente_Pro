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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

const AdminDashboardEditSubscriptionModal = ({ isOpen, setIsOpen, item }) => {
  const query = useQueryClient();
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState("");
  const methods = useForm();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = methods;

  const { updateEntity } = useCrudOperations("package");

  const onSubmit = async (data) => {
    if (features?.length === 0) {
      toast.error("Please add at least one feature");
      return;
    }
    const updatedData = { ...data, features, _id: item?._id };

    updateEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["package"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const addFeature = () => {
    if (!feature) {
      return toast.error("Type feature first");
    }
    setFeatures([...features, feature]);
    setFeature("");
  };

  const removeFeature = (i) => {
    setFeatures((prevFeatures) =>
      prevFeatures?.filter?.((_, idx) => idx !== i)
    );
  };

  const showError = (name) => {
    const errorMsg = errors[name]?.message;
    return <p className="text-red-500 text-xs mt-2">{errorMsg}</p>;
  };

  useEffect(() => {
    if (isOpen && item) {
      reset({
        name: item?.name,
        price: item?.price,
        duration: String(item?.duration),
        features: item?.features,
        status: item?.status,
      });
      setFeatures(item?.features);
    } else {
      reset({
        name: "",
        price: "",
        duration: "90",
        features: [],
        status: "Active",
      });
    }
  }, [isOpen, item, reset]);

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

        <form className="w-full sm:p-5 p-4 pb-6 rounded-xl  bg-white">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Plan Name
              </p>

              <Input
                className="px-5 py-5 border-gray-200 rounded-full"
                placeholder="Type Plan Name"
                {...register("name", { required: "Plan name is required" })}
              />

              {showError("name")}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Price (€)
              </p>

              <Input
                type="number"
                className="px-5 py-5 border-gray-200 rounded-full"
                placeholder="Type Price"
                {...register("price", { required: "Price is required" })}
              />

              {showError("price")}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Duration</p>

              <Controller
                name="duration"
                control={control}
                rules={{ required: "Duration is required" }}
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      className="w-full py-5"
                    >
                      <SelectTrigger className="w-full py-5 rounded-full">
                        <SelectValue placeholder="Select duration (Days)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="30">1 Month</SelectItem>
                          <SelectItem value="90">3 Month</SelectItem>
                          <SelectItem value="180">6 Month</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState?.error && (
                      <span className="text-red-500 text-xs block mt-2">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Status</p>
              <Controller
                name="status"
                control={control}
                defaultValue="Active"
                rules={{ required: "Status is required" }}
                render={({ field, fieldState }) => (
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      className="w-full py-5"
                    >
                      <SelectTrigger className="w-full py-5 rounded-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState?.error && (
                      <span className="text-red-500 text-xs block mt-2">
                        {fieldState.error.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-gray-600 mb-2">Features</p>

            <div className="mb-5 grid sm:grid-cols-3 grid-cols-2 gap-2">
              {features?.map((f, i) => (
                <li
                  key={i}
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
                    type="button"
                    onClick={() => removeFeature(i)}
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
                type="button"
                onClick={addFeature}
                className="text-sm px-4 py-2.5 bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed whitespace-nowrap rounded-full text-white font-semibold flex items-center justify-center"
              >
                Add Features
              </button>
            </div>
          </div>
        </form>

        <DialogFooter className="flex gap-5 items-center">
          <button
            disabled={updateEntity?.isPending}
            onClick={handleSubmit(onSubmit)}
            className="bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-medium text-white rounded-full w-full flex items-center justify-center"
          >
            {updateEntity?.isPending ? (
              <Spinner size={20} className="text-white" />
            ) : (
              "Save"
            )}
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

export default AdminDashboardEditSubscriptionModal;
