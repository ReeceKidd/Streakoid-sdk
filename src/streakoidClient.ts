import axios from "axios";

export const streakoidClientFactory = (applicationUrl: string) => {
  return axios.create({
    headers: {
      "Content-Type": "application/json"
    },
    baseURL: applicationUrl
  });
};
