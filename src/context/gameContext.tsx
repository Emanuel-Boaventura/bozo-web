import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface GameProps {
  children: ReactNode;
}

interface IGameContext {
  automaticNext: boolean;
  setAutomaticNext: Dispatch<SetStateAction<boolean>>;
  unfinishedGame: boolean;
  setUnfinishedGame: Dispatch<SetStateAction<boolean>>;
  currentGame: string | null;
  setCurrentGame: Dispatch<SetStateAction<string | null>>;
}

const GameContext = createContext({} as IGameContext);

export function GameProvider({ children }: GameProps) {
  const [automaticNext, setAutomaticNext] = useState<boolean>(false);

  const [unfinishedGame, setUnfinishedGame] = useState<boolean>(false);
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  useEffect(() => {
    const gameExist = localStorage.getItem("partida-bozó");
    if (gameExist) {
      setCurrentGame(gameExist);
      setUnfinishedGame(true);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        automaticNext,
        setAutomaticNext,
        unfinishedGame,
        setUnfinishedGame,
        currentGame,
        setCurrentGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
