import { ParamsQuery, SetData } from "@/core/types";
import Request from "@/configs/request";
import { IStatistics } from "@/core/interfaces";

class StatisticsService extends Request<IStatistics> {
  setData: SetData<IStatistics>;

  constructor(setStatistics: SetData<IStatistics>) {
    super();
    this.setData = setStatistics;
  }

  async fetchStatistics(params?: ParamsQuery) {
    this.setData('get', 'loading', true);
    await this.get('/statistics', params || {})
      .then(data => {
        this.setData('get', 'data', data as IStatistics);
      })
      .catch(error => {
        this.setData('get', 'error', JSON.stringify(error));
      })
      .finally(() => {
        this.setData('get', 'loading', false);
      });
  }
}

export default StatisticsService;
