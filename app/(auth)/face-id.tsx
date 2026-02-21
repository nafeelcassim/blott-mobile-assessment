import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { useAuthStore } from "@/stores";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function FaceIdScreen() {
  const setFaceIdEnabled = useAuthStore((s) => s.setFaceIdEnabled);
  const completeFaceIdSetup = useAuthStore((s) => s.completeFaceIdSetup);
  const loginWithFaceId = useAuthStore((s) => s.loginWithFaceId);

  const [isEnabling, setIsEnabling] = React.useState(false);
  const [isSupported, setIsSupported] = React.useState(true);

  React.useEffect(() => {
    const check = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setIsSupported(hasHardware && isEnrolled);
    };

    void check();
  }, []);

  const onEnableFaceId = async () => {
    if (!isSupported || isEnabling) return;
    setIsEnabling(true);
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Enable Face ID",
        cancelLabel: "Cancel",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        await setFaceIdEnabled(true);
        await loginWithFaceId();
        router.replace("/(main)");
      }
    } finally {
      setIsEnabling(false);
    }
  };

  const onNotNow = async () => {
    await completeFaceIdSetup();
    await loginWithFaceId();
    router.replace("/(main)");
  };

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
            {isSupported
              ? "Use face ID instead of a password next time you login."
              : "Face ID is not available on this device."}
          </Text>
        </View>

        <View className="pb-6 gap-3">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            className="rounded-full"
            isDisabled={!isSupported || isEnabling}
            onPress={onEnableFaceId}
          >
            <ButtonText>Enable Face ID</ButtonText>
          </Button>

          <Button
            action="secondary"
            variant="outline"
            size="lg"
            className="rounded-full"
            onPress={onNotNow}
          >
            <ButtonText>Not now</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
