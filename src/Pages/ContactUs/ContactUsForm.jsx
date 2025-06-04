import { MdAlternateEmail } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { FormProvider, useForm } from "react-hook-form";
const ContactUsForm = () => {
  const methods = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  const ErrorFunction = (fieldName) => {
    return (
      errors?.[fieldName] && (
        <p className="text-red-500 mt-1 text-sm">
          {errors?.[fieldName]?.message}
        </p>
      )
    );
  };

  return (
    <div className="gradient-border p-8 border rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* personal info */}
          <div className=" ">
            <div className=" grid grid-cols-1 gap-5">
              <div>
                <label className=" mb-2 block">Name</label>
                <div className="relative ">
                  <input
                    {...register("name", {
                      required: "this field is required",
                    })}
                    type="text"
                    placeholder="Type your name"
                    className="w-full bg-secondary/5 outline-none border px-5 py-3 border-secondary/50 sm:text-sm rounded-lg pl-10"
                  />

                  <BsPerson className="pointer-events-none absolute inset-y-0 start-1 top-3 grid w-10 place-content-center text-xl text-gray-400" />
                </div>
                {ErrorFunction("name")}
              </div>

              <div className="">
                <label className=" mb-2 block">Email</label>
                <div className="relative ">
                  <input
                    {...register("email", {
                      required: "this field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "type valid email",
                      },
                    })}
                    type="email"
                    placeholder="Type your email"
                    className="w-full bg-secondary/5 outline-none border px-5 py-3 border-secondary/50 sm:text-sm rounded-lg pl-10"
                  />

                  <MdAlternateEmail className="pointer-events-none absolute inset-y-0 start-1 top-3 grid w-10 place-content-center text-xl text-gray-400" />
                </div>
                {ErrorFunction("email")}
              </div>

              <div className="">
                <label className=" mb-2 block">Message</label>
                <div className="relative ">
                  <textarea
                    rows={4}
                    {...register("message", {
                      required: "this field is required",
                    })}
                    placeholder="type your message"
                    className="w-full bg-secondary/5 outline-none border px-5 py-3 border-secondary/50 sm:text-sm rounded-lg pl-10"
                  />

                  <TiMessages className="pointer-events-none absolute inset-y-0 start-1 top-3 grid w-10 place-content-center text-xl text-gray-400" />
                </div>
                {ErrorFunction("message")}
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <button
              type="button"
              onClick={() => {
                reset();
              }}
              className="bg-gray-200 w-full text-[#939393] flex items-center justify-center py-2 px-5 gap-2 mt-10 rounded-lg hover:bg-gray-300 cursor-pointer min-h-12"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-secondary w-full text-white flex items-center justify-center py-2 px-5 gap-2 mt-10 rounded-lg hover:bg-secondary/80 min-h-12 disabled:bg-secondary/50 disabled:pointer-events-none"
            >
              <p className="">Submit</p>
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ContactUsForm;
