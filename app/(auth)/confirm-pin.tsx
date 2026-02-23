import { BaseView } from "@/components/ui/core/base-view";
import { PinInput } from "@/components/ui/core/pin-input";
import { PreLoginTitle } from "@/components/ui/title";
import { TEXT } from "@/constants";
import { useConfirmPinScreen } from "@/hooks";
import { View } from "react-native";

export default function ConfirmPinScreen() {
  const { pin, setPin, onComplete } = useConfirmPinScreen();

  return (
    <BaseView>
      <View className="mt-2">
        <PreLoginTitle
          title={TEXT.auth.confirmPin.title}
          description={TEXT.auth.confirmPin.description}
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
