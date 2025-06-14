import { icons } from "lucide-react";

const CustomIcon = ({ name, color = "#006FEE", size = 24 , className }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} className={className} />;
};

export default CustomIcon;
