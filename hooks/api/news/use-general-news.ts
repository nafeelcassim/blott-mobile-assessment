import { useQuery } from "@tanstack/react-query";
import { NewsService } from "@/services/rest-service/news.service";

export const generalNewsQueryKey = (category: string) => [
  "news",
  "general",
  category,
] as const;

export function useGeneralNews(category: string = "general") {
  return useQuery({
    queryKey: generalNewsQueryKey(category),
    queryFn: () => NewsService.getGeneralNews(category),
  });
}
