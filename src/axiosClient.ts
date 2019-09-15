import axios from "axios";

import { getServiceConfig } from "./getServiceConfig";

const { APPLICATION_URL } = getServiceConfig();

const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: APPLICATION_URL
});

export default axiosClient;
