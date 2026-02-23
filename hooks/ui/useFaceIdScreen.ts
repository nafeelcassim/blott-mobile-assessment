import { TEXT } from "@/constants";
import { useAuthStore } from "@/stores";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React from "react";

export function useFaceIdScreen() {
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
        promptMessage: TEXT.auth.faceId.enablePrompt,
        cancelLabel: TEXT.auth.faceId.enableCancel,
        fallbackLabel: TEXT.auth.faceId.enableFallback,
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

  return {
    isEnabling,
    isSupported,
    onEnableFaceId,
    onNotNow,
  };
}
