import * as Icons from "lucide-react";

const LucideIcon = ({ name, size = 20, className = "" }) => {
  const DynamicIcon = Icons[name];

  if (!DynamicIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <DynamicIcon size={size} className={className} />;
};

export default LucideIcon;
