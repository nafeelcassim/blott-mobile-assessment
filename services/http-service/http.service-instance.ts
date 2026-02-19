import { HttpService } from "./http.service";

export class HttpServiceInstance {
  private static httpServiceInstance: HttpService;

  public static setHttpServiceInstance = (instance: HttpService) => {
    HttpServiceInstance.httpServiceInstance = instance;
  };

  public static getHttpServiceInstance = () => {
    if (!HttpServiceInstance.httpServiceInstance) {
      throw new Error(
        "Http service is not defined. Set the service instance prior to this call.",
      );
    }
    return HttpServiceInstance.httpServiceInstance;
  };
}
