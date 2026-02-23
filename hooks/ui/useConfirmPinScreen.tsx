import { ErrorToast, useToast } from "@/components/ui/core/toast";
import { TEXT } from "@/constants";
import { useAuthStore } from "@/stores";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

export function useConfirmPinScreen() {
  const { pin: pinParam } = useLocalSearchParams<{ pin?: string | string[] }>();
  const initialPin = Array.isArray(pinParam) ? pinParam[0] : pinParam;
  const [pin, setPin] = React.useState("");
  const setStoredPin = useAuthStore((s) => s.setPin);
  const toast = useToast();

  const onComplete = async (completedPin: string) => {
    if (initialPin && completedPin !== initialPin) {
      toast.show({
        placement: "top",
        duration: 2500,
        render: ({ id }) => (
          <ErrorToast
            nativeID={id}
            title={TEXT.auth.confirmPin.mismatchTitle}
            description={TEXT.auth.confirmPin.mismatchDescription}
          />
        ),
      });
      setPin("");
      return;
    }

    await setStoredPin(completedPin);
    router.replace("/face-id");
  };

  return { pin, setPin, onComplete };
}
