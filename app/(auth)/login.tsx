import { LoginPin, NoAccountText } from "@/components/login";
import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { TEXT } from "@/constants";
import { useLoginScreen } from "@/hooks";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const {
    pin,
    inputRef,
    maxLength,
    isComplete,
    isFaceIdSupported,
    faceIdEnabled,
    handleChangeText,
    onContinue,
    onUseFaceId,
    goToRegister,
  } = useLoginScreen(4);

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
          <Text className="text-white heading-2xl text-center">
            {TEXT.auth.login.title}
          </Text>
          <Text className="mt-8 text-white body-lg-normal text-base">
            {TEXT.auth.login.subtitle}
          </Text>

          <LoginPin
            pin={pin}
            maxLength={maxLength}
            onPress={() => inputRef.current?.focus()}
          />

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
                {TEXT.auth.login.useFaceId}
              </Text>
            </Pressable>
          ) : null}

          <NoAccountText onPress={goToRegister} className="mt-6" />
        </View>

        <View className="pb-6">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            isDisabled={!isComplete}
            onPress={onContinue}
            className="rounded-full bg-secondary-500"
          >
            <ButtonText className="text-black">
              {TEXT.auth.login.continue}
            </ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
