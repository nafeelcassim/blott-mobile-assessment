import { z } from "zod";

const envSchema = z.object({
  API_KEY: z.string().min(1),
  API_URL: z.string(),
});

export const ENV = envSchema.parse({
  API_KEY: process.env.EXPO_PUBLIC_FIN_HUB_API_KEY,
  API_URL: process.env.EXPO_PUBLIC_FIN_HUB_BASE_URL,
});
