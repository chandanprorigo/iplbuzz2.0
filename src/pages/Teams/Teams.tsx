import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContextProvider";
import { summarizeTeamStats } from "../../common/functions";
import "./Teams.scss";
import { teamSquad } from "../../data/team-squad";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Link } from "react-router-dom";

interface Player {
  player: string;
}

interface TeamStats {
  team: string;
  data: Array<{
    year: string;
    played: number;
    wins: number;
    losses: number;
  }>;
}

const Teams: FC = () => {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const { data } = useDataContext();
  const [currentTeamStats, setCurrentTeamStats] = useState<TeamStats | any>({});
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [teamPlayers, setTeamPlayers] = useState<Player[]>([]);
  const [teamPieChartOptions, setTeamPieChartOptions] = useState<any>({
    chart: { type: "pie" },
    title: { text: "" },
    series: [{ name: "", data: [] }],
  });

  useEffect(() => {
    if (data?.length) {
      const stats = summarizeTeamStats(data);
      const currentTeam = stats.find((stat: TeamStats) => stat.team === name);
      setCurrentTeamStats(currentTeam);
    }
  }, [data, name]);

  const renderTeamCards = () => (
    <div className="card-grid">
      {currentTeamStats?.data?.map((card: any, index: number) => (
        <div
          key={index}
          className={`team-card ${selectedCard === index ? "selected" : ""}`}
          onClick={() => {
            setSelectedCard(index);
            teamCardHandler(card);
          }}
        >
          <h3>{card.year}</h3>
          <p>Total played - {card.played}</p>
          <p>Total wins - {card.wins}</p>
          <p>Total losses - {card.losses}</p>
        </div>
      ))}
    </div>
  );

  const renderTeamContainer = () => (
    <div className="team-container">
      <div className="team-column">
        <div className="team-box">
          <h2>{name} Squad</h2>
          {renderTeamSquad()}
        </div>
      </div>
      <div className="team-column">
        <div className="team-box">{renderTeamPieChartByYear()}</div>
      </div>
    </div>
  );

  const handlePlayerClick = (player: string) => {
    navigate(`/player/${player}`);
  };

  const renderTeamSquad = () => (
    <ul className="team-squad-list">
      {teamPlayers.map((player, index) => (
        <li key={index} className="team-squad-item">
          <Link to={`/players/${player.player}`} className="player-link">
            {player.player}
          </Link>
        </li>
      ))}
    </ul>
  );

  const renderTeamPieChartByYear = () => (
    <div className="chart-wrapper">
      <HighchartsReact highcharts={Highcharts} options={teamPieChartOptions} />
    </div>
  );

  const loadCurrentTeam = () => {
    let newTeam = teamSquad.filter((team) => team.team === name);
    if (!newTeam.length) {
      newTeam = teamSquad.filter(
        (team) => team.team === "Chennai Super Kings"
      );
    }
    setTeamPlayers(newTeam);
  };

  useEffect(() => {
    loadCurrentTeam();
  }, [name]);

  const teamCardHandler = (card: any) => {
    updateChartOptions(card);
  };

  const updateChartOptions = (currentYearStats: any) => {
    const pieData = [
      { name: "Played", y: currentYearStats.played, color: "#1e90ff" },
      { name: "Wins", y: currentYearStats.wins, color: "#32cd32" },
      { name: "Losses", y: currentYearStats.losses, color: "#ff4500" },
    ];

    setTeamPieChartOptions({
      chart: { type: "pie" },
      title: { text: `Games in Year ${currentYearStats.year}` },
      series: [{ name: "Games", data: pieData }],
    });
  };

  useEffect(() => {
    if (currentTeamStats?.data?.length) {
      updateChartOptions(currentTeamStats.data[0]);
    }
  }, [currentTeamStats?.data?.length]);

  return (
    <>
      <h1 className="team-title">{name}</h1>
      {renderTeamCards()}
      {renderTeamContainer()}
    </>
  );
};

export default Teams;
