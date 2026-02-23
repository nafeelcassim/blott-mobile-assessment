import React from "react";
import { Pressable, Text, View } from "react-native";

type LoginPinProps = {
  pin: string;
  maxLength: number;
  onPress: () => void;
  className?: string;
};

export function LoginPin({ pin, maxLength, onPress, className }: LoginPinProps) {
  return (
    <Pressable onPress={onPress} className={className ?? "mt-6 flex-row gap-3"}>
      {Array.from({ length: maxLength }).map((_, idx) => {
        const isFilled = idx < pin.length;
        return (
          <View
            key={idx}
            className={`h-12 w-12 rounded-xl border items-center justify-center ${
              isFilled ? "border-white/70 bg-white/10" : "border-white/40 bg-transparent"
            }`}
          >
            {isFilled ? (
              <View className="h-2.5 w-2.5 rounded-full bg-white" />
            ) : (
              <Text className="text-white/50 text-xl leading-none">-</Text>
            )}
          </View>
        );
      })}
    </Pressable>
  );
}
