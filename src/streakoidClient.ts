import axios from "axios";
import SupportedRequestHeaders from "./SupportedRequestHeaders";

export const londonTimezone = "Europe/London";

export const streakoidClientFactory = (applicationUrl: string) => {
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      [SupportedRequestHeaders.xTimezone]: londonTimezone
    },
    baseURL: applicationUrl
  });
};
