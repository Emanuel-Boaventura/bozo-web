import { IPlayer, usePlayersContext } from "@/context/playersContext";
import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IScoreboard {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Scoreboard({ open, setOpen }: IScoreboard) {
  const { players } = usePlayersContext();
  const ref = useClickOutside(() => setOpen(false));

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
            {players
              .sort((a, b) => playerSum(b) - playerSum(a))
              .map((player, index) => (
                <div key={player.name} className="flex flex-col leading-tight">
                  <p>
                    <strong>{index + 1}-</strong> {player.name}
                  </p>
                  <p className="font-bold">{playerSum(player)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
