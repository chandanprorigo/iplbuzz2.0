import React, { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/DataContextProvider";
import {
  convertStatsToChartData,
  getTeamStats,
  TeamStats as StatsRecord,
} from "../../common/functions";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import "highcharts/modules/accessibility";
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
  const [chartOptions, setChartOptions] = useState<Highcharts.Options | null>(
    null
  );
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const navigate = useNavigate();

  const updateChartOptions = (chartData: {
    categories: string[];
    series: Highcharts.SeriesOptionsType[];
  }) => {
    setChartOptions({
      title: {
        text: "Team Performance Overview",
      },
      chart: {
        type: "column",
        height: 800,
      },
      accessibility: {
        enabled: true,
        description: "A chart describing some data.",
      },
      xAxis: {
        categories: chartData.categories,
        title: { text: "Teams" },
        accessibility: {
          description: "Team X axis"
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: "Number of Matches",
        },
         accessibility: {
          description: "Number of Matches Y axis"
        }
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
      <section className="team-cards" aria-label="Team statistics">
        {allTeams.map((card, index) => (
          <button
            key={index}
            type="button"
            className={`team-card ${selectedCard === index ? "selected" : ""}`}
            onClick={() => {
              setSelectedCard(index);
              handleTeamClick(card.team);
            }}
            aria-pressed={selectedCard === index}
            aria-label={`Select ${card.team} team card. Played ${card.played}, won ${card.wins}, lost ${card.losses}`}
          >
            <h2>{card.team}</h2>
            <p>Total played: {card.played}</p>
            <p>Total wins: {card.wins}</p>
            <p>Total losses: {card.losses}</p>
          </button>
        ))}
      </section>

      {chartOptions && (
        <section
          className="chart-container"
          aria-label="Team performance chart"
        >
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </section>
      )}
    </div>
  );
};

export default Home;
