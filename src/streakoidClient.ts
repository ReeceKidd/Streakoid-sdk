import axios from "axios";

import { getServiceConfig } from "./getServiceConfig";

const { APPLICATION_URL } = getServiceConfig();

export const streakoidClientFactory = (applicationUrl: string) => {
  return axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    baseURL: applicationUrl
  });
};
