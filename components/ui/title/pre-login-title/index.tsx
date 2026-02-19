import { Text, View } from "react-native";
import { PreLoginTitleProps } from "./pre-login-title.types";

export function PreLoginTitle({ title, description }: PreLoginTitleProps) {
  return (
    <View className="w-full items-start pt-4">
      <Text className="text-xl font-semibold text-black dark:text-white">
        {title}
      </Text>

      {description && (
        <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </Text>
      )}
    </View>
  );
}
