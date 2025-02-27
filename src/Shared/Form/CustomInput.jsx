import { AtSign, PhoneCall, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

const CustomInput = ({
  required = true,
  type = "text",
  label,
  name,
  placeholder = "",
  isEditable = true,
  className,
  setValue,
  index = -1,
  step = 1,
  iconType,
  max,
  minLength,
  rows = 5,
  inputClassName = "",
  isHidden = false,
  labelShown = true,
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (setValue) {
      setValue(inputValue);
    }
  }, [inputValue, setValue]);

  let errorMessage;
  let fieldName;
  let arrayName;

  if (index < 0) {
    const nameType = name.split(".");

    if (nameType.length > 1) {
      const keys = name.split(".");

      errorMessage = keys.reduce((acc, key) => {
        if (acc && typeof acc === "object" && key in acc) {
          return acc[key];
        }
        return undefined;
      }, errors)?.message;
    } else {
      errorMessage = errors?.[name]?.message;
    }
  } else {
    fieldName = name.split(".").pop();
    arrayName = name.split("[")[0];

    errorMessage = errors?.[arrayName]?.[index]?.[fieldName]?.message;
  }

  const ChooseIcon = () => {
    switch (iconType) {
      case "email":
        return <AtSign className="h-5" />;
      case "phone":
        return <PhoneCall className="h-5" />;
      case "otp":
        return <ShieldCheck className="h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${isHidden ? "hidden" : ""}`}>
      {label && labelShown && (
        <label
          className="block text-primary_text text-base font-semibold mb-2"
          htmlFor={name}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {type === "textarea" ? (
          <textarea
            {...register(name, {
              required:
                required && `${label || name || "This field"} is required`,
            })}
            className={`appearance-none resize-none
            ${
              isEditable
                ? "border  bg-white focus:outline-none focus:shadow-outline"
                : "bg-white/70 focus:border-none focus:ring-0 focus:outline-none pointer-events-none"
            } ${
              errorMessage
                ? "border-red-500"
                : `${
                    className ? className : isEditable ? "border-slate-300" : ""
                  }`
            } rounded-3xl w-full py-2.5 px-6 text-gray-700 leading-tight ${
              iconType && "!pr-11"
            } ${inputClassName}`}
            id={name}
            placeholder={placeholder}
            rows={rows}
          ></textarea>
        ) : (
          <input
            {...register(name, {
              required:
                required &&
                `${label || fieldName || name || "This field"} is required`,
              pattern:
                type === "email"
                  ? {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    }
                  : undefined,
              // validate:
              //   type === "number"
              //     ? required
              //       ? (value) =>
              //           value > 0
              //             ? max
              //               ? value <= max ||
              //                 `Please input a number greater than 0 and less than ${max}.`
              //               : minLength &&
              //                 (value.length >= minLength ||
              //                   `Length of ${
              //                     label || name || "This field"
              //                   } must be longer or equal to ${minLength}.`)
              //             : "Please input a number greater than 0."
              //       : ""
              //     : undefined,

              validate: (value) => {
                if (type === "number") {
                  if (required && value <= 0) {
                    return "Please input a number greater than 0.";
                  }

                  if (max && value > max) {
                    return `Please input a number less than or equal to ${max}.`;
                  }

                  if (minLength && value.toString().length < minLength) {
                    return `Length of ${
                      label || name || "this field"
                    } must be at least ${minLength}.`;
                  }
                }

                return true;
              },
            })}
            readOnly={!isEditable}
            className={`appearance-none
            ${
              isEditable
                ? "border bg-white focus:outline-none focus:shadow-outline"
                : "bg-gray-100 focus:border-none focus:ring-0 focus:outline-none pointer-events-none"
            } ${
              errorMessage
                ? "border-red-500"
                : `${
                    className ? className : isEditable ? "border-slate-300" : ""
                  }`
            } ${
              type === "number" &&
              "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            } rounded-full w-full py-2.5 px-3 text-gray-700 leading-tight ${
              iconType && "!pr-11"
            } ${inputClassName}`}
            id={name}
            type={type}
            placeholder={placeholder}
            step={type === "number" ? step : 1}
          />
        )}

        {iconType && (
          <div className="text-sec_text absolute bottom-3 right-3">
            {ChooseIcon()}
          </div>
        )}
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomInput;
