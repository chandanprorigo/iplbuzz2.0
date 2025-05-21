import React, { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/DataContextProvider";
import { convertStatsToChartData, getTeamStats, TeamStats as StatsRecord } from "../../common/functions";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

interface TeamStats {
  team: string;
  played: number;
  wins: number;
  losses: number;
}

const Home: React.FC = () => {
  const { data } = useDataContext();
  const [allTeams, setAllTeams] = useState<TeamStats[]>([]);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(null);
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const navigate = useNavigate();

  const updateChartOptions = (chartData: { categories: string[]; series: Highcharts.SeriesOptionsType[] }) => {
    setChartOptions({
      chart: {
        type: "column",
        height: 800,
      },
      title: {
        text: "Team Performance Overview",
      },
      xAxis: {
        categories: chartData.categories,
        title: { text: "Teams" },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of Matches",
        },
      },
      legend: {
        align: "center",
        verticalAlign: "bottom",
      },
      series: chartData.series,
    });
  };

  const getTeamsStatsArray = (stats: StatsRecord): TeamStats[] =>
    Object.entries(stats).map(([team, s]) => ({
      team,
      ...s,
    }));

  useEffect(() => {
    if (data.length) {
      const stats = getTeamStats(data);
      const teamStatsArray = getTeamsStatsArray(stats);
      setAllTeams(teamStatsArray);

      const chartData = convertStatsToChartData(stats);
      updateChartOptions(chartData);
    }
  }, [data]);

  const handleTeamClick = (team: string) => {
    navigate(`/teams/${encodeURIComponent(team)}`);
  };

  return (
    <div className="home-container">
      <div className="team-cards">
        {allTeams.map((card, index) => (
          <div
            key={index}
            className={`team-card ${selectedCard === index ? "selected" : ""}`}
            onClick={() => {
              setSelectedCard(index);
              handleTeamClick(card.team);
            }}
          >
            <h2>{card.team}</h2>
            <p>Total played: {card.played}</p>
            <p>Total wins: {card.wins}</p>
            <p>Total losses: {card.losses}</p>
          </div>
        ))}
      </div>

      {chartOptions && (
        <div className="chart-container">
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Home;
