import { useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, Icon } from "../core/icon";
import { AppHeaderProps } from "./app-header.types";

export default function AppHeader({ title, showBack = true }: AppHeaderProps) {
  const router = useRouter();

  return (
    <SafeAreaView
      edges={["top"]}
      className={`flex-row items-center px-6 bg-white `}
    >
      {/* Back Button */}
      {showBack && (
        <Pressable onPress={() => router.back()}>
          <Icon as={ChevronLeftIcon} />
        </Pressable>
      )}

      {/* Title */}
      {title && (
        <Text className="text-lg font-semibold text-black dark:text-white">
          {title}
        </Text>
      )}
    </SafeAreaView>
  );
}
