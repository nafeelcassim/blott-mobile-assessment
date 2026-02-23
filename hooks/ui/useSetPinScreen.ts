import { router } from "expo-router";
import React from "react";

export function useSetPinScreen() {
  const [pin, setPin] = React.useState("");

  const onComplete = (completedPin: string) => {
    router.navigate({
      pathname: "/confirm-pin",
      params: { pin: completedPin },
    });
  };

  return { pin, setPin, onComplete };
}
