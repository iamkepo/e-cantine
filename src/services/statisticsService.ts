import { HttpRequestType } from "@/enums/http-request.enum";
import { AxiosError, AxiosResponse } from "axios";
import Request from "@/services/request";

const statisticsService = {
  getStatistics() {
    return new Promise((resolve, reject) => {
      new Request()
        .append('/statistics')
        .method(HttpRequestType.GET)
        .then(async (response: AxiosResponse) => {
          resolve(response.data.data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  },
};

export default statisticsService;
