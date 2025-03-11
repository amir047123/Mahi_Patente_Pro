import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import {  Search, CalendarIcon, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem,  SelectTrigger, SelectValue } from "../ui/select";

const AdminDashboardAddNotificationModal = ({ isOpen, setIsOpen }) => {
  const [date, setDate] = useState();
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
              />
            </div>

            {/* Message Content Section */}
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Message Content
              </p>
              <Input
                className="py-6 px-5 border-gray-200 rounded-full"
                placeholder="Type message content"
              />
            </div>

            {/* Target Audience Section */}

            <div className="text-secondaryText">
              <p className="text-sm font-medium text-pink-500 mb-3">
                Target Audience
              </p>
              <RadioGroup.Root
                defaultValue="all"
                className="flex lg:gap-5 gap-3 items-center justify-between flex-wrap md:flex-nowrap"
              >
                <div className="flex flex-wrap lg:gap-5 gap-3 items-center">
                  <div className="flex items-center space-x-2">
                    <RadioGroup.Item
                      value="all"
                      id="all"
                      className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                    </RadioGroup.Item>
                    <label htmlFor="all" className="text-sm whitespace-nowrap">
                      All User
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroup.Item
                      value="active"
                      id="active"
                      className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                    </RadioGroup.Item>
                    <label
                      htmlFor="active"
                      className="text-sm whitespace-nowrap"
                    >
                      Active User
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroup.Item
                      value="specific"
                      id="specific"
                      className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                    >
                      <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                    </RadioGroup.Item>
                    <label
                      htmlFor="specific"
                      className="text-sm whitespace-nowrap"
                    >
                      Specific Users
                    </label>
                  </div>
                </div>
                <div className="flex lg:gap-5 gap-3 items-center ">
                  <div className="relative  w-full">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      className="h-9 pl-8 w-full min-w-20 text-sm rounded-full text-gray-400"
                      placeholder="Search & Select User"
                    />
                  </div>

                  <Button className="bg-secondary/90 hover:bg-secondary rounded-full text-sm px-6 ml-auto block">
                    Select User
                  </Button>
                </div>
              </RadioGroup.Root>
            </div>

            {/* Scheduling Options and Priority Level */}
            <div className="flex justify-between text-secondaryText">
              <div className="">
                <p className="text-sm font-medium text-pink-500 mb-2">
                  Scheduling Options
                </p>
                <div className="flex flex-wrap md:flex-nowrap md:gap-5 sm:gap-10 gap-5 items-start">
                  <RadioGroup.Root
                    defaultValue="sendNow"
                    className="flex gap-5 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroup.Item
                        value="sendNow"
                        id="sendNow"
                        className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                      </RadioGroup.Item>
                      <label
                        htmlFor="sendNow"
                        className="text-sm whitespace-nowrap"
                      >
                        Send Now
                      </label>
                    </div>
                    <div className="flex items-center  space-x-2">
                      <RadioGroup.Item
                        value="scheduleLater"
                        id="scheduleLater"
                        className="w-4 h-4 rounded-full border border-gray-300 data-[state=checked]:border-pink-500 data-[state=checked]:bg-white"
                      >
                        <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full after:bg-secondary" />
                      </RadioGroup.Item>
                      <label
                        htmlFor="scheduleLater"
                        className="text-sm whitespace-nowrap"
                      >
                        Schedule For Later
                      </label>
                    </div>
                  </RadioGroup.Root>
                  <div className="flex flex-wrap sm:flex-nowrap lg:gap-5 gap-3 ">
                    <div className="flex lg:gap-5 gap-3 ">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <input
                        type="time"
                        className=" text-sm pl-3 h-9 border-gray-200 rounded-md border px-3 py-1"
                        placeholder="pick a time"
                      />
                    </div>

                    <div className="sm:-mt-7">
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Priority Level
                      </p>
                      <Select>
                        <SelectTrigger className="lg:w-[180px] w-[200px]">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
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

export default AdminDashboardAddNotificationModal;
