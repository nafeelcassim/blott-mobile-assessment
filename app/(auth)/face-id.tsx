import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function FaceIdScreen() {
  return (
    <BaseView edges={["bottom", "left", "right"]}>
      <View className="flex-1 justify-between">
        <View className="flex-1 items-center justify-center px-6">
          <View className="h-20 w-20 rounded-2xl bg-gray-100 items-center justify-center border-4 border-white shadow-md">
            <MaterialCommunityIcons
              name="face-recognition"
              size={20}
              color="#553C9A"
            />
          </View>
          <Text className="mt-6 text-2xl font-semibold text-black">
            Login with a Look
          </Text>
          <Text className="mt-2 text-center text-base text-gray-500 max-w-[280px]">
            Use face ID instead of a password next time you login.
          </Text>
        </View>

        <View className="pb-6 gap-3">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            className="rounded-full"
          >
            <ButtonText>Enable Face ID</ButtonText>
          </Button>

          <Button
            action="secondary"
            variant="outline"
            size="lg"
            className="rounded-full"
            onPress={() => router.back()}
          >
            <ButtonText>Not now</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
