import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { ArrowLeft, Copy, UserRound, UsersRound } from "lucide-react";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { useCrudOperations } from "@/Hooks/useCRUDOperation";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import CustomInput from "@/Shared/Form/CustomInput";
import CustomSelect from "@/Shared/Form/CustomSelect";
import { FaCheckCircle } from "react-icons/fa";
import Typography from "@/Components/Typography";
import { useEffect, useState } from "react";
import CustomSearchableSelect from "@/Shared/Form/CustomSearchableSelect";
import axios from "axios";
import { baseURL } from "@/Config";

const AdminDashboardCreateActivationModal = ({ isOpen, setIsOpen }) => {
  const query = useQueryClient();
  const methods = useForm();
  const { handleSubmit, reset, getValues, setValue, watch } = methods;
  const [packageOptions, setPackageOptions] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [activeTab, setActiveTab] = useState("new");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersForSelection, setUsersForSelection] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { useFetchEntities } = useCrudOperations("package");
  const {
    data: response,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useFetchEntities({ ItemPerPage: 50 });

  useEffect(() => {
    if (isSuccess && response?.success) {
      setPackageOptions(
        response?.data?.data?.map((item) => ({
          key: item?._id,
          label: item?.name,
        }))
      );
    }
  }, [isSuccess, response]);

  if (isError && !isLoading) {
    toast.error(error?.message);
  }

  const { createEntity } = useCrudOperations("subscription/create");

  const onSubmit = async (data) => {
    const updatedData = {
      package: data?.package,
      subscriber: {
        user: selectedUser?.fullData?._id,
        email: data?.email,
        phone: data?.phone,
      },
      name: data?.name,
    };

    createEntity.mutate(updatedData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        query.invalidateQueries({
          queryKey: ["package"],
        });
        setValue("token", data?.data?.token);
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  const handleCopy = async () => {
    const activationCode = getValues("activationCode");
    try {
      if (!activationCode) {
        toast.error("Failed to copy activation code");
        return;
      }
      await navigator.clipboard.writeText(activationCode);
      toast.success(`${activationCode?.slice(0, 5)}... copied to clipboard`);
    } catch (err) {
      toast.error("Failed to copy activation code", err);
    }
  };

  const packageValue = watch("package");
  const generatedActivationCode = watch("token");

  useEffect(() => {
    if (packageValue) {
      setSelectedPackage(
        response?.data?.data?.find((item) => item?._id === packageValue)
      );
    } else {
      setSelectedPackage({});
    }
  }, [packageValue, response]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const fetchUsers = async (pageNumber = 1) => {
    setIsUserLoading(true);
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

      const selectUsersOptions = response?.data?.data
        ?.filter((item) => item?.profile?.role === "user")
        ?.map((item) => {
          return {
            value: item._id,
            label: `${item?.profile?.name} • ${item?.auth?.phone}${
              item?.auth?.email ? ` • ${item?.auth?.email}` : ""
            }`,
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
      setIsUserLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className=" overflow-y-auto max-h-screen  max-w-4xl bg-[#ECF2F8] lg:p-7 p-3 sm:p-5">
        <DialogHeader>
          <DialogClose asChild>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2 text-secondary cursor-pointer w-fit">
              <ArrowLeft />{" "}
              <span className="whitespace-nowrap">
                Generate Activation Code
              </span>
            </DialogTitle>
          </DialogClose>
        </DialogHeader>

        <FormProvider {...methods}>
          <form className="w-full sm:p-5 p-4 pb-6 rounded-xl bg-white">
            <div className="w-full flex justify-between bg-white border-b mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("new")}
                className={`flex-1 py-2 font-medium text-sm flex items-center justify-center gap-2 ${
                  activeTab === "new"
                    ? "text-secondary border-b-2 border-secondary !rounded-none font-semibold"
                    : "text-gray-600"
                }`}
              >
                <UserRound className="h-5" />
                New User
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("existing")}
                className={`flex-1 py-2 font-medium text-sm flex items-center justify-center gap-2 ${
                  activeTab === "existing"
                    ? "text-secondary border-b-2 border-secondary !rounded-none font-semibold"
                    : "text-gray-600"
                }`}
              >
                <UsersRound className="h-5" />
                Existing User
              </button>
            </div>

            <div>
              <div className="pb-4 mb-4 border-b border-slate-300">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <CustomInput
                    name="name"
                    label="Enter User Name"
                    placeholder="Enter User Name"
                    iconType="name"
                    required={activeTab === "new"}
                    isEditable={generatedActivationCode ? false : true}
                    isHidden={activeTab === "existing"}
                  />
                  <CustomInput
                    name="phone"
                    label="Enter User Mobile No."
                    placeholder="Enter User Mobile No."
                    iconType="phone"
                    required={activeTab === "new"}
                    isEditable={generatedActivationCode ? false : true}
                    isHidden={activeTab === "existing"}
                  />
                  <CustomInput
                    type="email"
                    name="email"
                    label="Enter User Email"
                    placeholder="Enter User Email"
                    iconType="email"
                    required={false}
                    isEditable={generatedActivationCode ? false : true}
                    isHidden={activeTab === "existing"}
                  />

                  <div
                    className={`sm:col-span-2 md:col-span-3 ${
                      activeTab === "new" ? "hidden" : ""
                    }`}
                  >
                    <CustomSearchableSelect
                      name="selectedUser"
                      label="User"
                      options={usersForSelection}
                      isLoading={isUserLoading}
                      setSelectedItem={setSelectedUser}
                      selectedItem={selectedUser}
                      setSearchText={setSearch}
                      refetchData={fetchUsers}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      placeholder="Select An User"
                      required={activeTab === "existing"}
                    />
                  </div>

                  <div
                    className={`${
                      activeTab === "existing"
                        ? "sm:col-span-2 md:col-span-1"
                        : "sm:col-span-1"
                    }`}
                  >
                    <CustomSelect
                      name="package"
                      label="Select Subscription Plan"
                      placeholder="Select Subscription Plan"
                      options={packageOptions}
                      isEditable={generatedActivationCode ? false : true}
                    />
                  </div>

                  <div className="relative sm:col-span-2">
                    <CustomInput
                      name="token"
                      label="Generate Activation Code."
                      placeholder="Generate Activation Code"
                      iconType="activationCode"
                      isEditable={false}
                      required={false}
                    />

                    <button
                      onClick={handleCopy}
                      type="button"
                      className="absolute top-[46px] right-4 text-secondaryText flex items-center justify-center gap-2"
                    >
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Typography.Heading5 variant="semibold">
                    <span className="text-secondary">
                      {selectedPackage?.name || "Select a Plan"}
                    </span>{" "}
                    | Mahi Patente Pro
                  </Typography.Heading5>
                  <Typography.Heading6
                    variant="normal"
                    className="text-secondaryText mt-1"
                  >
                    €{selectedPackage?.price || 0} | Duration:{" "}
                    {selectedPackage?.duration === 30
                      ? "month"
                      : selectedPackage?.duration === 90
                      ? "3 month"
                      : selectedPackage?.duration === 180
                      ? "6 month"
                      : selectedPackage?.duration === 365
                      ? "1 year"
                      : `${selectedPackage?.duration || 0} days`}
                  </Typography.Heading6>
                </div>

                <div className="">
                  <Typography.Heading6 variant="semibold">
                    What’s included
                  </Typography.Heading6>
                  <div className="grid grid-cols-2">
                    {selectedPackage?.features?.length > 0 ? (
                      selectedPackage?.features?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 mt-2"
                        >
                          <FaCheckCircle size={16} className="text-secondary" />
                          <Typography.Base
                            variant="regular"
                            className="text-secondaryText text-sm"
                          >
                            {item}
                          </Typography.Base>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 mt-2">
                        <FaCheckCircle size={16} className="text-secondary" />
                        <Typography.Base
                          variant="regular"
                          className="text-secondaryText text-sm"
                        >
                          Select a Plan
                        </Typography.Base>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>

        <DialogFooter className="flex gap-5 items-center">
          <button
            disabled={
              createEntity?.isPending || !generatedActivationCode ? false : true
            }
            onClick={handleSubmit(onSubmit)}
            className="bg-secondary hover:bg-secondary/90 disabled:bg-secondary/60 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-medium text-white rounded-full w-full flex items-center justify-center"
          >
            {createEntity?.isPending ? (
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

export default AdminDashboardCreateActivationModal;
