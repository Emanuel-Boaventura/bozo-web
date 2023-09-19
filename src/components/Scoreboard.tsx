import { IPlayer, usePlayersContext } from "@/context/playersContext";
import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import { emptyPoints } from "@/utils/data";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IScoreboard {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Scoreboard({ open, setOpen }: IScoreboard) {
  const { players, setPlayers } = usePlayersContext();
  const ref = useClickOutside(() => setOpen(false));

  const playersList = players.map((player) => ({
    player: player.name,
    sum: playerSum(player),
  }));

  function playerSum(player: IPlayer) {
    return (
      (player.as ?? 0) +
      (player.duque ?? 0) +
      (player.terno ?? 0) +
      (player.quadra ?? 0) +
      (player.quina ?? 0) +
      (player.sena ?? 0) +
      (player.full ?? 0) +
      (player.seguida ?? 0) +
      (player.quadrada ?? 0) +
      (player.general ?? 0)
    );
  }

  function handleReset() {
    setPlayers((players) => {
      const resetedPlayers = players.map((player) => ({
        ...player,
        ...emptyPoints,
      }));

      return resetedPlayers;
    });

    setOpen(false);
  }

  if (open) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div
          ref={ref}
          className="relative bg-orange-100 w-80 text-yellow-950 rounded-lg p-4 max-w-[90%]"
        >
          <Image
            src={xmark}
            alt="Botão de fechar"
            onClick={() => setOpen(false)}
            className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform cursor-pointer"
          />
          <p className="text-2xl font-bold text-center mb-5">Placar</p>

          <div className="flex flex-col gap-4 text-center max-h-[80vh] overflow-y-auto">
            {playersList
              .sort((a, b) => b.sum - a.sum)
              .map((player, index) => (
                <div
                  key={player.player}
                  className="flex flex-col leading-tight"
                >
                  <p>
                    <strong>{index + 1}-</strong> {player.player}
                  </p>
                  <p className="font-bold">{player.sum}</p>
                </div>
              ))}
          </div>

          <button
            className="font-bold text-sm min-[343px]:text-base bg-yellow-900 shadow text-orange-100 rounded-lg flex w-full justify-center p-2 mt-6"
            onClick={handleReset}
          >
            Reiniciar jogo
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
