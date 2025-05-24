import statisticsService from "@/services/statisticsService";

export default class StatisticRepository {
  setList?: (data: { label: string; value: number }[]) => void;

  constructor(setStatistics?: (data: { label: string; value: number }[]) => void) {
    this.setList = setStatistics;
  }

  async fetchStatistics() {
    await statisticsService.getStatistics()
      .then((data) => {
        if(this.setList ){
          this.setList(data as { label: string; value: number }[]);
        }
        return data
      })
      .catch((error) => console.error(error));
  }

}