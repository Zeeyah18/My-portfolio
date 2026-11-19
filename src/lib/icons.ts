import {
  siCss,
  siGit,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siPython,
  siReact,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { Award, Braces, Gem, type LucideIcon } from "lucide-react";

export const simpleIconMap: Record<string, SimpleIcon> = {
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siNodedotjs,
  siPython,
  siGit,
};

export const lucideIconMap: Record<string, LucideIcon> = {
  Award,
  Braces,
  Gem,
};

export function getSimpleIcon(key: string): SimpleIcon | undefined {
  return simpleIconMap[key] || simpleIconMap.siReact;
}

export function getLucideIcon(key: string): LucideIcon {
  return lucideIconMap[key] || Award;
}

