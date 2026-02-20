import { BaseView } from "@/components/ui/core/base-view";
import { PinInput } from "@/components/ui/core/pin-input";
import { PreLoginTitle } from "@/components/ui/title";
import { useAuthStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ConfirmPinScreen() {
  const { pin: initialPin } = useLocalSearchParams<{ pin?: string }>();
  const [pin, setPin] = React.useState("");
  const setStoredPin = useAuthStore((s) => s.setPin);

  return (
    <BaseView>
      <PreLoginTitle
        title="Confirm your PIN"
        description="Enter tour PIN one more time"
      />

      <View className="mt-16">
        <PinInput
          value={pin}
          onChange={setPin}
          autoFocus
          onComplete={async (completedPin) => {
            if (initialPin && completedPin !== initialPin) {
              setPin("");
              return;
            }

            await setStoredPin(completedPin);
            router.replace("/face-id");
          }}
        />
      </View>
    </BaseView>
  );
}
