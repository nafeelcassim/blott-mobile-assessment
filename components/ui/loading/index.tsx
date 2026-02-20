import {
    ActivityIndicator as ReactActivityIndicator,
    View,
} from "react-native";

export function ActivityIndicator() {
  return (
    <View className="flex-1 items-center justify-center">
      <ReactActivityIndicator />
    </View>
  );
}
