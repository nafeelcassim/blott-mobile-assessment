import { ENV } from "@/utils";
import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { APIError } from "./api-error";

type HttpVerbs = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type OnTokenUpdateHandler = (
  accessToken: string,
  refreshToken: string,
) => Promise<unknown>;
export type GetAccessTokenCallback = () => Promise<string | null>;
export type GetRefreshTokenCallback = () => Promise<string | null>;
export type OnTokenUpdateFailedHandler = () => Promise<unknown>;
export class HttpService {
  // used to handle authenticated API calls
  private apiSauce!: ApisauceInstance;
  private apiSauceState: "pending" | "ready" = "pending";

  // used to put reques(hold when )[]okens are being refreshed
  private waitingList: (() => void)[] = [];

  // passed as an argument in order to avoid issues with JEST runtime
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.initializeApiSauce();
  }

  private initializeApiSauce = () => {
    this.apiSauce = create({ baseURL: this.baseUrl });

    // Setting custom header (KC_MOBILE_CLIENT_ID)
    this.apiSauce.addRequestTransform((request) => {
      request.headers = {
        ...request.headers,
        "X-Finnhub-Token": ENV.API_KEY,
      };
    });

    this.apiSauceState = "ready";
  };

  private waitUntilReady = () =>
    new Promise<void>((resolve) => {
      this.waitingList.push(() => resolve());
    });

  private notifyAndReleaseWaitingList = () => {
    // notify the waiters
    for (const entry of this.waitingList) {
      entry();
    }

    // empty the list
    this.waitingList = [];
  };

  private refreshAccessToken = async () => {};

  private fetch = async <T, U = T>(
    method: HttpVerbs,
    path: string,
    params: unknown,
    data: unknown,
    headers: {} | undefined,
  ) => {
    const { baseUrl } = this;

    if (!baseUrl) {
      throw new APIError(
        "INTERNAL_ERROR",
        `DnsUrl is not available for ${baseUrl}`,
      );
    }
    let response: ApiResponse<T, U>;

    // wait while apiSauce is not ready
    if (this.apiSauceState === "pending") {
      await this.waitUntilReady();
    }

    // make the request
    response = await this.apiSauce.any<T, U>({
      method,
      baseURL: baseUrl,
      url: path,
      params,
      data,
      headers,
    });

    if (response.status === 401) {
      if (this.apiSauceState === "ready") {
        try {
          this.apiSauceState = "pending";
          await this.refreshAccessToken();
        } catch (error) {
          console.error("Could not refresh the access token");
          // handle the error
        } finally {
          this.apiSauceState = "ready";
          // notify other requests waiting for apiSauce to be ready
          this.notifyAndReleaseWaitingList();
        }
      } else {
        await this.waitUntilReady();
      }

      response = await this.apiSauce.any<T, U>({
        method,
        baseURL: baseUrl,
        url: path,
        params,
        data,
        headers,
      });
    }

    // format the response as needed
    if (!response.ok) {
      throw new APIError(response.problem, response.data, response.status);
    }

    return response.data;
  };

  public get = async <T, U = T>(path: string, query?: {}) =>
    await this.fetch<T, U>("GET", path, query, undefined, undefined);

  public post = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>("POST", path, query, data, undefined);

  public put = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>("PUT", path, query, data, undefined);

  public patch = async <T, U = T>(path: string, data?: unknown, query?: {}) =>
    await this.fetch<T, U>("PATCH", path, query, data, undefined);

  public patchAnonymous = async <T, U = T>(
    path: string,
    data?: unknown,
    query?: {},
  ) => await this.fetch<T, U>("PATCH", path, query, data, undefined);

  public patchAnonymousWithCustomHeaders = async <T, U = T>(
    path: string,
    headers: {},
    data?: unknown,
    query?: {},
  ) => await this.fetch<T, U>("PATCH", path, query, data, headers);

  public postAnonymousWithCustomHeaders = async <T, U = T>(
    path: string,
    headers: {},
    data: unknown,
    query?: {},
  ) => await this.fetch<T, U>("POST", path, query, data, headers);

  public delete = async <T, U = T>(path: string, query?: {}, data?: unknown) =>
    await this.fetch<T, U>("DELETE", path, query, data, undefined);

  public getAnonymous = async <T, U = T>(
    path: string,
    query?: {},
    headers?: {},
  ) => await this.fetch<T, U>("GET", path, query, undefined, headers);

  public postAnonymous = async <T, U = T>(
    path: string,
    data?: unknown,
    query?: {},
  ) => await this.fetch<T, U>("POST", path, query, data, undefined);
}
