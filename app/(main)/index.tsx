import { useGeneralNews } from "@/hooks";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading } = useGeneralNews();

  console.log(data);
  console.log(isLoading);

  return (
    <View className="mt-10" style={{ paddingTop: 100 }}>
      <Text>Hello Wordl </Text>
    </View>
  );
}
