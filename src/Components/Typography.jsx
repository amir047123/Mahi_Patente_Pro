function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Heading1({ children, variant = "bold", className }) {
  return (
    <h1
      className={cn(
        "xl:text-[48px] lg:text-[40px] md:text-[36px] text-[32px]", // 60px ., 36px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h1>
  );
}

function Heading2({ children, variant = "bold", className }) {
  return (
    <h2
      className={cn(
        "xl:text-[40px] lg:text-[36px] md:text-[32px] text-[28px]", //36px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h2>
  );
}

function Heading3({ children, variant = "semibold", className }) {
  return (
    <h3
      className={cn(
        "xl:text-[32px] lg:text-[28px] md:text-[24px] text-[20px]", // 32px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h3>
  );
}

function Heading4({ children, variant = "semibold", className }) {
  return (
    <h4
      className={cn(
        "xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px]", //24px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h4>
  );
}

function Heading5({ children, variant = "bold", className }) {
  return (
    <h5
      className={cn(
        "text-[1.375rem]", // 22px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h5>
  );
}

function Heading6({ children, variant = "bold", className }) {
  return (
    <h6
      className={cn(
        "text-[1.25rem]", //20px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </h6>
  );
}

function Base({ children, variant = "bold", className }) {
  return (
    <p
      className={cn(
        "text-[1rem]", // 16px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </p>
  );
}

function Title({ children, variant = "semibold", className }) {
  return (
    <p
      className={cn(
        "xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px]", // 24px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </p>
  );
}

function Body({ children, variant = "regular", className }) {
  return (
    <p
      className={cn(
        "xl:text-[16px] lg:text-[15px] md:text-[14px] text-[13px] ", //14px
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </p>
  );
}

function Caption({ children, variant = "bold", className }) {
  return (
    <span
      className={cn(
        "text-base",
        variant === "bold" && "font-bold",
        variant === "semibold" && "font-semibold",
        variant === "medium" && "font-medium",
        variant === "regular" && "font-normal",
        className
      )}
    >
      {children}
    </span>
  );
}

const Typography = {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Base,
  Body,
  Caption,
  Title,
};

export default Typography;
