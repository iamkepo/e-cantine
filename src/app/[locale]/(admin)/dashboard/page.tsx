"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect, useMemo } from "react";
import StatisticRepository from "@/repositories/statisticRepository";
import useDataFetch from "@/hooks/useDataForm";
import { IStatistics } from "@/core/interfaces";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const statistics = useDataFetch<IStatistics>(); 
  const statisticRepository = useMemo(() => new StatisticRepository(statistics.handleData), [statistics.handleData]);


  useEffect(() => {
    statisticRepository.fetchStatistics();
  }, [statisticRepository]);


  return (
    <div className="col-12">
      <h5 className="card-title">Statistiques</h5>
      <div className="row g-3">
        {(statistics.state.get?.data as IStatistics[]).map((stat, index: number) => (
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