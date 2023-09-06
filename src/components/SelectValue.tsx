import { IPlayer, usePlayersContext } from "@/context/playersContext";
import { TPoint } from "@/pages/game";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ISelectValue {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  point: TPoint;
  actualPlayer: number;
}

export default function SelectValue({
  open,
  setOpen,
  point,
  actualPlayer,
}: ISelectValue) {
  const { setPlayers } = usePlayersContext();

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

  function handleSetPoint(value: number) {
    setPlayers((prevState) => {
      const updatedPLayers = prevState.map((player, index) =>
        index === actualPlayer ? { ...player, [point]: value } : player
      );
      return updatedPLayers as IPlayer[];
    });
    setOpen(false);
  }

  if (open) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div className="relative bg-white rounded py-8 px-4 max-w-[90%] w-fit">
          <Image
            src={xmark}
            alt="Botão de fechar"
            onClick={() => setOpen(false)}
            className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform"
          />
          <p className="text-2xl font-bold text-center mb-5">
            Selecione o valor
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {getPoints(point)?.map((number) => (
              <button
                key={number}
                type="button"
                className="font-bold text-lg border rounded-full flex items-center justify-center h-14 w-14"
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
