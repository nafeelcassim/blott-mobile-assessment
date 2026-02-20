import React from "react";
import { Text, View } from "react-native";

export function HomeEmptyState() {
  return (
    <View className="mt-10">
      <Text className="text-sm text-neutral-600">No news available.</Text>
    </View>
  );
}
