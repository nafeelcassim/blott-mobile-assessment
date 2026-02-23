import { TEXT } from "@/constants";
import { Pressable, PressableProps, Text } from "react-native";

type NoAccountTextProps = {
  onPress: PressableProps["onPress"];
  className?: string;
};

export function NoAccountText({ onPress, className }: NoAccountTextProps) {
  return (
    <Pressable onPress={onPress} className={className ?? "mt-6"}>
      <Text className="text-white/80 text-sm underline">
        {TEXT.auth.login.noAccount}
      </Text>
    </Pressable>
  );
}
