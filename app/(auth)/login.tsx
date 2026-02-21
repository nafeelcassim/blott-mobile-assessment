import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { ErrorToast, useToast } from "@/components/ui/core/toast";
import { useAuthStore } from "@/stores";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [pin, setPin] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);
  const loginWithPin = useAuthStore((s) => s.loginWithPin);
  const loginWithFaceId = useAuthStore((s) => s.loginWithFaceId);
  const faceIdEnabled = useAuthStore((s) => s.faceIdEnabled);
  const toast = useToast();

  const [isFaceIdSupported, setIsFaceIdSupported] = React.useState(false);

  const maxLength = 4;
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
          title="Invalid PIN"
          description="Please try again."
        />
      ),
    });

    setPin("");
  };

  const onUseFaceId = async () => {
    if (!faceIdEnabled || !isFaceIdSupported) return;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Face ID",
      cancelLabel: "Cancel",
      fallbackLabel: "Use Passcode",
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

  return (
    <BaseView className="flex-1 bg-primary-700">
      <LinearGradient
        pointerEvents="none"
        colors={["rgba(24,24,24,0)", "rgba(24,24,24,0.5)", "rgba(24,24,24,0)"]}
        locations={[0, 0.5048, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <View className="flex-1 justify-between px-6">
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-2xl font-semibold text-center">
            Welcome to{"\n"}Finance Digest
          </Text>
          <Text className="mt-4 text-white/70 text-base">
            Enter your passcode
          </Text>

          <Pressable
            onPress={() => inputRef.current?.focus()}
            className="mt-6 flex-row gap-3"
          >
            {Array.from({ length: maxLength }).map((_, idx) => {
              const isFilled = idx < pin.length;
              return (
                <View
                  key={idx}
                  className={`h-12 w-12 rounded-xl border items-center justify-center ${
                    isFilled
                      ? "border-white/70 bg-white/10"
                      : "border-white/40 bg-transparent"
                  }`}
                >
                  {isFilled ? (
                    <View className="h-2.5 w-2.5 rounded-full bg-white" />
                  ) : (
                    <Text className="text-white/50 text-xl leading-none">
                      -
                    </Text>
                  )}
                </View>
              );
            })}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={pin}
            onChangeText={handleChangeText}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            autoCorrect={false}
            caretHidden
            className="absolute opacity-0"
          />

          {faceIdEnabled && isFaceIdSupported ? (
            <Pressable onPress={onUseFaceId} className="mt-4">
              <Text className="text-white/80 text-sm underline">
                Use Face ID
              </Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={() => router.navigate("/register")}
            className="mt-6"
          >
            <Text className="text-white/80 text-sm underline">
              Don’t have an account?
            </Text>
          </Pressable>
        </View>

        <View className="pb-6">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            isDisabled={!isComplete}
            onPress={onContinue}
            className="rounded-full bg-white"
          >
            <ButtonText className="text-black">Continue</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
