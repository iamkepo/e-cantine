"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect, useMemo } from "react";
import StatisticRepository from "@/frontend/repositories/statistic.repository";
import { IStatistic } from "@/core/interfaces";
import { useState } from "react";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [statistics, setStatistics] = useState<IStatistic[]>([]); 
  const statisticRepository = useMemo(() => new StatisticRepository(), []);


  useEffect(() => {
    statisticRepository.fetchStatistics((data: IStatistic[]) => setStatistics(data));
  }, [statisticRepository]);


  return (
    <div className="col-12">
      <h5 className="card-title">Statistiques</h5>
      <div className="row g-3">
        {(statistics as IStatistic[]).map((stat, index: number) => (
          <div className="col-12 col-md-3" key={index}>
            <div className={`card text-bg-${theme}`}>
              <div className="card-body">
                <h6 className="card-title">{stat.label}</h6>
                <p className="card-text">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;