import { BaseView } from "@/components/ui/core/base-view";
import { PinInput } from "@/components/ui/core/pin-input";
import { ErrorToast, useToast } from "@/components/ui/core/toast";
import { PreLoginTitle } from "@/components/ui/title";
import { useAuthStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function ConfirmPinScreen() {
  const { pin: pinParam } = useLocalSearchParams<{
    pin?: string | string[];
  }>();
  const initialPin = Array.isArray(pinParam) ? pinParam[0] : pinParam;
  const [pin, setPin] = React.useState("");
  const setStoredPin = useAuthStore((s) => s.setPin);
  const toast = useToast();

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
              toast.show({
                placement: "top",
                duration: 2500,
                render: ({ id }) => (
                  <ErrorToast
                    nativeID={id}
                    title="PINs don’t match"
                    description="Please try again."
                  />
                ),
              });
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
