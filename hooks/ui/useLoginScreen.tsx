import { ErrorToast, useToast } from "@/components/ui/core/toast";
import { TEXT } from "@/constants";
import { useAuthStore } from "@/stores";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React from "react";
import { TextInput } from "react-native";

export function useLoginScreen(maxLength = 4) {
  const [pin, setPin] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);
  const loginWithPin = useAuthStore((s) => s.loginWithPin);
  const loginWithFaceId = useAuthStore((s) => s.loginWithFaceId);
  const faceIdEnabled = useAuthStore((s) => s.faceIdEnabled);
  const toast = useToast();

  const [isFaceIdSupported, setIsFaceIdSupported] = React.useState(false);

  const isComplete = pin.length === maxLength;

  const handleChangeText = (text: string) => {
    const next = text.replace(/\D/g, "").slice(0, maxLength);
    setPin(next);
  };

  const onContinue = async () => {
    if (!isComplete) return;
    const ok = await loginWithPin(pin);
    if (ok) {
      router.replace("/(main)");
      return;
    }

    toast.show({
      placement: "top",
      duration: 2500,
      render: ({ id }) => (
        <ErrorToast
          nativeID={id}
          title={TEXT.auth.login.invalidPinTitle}
          description={TEXT.auth.login.invalidPinDescription}
        />
      ),
    });

    setPin("");
  };

  const onUseFaceId = async () => {
    if (!faceIdEnabled || !isFaceIdSupported) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: TEXT.auth.login.faceIdPrompt,
      cancelLabel: TEXT.auth.login.faceIdCancel,
      fallbackLabel: TEXT.auth.login.faceIdFallback,
    });

    if (result.success) {
      await loginWithFaceId();
      router.replace("/(main)");
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const check = async () => {
      if (!faceIdEnabled) {
        setIsFaceIdSupported(false);
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setIsFaceIdSupported(hasHardware && isEnrolled);
    };

    void check();
  }, [faceIdEnabled]);

  return {
    pin,
    setPin,
    inputRef,
    maxLength,
    isComplete,
    isFaceIdSupported,
    faceIdEnabled,
    handleChangeText,
    onContinue,
    onUseFaceId,
    goToRegister: () => router.navigate("/register"),
  };
}
