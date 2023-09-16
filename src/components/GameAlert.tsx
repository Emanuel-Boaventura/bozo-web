/* eslint-disable react-hooks/exhaustive-deps */
import { useGameContext } from "@/context/gameContext";
import { usePlayersContext } from "@/context/playersContext";
import { initalPlayers } from "@/utils/data";
import { useRouter } from "next/router";

export default function GameAlert() {
  const { setPlayers } = usePlayersContext();
  const { unfinishedGame, setUnfinishedGame, currentGame, setCurrentGame } =
    useGameContext();
  const router = useRouter();

  function handleResumeGame() {
    setPlayers(JSON.parse(currentGame!));

    router.push("/game");
    setUnfinishedGame(false);
  }

  function handleNewGame() {
    setPlayers(initalPlayers);
    setCurrentGame(null);
    localStorage.removeItem("partida-bozó");

    setUnfinishedGame(false);
    router.push("/");
  }

  if (unfinishedGame) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div className="bg-orange-100 w-80 text-yellow-950 rounded-lg p-4 max-w-[90%]">
          <p className="text-lg font-bold text-center leading-snug">
            Foi detectado um jogo não finalizado, deseja retomá-lo ou iniciar um
            novo jogo?
          </p>

          <div className="flex gap-4">
            <button
              className="font-bold text-sm min-[343px]:text-base mt-4 bg-yellow-900 shadow text-orange-100 rounded-lg flex w-full justify-center p-2"
              onClick={handleResumeGame}
            >
              Retomar jogo
            </button>

            <button
              className="font-bold text-sm min-[343px]:text-base mt-4 bg-yellow-900 shadow text-orange-100 rounded-lg flex w-full justify-center p-2"
              onClick={handleNewGame}
            >
              Novo jogo
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
