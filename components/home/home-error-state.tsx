import React from "react";
import { Pressable, Text, View } from "react-native";

export type HomeErrorStateProps = {
  onRetry: () => void;
};

export function HomeErrorState({ onRetry }: HomeErrorStateProps) {
  return (
    <View className="mt-10">
      <Text className="text-sm text-neutral-600">Failed to load news.</Text>
      <Pressable onPress={onRetry} className="mt-3">
        <Text className="text-sm font-semibold text-neutral-900 underline">
          Try again
        </Text>
      </Pressable>
    </View>
  );
}
