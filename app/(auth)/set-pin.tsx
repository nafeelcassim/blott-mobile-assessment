import { BaseView } from "@/components/ui/core/base-view";
import { PinInput } from "@/components/ui/core/pin-input";
import { PreLoginTitle } from "@/components/ui/title";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function SetPinScreen() {
  const [pin, setPin] = React.useState("");

  return (
    <BaseView>
      <PreLoginTitle
        title="Set a PIN"
        description="You can use to log back in securely"
      />

      <View className="mt-16">
        <PinInput
          value={pin}
          onChange={setPin}
          autoFocus
          onComplete={(completedPin) => {
            router.navigate({
              pathname: "/confirm-pin",
              params: { pin: completedPin },
            });
          }}
        />
      </View>
    </BaseView>
  );
}
