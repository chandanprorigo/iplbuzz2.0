import axios from "axios";
import { createContext, useContext, useEffect, useState, ReactNode, FC } from "react";
import Papa from "papaparse";
import { DataContextType, Match } from "../common/interfaces";
import { csvUrl } from "../common/constants";

const DataContext = createContext<DataContextType>({ data: [] });

interface DataContextProviderProps {
  children: ReactNode;
}

export const DataContextProvider: FC<DataContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<Match[]>([]);

  useEffect(() => {
    axios
      .get(csvUrl)
      .then((response) => {
        Papa.parse<Match>(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data.filter(row => row.Teams) as Match[]);
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching/parsing CSV:", error);
      });
  }, []);

  return <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
