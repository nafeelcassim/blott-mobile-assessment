import { BaseView } from "@/components/ui/core/base-view";
import { PinInput } from "@/components/ui/core/pin-input";
import { PreLoginTitle } from "@/components/ui/title";
import { TEXT } from "@/constants";
import { useSetPinScreen } from "@/hooks";
import { View } from "react-native";

export default function SetPinScreen() {
  const { pin, setPin, onComplete } = useSetPinScreen();

  return (
    <BaseView>
      <View className="mt-2">
        <PreLoginTitle
          title={TEXT.auth.setPin.title}
          description={TEXT.auth.setPin.description}
        />

        <View className="mt-16">
          <PinInput
            value={pin}
            onChange={setPin}
            autoFocus
            onComplete={onComplete}
          />
        </View>
      </View>
    </BaseView>
  );
}
