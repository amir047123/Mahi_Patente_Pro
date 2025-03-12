import { LoaderCircle } from "lucide-react";

export default function Spinner({ size = 20, className }) {
  return (
    <LoaderCircle
      size={size}
      className={`animate-spin text-secondary ${className}`}
    />
  );
}
