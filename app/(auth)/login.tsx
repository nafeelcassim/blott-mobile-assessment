import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [pin, setPin] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);

  const maxLength = 4;
  const isComplete = pin.length === maxLength;

  const handleChangeText = (text: string) => {
    const next = text.replace(/\D/g, "").slice(0, maxLength);
    setPin(next);
  };

  const onContinue = () => {
    if (!isComplete) return;
    router.navigate("/face-id");
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

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
