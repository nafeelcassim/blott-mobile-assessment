import { StyleProp, ViewStyle } from "react-native";

export interface BaseViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  contentClassName?: string;
  edges?: ("top" | "bottom" | "left" | "right")[];
  style?: StyleProp<ViewStyle>;
}
