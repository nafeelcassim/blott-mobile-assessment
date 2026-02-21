import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import "@/initialize-app";
import { useAuthStore } from "@/stores";

const queryClient = new QueryClient();

export default function RootLayout() {
  const { isAuthenticated, isHydrated, hydrate } = useAuthStore();

  React.useEffect(() => {
    void hydrate();
  }, [hydrate]);

  if (!isHydrated) {
    return null;
  }

  const canEnterMain = isAuthenticated;

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={canEnterMain}>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!canEnterMain}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
