import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { initalPlayers } from "./initialPlayers";

interface PlayersProps {
  children: ReactNode;
}

export interface IPlayer {
  name: string;
  color: string;
  bgColor: string;
  as: null | 0 | 1 | 2 | 3 | 4 | 5;
  duque: null | 0 | 2 | 4 | 6 | 8 | 10;
  terno: null | 0 | 3 | 6 | 9 | 12 | 15;
  quadra: null | 0 | 4 | 8 | 12 | 16 | 20;
  quina: null | 0 | 5 | 10 | 15 | 20 | 25;
  sena: null | 0 | 6 | 12 | 18 | 24 | 30;
  full: null | 0 | 10 | 15;
  seguida: null | 0 | 20 | 25;
  quadrada: null | 0 | 30 | 35;
  general: null | 0 | 40;
}

interface IPlayersContext {
  players: IPlayer[];
  setPlayers: Dispatch<SetStateAction<IPlayer[]>>;
  automaticNext: boolean;
  setAutomaticNext: Dispatch<SetStateAction<boolean>>;
  unfinishedGame: boolean;
  setUnfinishedGame: Dispatch<SetStateAction<boolean>>;
  currentGame: string | null;
  setCurrentGame: Dispatch<SetStateAction<string | null>>;
}

const PlayersContext = createContext({} as IPlayersContext);

export function PlayersProvider({ children }: PlayersProps) {
  const [automaticNext, setAutomaticNext] = useState<boolean>(false);
  const [players, setPlayers] = useState<IPlayer[]>(initalPlayers);

  const [unfinishedGame, setUnfinishedGame] = useState<boolean>(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  console.log("currentGame:", currentGame);

  useEffect(() => {
    const gameExist = localStorage.getItem("partida-bozó");
    if (gameExist) {
      setCurrentGame(gameExist);
      setUnfinishedGame(true);
    }
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        automaticNext,
        setAutomaticNext,
        unfinishedGame,
        setUnfinishedGame,
        currentGame,
        setCurrentGame,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayersContext() {
  return useContext(PlayersContext);
}
