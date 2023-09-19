import { useGameContext } from "@/context/gameContext";
import { IPlayer, usePlayersContext } from "@/context/playersContext";
import { useClickOutside } from "@/hooks/onClickOutside";
import { TPoint } from "@/pages/game";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ISelectValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenScoreboard: Dispatch<SetStateAction<boolean>>;
  point: TPoint;
  actualPlayer: number;
  onNextPlayer: () => void;
}

export default function SelectValue({
  open,
  setOpen,
  point,
  actualPlayer,
  onNextPlayer,
  setOpenScoreboard,
}: ISelectValue) {
  const { setPlayers } = usePlayersContext();
  const { automaticNext, setCurrentGame } = useGameContext();
  const ref = useClickOutside(() => setOpen(false));

  function getPoints(value: string) {
    if (value === "as") {
      return [0, 1, 2, 3, 4, 5];
    }
    if (value === "duque") {
      return [0, 2, 4, 6, 8, 10];
    }
    if (value === "terno") {
      return [0, 3, 6, 9, 12, 15];
    }
    if (value === "quadra") {
      return [0, 4, 8, 12, 16, 20];
    }
    if (value === "quina") {
      return [0, 5, 10, 15, 20, 25];
    }
    if (value === "sena") {
      return [0, 6, 12, 18, 24, 30];
    }
    if (value === "full") {
      return [0, 10, 15];
    }
    if (value === "seguida") {
      return [0, 20, 25];
    }
    if (value === "quadrada") {
      return [0, 30, 35];
    }
    if (value === "general") {
      return [0, 40];
    }
    return [];
  }

  function handleSetPoint(value: number | null) {
    setPlayers((prevState) => {
      const updatedPLayers = prevState.map((player, index) =>
        index === actualPlayer ? { ...player, [point]: value } : player
      );

      setCurrentGame(JSON.stringify(updatedPLayers));
      localStorage.setItem("partida-bozó", JSON.stringify(updatedPLayers));

      verifyEndGame(updatedPLayers);
      return updatedPLayers as IPlayer[];
    });

    if (automaticNext) onNextPlayer();
    setOpen(false);
  }

  function verifyEndGame(players: IPlayer[]) {
    for (const player of players) {
      for (const key in player) {
        if (player[key as keyof IPlayer] === null) {
          return false;
        }
      }
    }
    setOpenScoreboard(true);
  }

  if (open) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div
          ref={ref}
          className="relative bg-orange-100 w-80 text-yellow-950 rounded-lg py-8 px-4 max-w-[90%]"
        >
          <Image
            src={xmark}
            alt="Botão de fechar"
            onClick={() => setOpen(false)}
            className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform cursor-pointer"
          />
          <p className="text-2xl font-bold text-center mb-5">
            Selecione o valor
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              type="button"
              className="font-semibold text-sm bg-yellow-800 shadow text-orange-50 rounded-full flex items-center justify-center h-14 w-14"
              onClick={() => handleSetPoint(null)}
            >
              Limpar
            </button>
            {getPoints(point)?.map((number) => (
              <button
                key={number}
                type="button"
                className="font-semibold text-lg bg-yellow-800 shadow text-orange-50 rounded-full flex items-center justify-center h-14 w-14"
                onClick={() => handleSetPoint(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
