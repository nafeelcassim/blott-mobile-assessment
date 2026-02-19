import AppHeader from "@/components/ui/app-header";
import { Stack } from "expo-router";

export const unstable_settings = {
  anchor: "login",
};

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          header: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="set-pin"
        options={{
          header: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="confirm-pin"
        options={{
          header: () => <AppHeader />,
        }}
      />
      <Stack.Screen
        name="face-id"
        options={{
          header: () => <AppHeader showBack={false} />,
        }}
      />
    </Stack>
  );
}
