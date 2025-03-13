import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "../ui/input";
import { ArrowLeft } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { baseURL } from "@/Config";
import CustomSearchableSelect from "@/Shared/Form/CustomSearchableSelect";
import axios from "axios";
import toast from "react-hot-toast";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../ui/Spinner";

const AdminDashboardEditNotificationModal = ({ isOpen, setIsOpen, item }) => {
  const methods = useForm();
  const { updateEntity } = useCrudOperations("notification");
  const query = useQueryClient();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      _id: item?._id,
      userId:
        data?.target === "specific" ? data?.selectedUser?.fullData?._id : null,
      userEmail:
        data?.target === "specific"
          ? data?.selectedUser?.fullData?.auth?.email
          : null,
      isAdmin: data?.priority === "admin" ? true : false,
      time: data?.sendOption === "sendNow" ? null : data?.time,

      selectedUser: undefined,
      priority: undefined,
    };

    updateEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["notification/all"],
        });
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const showError = (name) => {
    const errorMsg = errors[name]?.message;
    return <p className="text-red-500 text-xs mt-2">{errorMsg}</p>;
  };

  const [search, setSearch] = useState("");
  const [isSearchDisabled, setIsSearchDisabled] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersForSelection, setUsersForSelection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${baseURL}/user/users`, {
        params: {
          search: search || "",
          page: currentPage || 1,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const selectUsersOptions = response?.data?.data?.map((item) => {
        return {
          value: item._id,
          label: `${item?.auth?.email} • ${item?.profile?.name}`,
          logo: item?.profile?.profilePicture,
          fullData: item,
        };
      });

      if (pageNumber === 1) {
        setUsersForSelection(selectUsersOptions);
      } else {
        setUsersForSelection((prevOptions) => {
          const combinedOptions = [...prevOptions, ...selectUsersOptions];
          const uniqueOptions = Array.from(
            new Set(combinedOptions.map((option) => option.value))
          ).map((value) =>
            combinedOptions.find((option) => option.value === value)
          );
          return uniqueOptions;
        });
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const target = watch("target");
  const sendOption = watch("sendOption");

  useEffect(() => {
    if (target !== "specific") {
      setSelectedUser(null);
      setValue("selectedUser", "");
      setSearch("");
      setIsSearchDisabled(true);
      clearErrors("selectedUser");
    } else {
      setIsSearchDisabled(false);
    }
    if (sendOption !== "scheduleLater") {
      clearErrors("time");
    }
  }, [setValue, target, clearErrors, sendOption]);

  const formatToLocalDateTime = (date) => {
    if (!date) return "";

    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    if (isOpen && item) {
      setSelectedUser({
        value: item?.userId?._id,
        label: `${item?.userId?.auth?.email} • ${item?.userId?.profile?.name}`,
        logo: item?.userId?.profile?.profilePicture,
        fullData: item?.userId,
      });
      reset({
        title: item?.title || "",
        message: item?.message || "",
        target: item?.target || "all",
        selectedUser: {
          value: item?.userId?._id,
          label: `${item?.userId?.auth?.email} • ${item?.userId?.profile?.name}`,
          logo: item?.userId?.profile?.profilePicture,
          fullData: item?.userId,
        },
        sendOption: item?.sendOption || "sendNow",
        time: item?.time ? formatToLocalDateTime(item?.time) : "",
        priority: item?.priority || "user",
      });
    } else {
      setSelectedUser(null);
      reset({
        title: "",
        message: "",
        target: "all",
        selectedUser: null,
        sendOption: "sendNow",
        time: "",
        priority: "user",
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
              <span className="whitespace-nowrap">Add Notification</span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form>
            <div className="w-full sm:p-5 p-4 pb-6 rounded-xl  bg-white">
              <div className="space-y-6">
                {/* Notification Title Section */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Notification Title
                  </p>

                  <Input
                    className="px-5 py-5 border-gray-200 rounded-full"
                    placeholder="Type Notification title"
                    {...register("title", {
                      required: "Title is required",
                    })}
                  />
                  {showError("title")}
                </div>

                {/* Message Content Section */}
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Message Content
                  </p>
                  <Input
                    className="py-6 px-5 border-gray-200 rounded-full"
                    placeholder="Type message content"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {showError("message")}
                </div>

                {/* Target Audience Section */}

                <div className="text-secondaryText">
                  <p className="text-sm font-medium text-pink-500 mb-3">
                    Target Audience
                  </p>
                  <Controller
                    name="target"
                    control={control}
                    defaultValue={"all"}
                    render={({ field }) => (
                      <RadioGroup.Root
                        {...field}
                        className="flex lg:gap-5 gap-3 items-start flex-wrap md:flex-nowrap"
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <div className="flex flex-wrap lg:gap-5 gap-3 items-center w-full">
                          {["all", "active", "specific"].map((option) => (
                            <div
                              key={option}
                              className="flex items-center space-x-2 mt-3"
                            >
                              <RadioGroup.Item
                                value={option}
                                id={option}
                                className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white cursor-pointer"
                              >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                              </RadioGroup.Item>
                              <label
                                htmlFor={option}
                                className="text-sm whitespace-nowrap cursor-pointer"
                              >
                                {option === "all"
                                  ? "All Users"
                                  : option === "active"
                                  ? "Active Users"
                                  : "Specific Users"}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div
                          className={`${
                            isSearchDisabled ? "hidden" : "w-full"
                          }`}
                        >
                          <CustomSearchableSelect
                            name="selectedUser"
                            label="User"
                            labelShown={false}
                            options={usersForSelection}
                            isLoading={isLoading}
                            setSelectedItem={setSelectedUser}
                            selectedItem={selectedUser}
                            setSearchText={setSearch}
                            refetchData={fetchUsers}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            placeholder="Select An User"
                            required={watch("target") === "specific"}
                          />
                        </div>
                      </RadioGroup.Root>
                    )}
                  />
                </div>

                {/* Scheduling Options and Priority Level */}
                <div className="flex justify-between text-secondaryText">
                  <div className="">
                    <p className="text-sm font-medium text-pink-500 mb-2">
                      Scheduling Options
                    </p>
                    <div className="flex flex-wrap md:flex-nowrap md:gap-5 sm:gap-10 gap-5 items-start">
                      <Controller
                        name="sendOption"
                        control={control}
                        defaultValue="sendNow"
                        render={({ field }) => (
                          <RadioGroup.Root
                            {...field}
                            className="flex gap-5 mt-2"
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroup.Item
                                value="sendNow"
                                id="sendNow"
                                className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                              >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary cursor-pointer" />
                              </RadioGroup.Item>
                              <label
                                htmlFor="sendNow"
                                className="text-sm whitespace-nowrap cursor-pointer"
                              >
                                Send Now
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroup.Item
                                value="scheduleLater"
                                id="scheduleLater"
                                className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                              >
                                <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary cursor-pointer" />
                              </RadioGroup.Item>
                              <label
                                htmlFor="scheduleLater"
                                className="text-sm whitespace-nowrap cursor-pointer"
                              >
                                Schedule For Later
                              </label>
                            </div>
                          </RadioGroup.Root>
                        )}
                      />

                      <div className="flex flex-wrap sm:flex-nowrap lg:gap-5 gap-3 ">
                        <div className="flex lg:gap-5 gap-3 ">
                          <Controller
                            name="time"
                            control={control}
                            defaultValue=""
                            rules={{
                              required:
                                watch("sendOption") === "scheduleLater" &&
                                "Date & Time is required",
                            }}
                            render={({ field, fieldState }) => (
                              <div>
                                <input
                                  type="datetime-local"
                                  className="text-sm pl-3 h-9 border-gray-200 rounded-md border px-3 py-1 cursor-pointer"
                                  placeholder="Pick a time"
                                  {...field}
                                  disabled={
                                    watch("sendOption") === "scheduleLater"
                                      ? false
                                      : true
                                  }
                                />
                                {fieldState?.error && (
                                  <span className="text-red-500 text-xs block mt-2">
                                    {fieldState.error.message}
                                  </span>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        <div className="sm:-mt-7">
                          <p className="text-sm font-medium text-gray-600 mb-2">
                            Priority Level
                          </p>
                          <Controller
                            name="priority"
                            control={control}
                            defaultValue="user"
                            rules={{ required: "Priority is required" }}
                            render={({ field, fieldState }) => (
                              <div>
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <SelectTrigger className="lg:w-[180px] w-[200px]">
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">
                                        Admin
                                      </SelectItem>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
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

export default AdminDashboardEditNotificationModal;
