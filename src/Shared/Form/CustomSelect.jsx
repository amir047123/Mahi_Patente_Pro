import { useFormContext, useWatch } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { FaAngleDown } from "react-icons/fa6";
import { useEffect } from "react";

const CustomSelect = ({
  required = true,
  size = "md",
  label,
  name,
  options = [],
  setValue,
  index = -1,
  placeholder,
  isEditable = true,
  allOptions = true,
  labelShown = true,
  isHidden = false,
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

  return (
    <div className={`w-full ${isHidden ? "hidden" : ""}`}>
      {label && labelShown && (
        <label
          className="block text-primary_text text-base mb-2"
          htmlFor={name}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <select
          readOnly={!isEditable}
          size={size}
          {...register(name, {
            required: required ? `${label} is required` : false,
          })}
          className={`appearance-none ${
            isEditable
              ? " border bg-white focus:outline-none focus:shadow-outline"
              : "bg-white/70 focus:border-none focus:ring-0 focus:outline-none pointer-events-none"
          } ${
            errorMessage
              ? "border-red-500"
              : isEditable
              ? ""
              : "border-slate-300"
          } rounded-full w-full py-3 px-3 pr-10 text-gray-700 leading-tight`}
          id={name}
        >
          {allOptions && <option value="">{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
        <FaAngleDown className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none text-gray-400" />
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default CustomSelect;
