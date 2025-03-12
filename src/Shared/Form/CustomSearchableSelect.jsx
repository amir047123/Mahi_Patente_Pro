import { useRef } from "react";
import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import placeholderImage from "@/assets/UserDashboard/demo-user.svg";

export default function CustomSearchableSelect({
  options = [{ value: "test", label: "Test" }],
  isLoading = false,
  setSearchText = () => {},
  setSelectedItem = () => {},
  selectedItem,
  refetchData = () => {},
  currentPage = 1,
  setCurrentPage = () => {},
  placeholder = "Select or Search...",
  isEditable = true,
  required = true,
  label,
  labelShown = true,
  name,
  menuHeight = null,
  hasLogo = true,
}) {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      boxShadow: errors[name] ? "0 0 0 1px #f00" : "none",
      borderColor: errors[name] ? "#f00" : "rgb(156 163 175)",
      borderRadius: "5rem",

      backgroundColor: isEditable ? "transparent" : "rgb(243 244 246)",
      fontSize: "14px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgb(239 246 255)" : "white",
      color: "rgb(75, 85, 99)",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      border: "1px solid gray",
      borderRadius: "1rem",
      fontSize: "14px",
    }),
  };

  const CustomOption = ({ innerRef, innerProps, data }) => (
    <div ref={innerRef} {...innerProps} className="flex items-center m-2 gap-2">
      {hasLogo && (
        <img
          src={data.logo || placeholderImage}
          alt={`${data.label} Logo`}
          className="h-8 w-8 mr-2"
        />
      )}

      <span className="cursor-pointer">{data.label}</span>
    </div>
  );

  const handleInputChange = (inputValue) => {
    setSearchText(inputValue);
    setCurrentPage(1);
    if (inputValue) {
      refetchData();
    }
  };

  const handleMenuScrollToBottom = () => {
    refetchData(currentPage + 1);
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const selectRef = useRef(null);

  return (
    <>
      <div className={`min-w-[200px] ${!isEditable && "pointer-events-none"}`}>
        {label && labelShown && (
          <label
            className="block text-primary_text text-base font-semibold mb-2"
            htmlFor={name}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <Controller
            name={name}
            control={control}
            rules={{
              required:
                required && `${label || name || "This Field"} is required`,
            }}
            render={({ field }) => (
              <Select
                {...field}
                ref={selectRef}
                options={options}
                isLoading={isLoading}
                onInputChange={handleInputChange}
                onMenuScrollToBottom={handleMenuScrollToBottom}
                placeholder={placeholder}
                isSearchable
                styles={customStyles}
                classNamePrefix="tailwind-select"
                value={selectedItem}
                onChange={(option) => {
                  field.onChange(option);
                  if (setSelectedItem) {
                    setSelectedItem(option);
                  }
                  if (selectRef.current) {
                    selectRef.current.blur();
                  }
                }}
                isClearable
                isDisabled={!isEditable}
                components={{ Option: CustomOption }}
                maxMenuHeight={menuHeight}
              />
            )}
          />
        </div>

        {errors[name] && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors[name].message}
          </p>
        )}
      </div>
    </>
  );
}
