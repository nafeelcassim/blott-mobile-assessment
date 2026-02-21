import { useAuthStore } from "@/stores";
import { Redirect } from "expo-router";

export default function AuthIndex() {
  const { hasPin } = useAuthStore();

  if (hasPin) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/register" />;
}
