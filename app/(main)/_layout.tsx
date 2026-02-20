import AppHeader from "@/components/ui/app-header";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ header: () => <AppHeader showBack={false} /> }}
      />
    </Stack>
  );
}
