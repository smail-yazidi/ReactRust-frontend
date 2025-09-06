import * as LucideIcons from "lucide-react";
import { ComponentType, SVGProps } from "react";

export const getIcon = (iconName?: string): ComponentType<SVGProps<SVGSVGElement>> | null => {
  if (!iconName) return null;
  const pascalCase = iconName.charAt(0).toUpperCase() + iconName.slice(1);
  const IconComponent = (LucideIcons as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[pascalCase];
  return IconComponent || null;
};
