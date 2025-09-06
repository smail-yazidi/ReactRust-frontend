import * as LucideIcons from "lucide-react";
export const getIcon = (iconName?: string) => {
    if (!iconName) return null; 
    const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    return LucideIcons[pascalCase] || null; 
  };
