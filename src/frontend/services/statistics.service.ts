import Request from "@/configs/request";
import { IStatistic } from "@/core/interfaces";

class StatisticsService extends Request<IStatistic> {
  constructor() {
    super();
  }

  async fetchStatistics(onSuccess?: (data: IStatistic[]) => void, onError?: (error: Error) => void) {
    await this.get('/statistics', {})
      .then(data => {
        if (onSuccess) {
          onSuccess(data as IStatistic[]);
        }
      })
      .catch(error => {
        if (onError) {
          onError(error);
        }
      });
  }
}

export default StatisticsService;
