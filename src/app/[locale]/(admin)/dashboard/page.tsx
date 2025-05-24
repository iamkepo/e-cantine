"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useState, useEffect, useMemo } from "react";
import StatisticRepository from "@/repositories/statisticRepository";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const [stats, setStats] = useState([]);
  const statisticRepository = useMemo(() => new StatisticRepository(setStats as (data: any[]) => void), []);


  useEffect(() => {
    statisticRepository.fetchStatistics();
  }, [statisticRepository]);


  return (
    <div className="col-12">
      <h5 className="card-title">Statistiques</h5>
      <div className="row g-3">
        {stats.map((stat: any, index: number) => (
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