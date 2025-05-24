/* eslint-disable @typescript-eslint/no-explicit-any */
import statisticsService from "@/services/statisticsService";

export default class StatisticRepository {
  setStatistics?: (data: any[]) => void;

  constructor(setStatistics?: (data: any[]) => void) {
    this.setStatistics = setStatistics;
  }

  async fetchStatistics() {
    return statisticsService.getStatistics()
      .then((data) => {
        this.setStatistics?.(data as any[]);
      })
      .catch((error) => console.error(error));
  }

}
