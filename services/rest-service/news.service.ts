import { FinnhubNewsItem } from "@/models";
import { APIError, HttpServiceInstance } from "../http-service";

export class NewsService {
  static async getGeneralNews(category: string = "general") {
    const httpServiceInstance = HttpServiceInstance.getHttpServiceInstance();

    try {
      const response = await httpServiceInstance.get<FinnhubNewsItem[]>(
        "/news",
        {
          category,
        },
      );

      if (!response) {
        throw new APIError("INTERNAL_ERROR");
      }

      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("UNKNOWN_ERROR", error);
    }
  }
}
