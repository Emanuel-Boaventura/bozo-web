import { useGameContext } from "@/context/gameContext";
import { usePlayersContext } from "@/context/playersContext";
import { useClickOutside } from "@/hooks/onClickOutside";
import check from "@/public/check.svg";
import xmark from "@/public/xmark.svg";
import { emptyPoints } from "@/utils/data";
import * as Checkbox from "@radix-ui/react-checkbox";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ISettings {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Settings({ open, setOpen }: ISettings) {
  const { automaticNext, setAutomaticNext } = useGameContext();
  const { setPlayers } = usePlayersContext();
  const ref = useClickOutside(() => setOpen(false));

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
          className="relative bg-orange-100 w-80 text-yellow-950 rounded-lg p-8 max-w-[90%]"
        >
          <Image
            src={xmark}
            alt="Botão de fechar"
            onClick={() => setOpen(false)}
            className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform cursor-pointer"
          />
          <p className="text-2xl font-bold text-center mb-5">Configurações</p>

          <div className="flex flex-col gap-4 justify-center">
            <div className="flex items-center gap-2">
              <Checkbox.Root
                checked={automaticNext}
                onCheckedChange={() => setAutomaticNext((state) => !state)}
                className="bg-yellow-50 border border-yellow-700 w-5 h-5 flex items-center justify-center rounded !transform-none"
              >
                <Checkbox.Indicator className="bg-red">
                  <Image
                    src={check}
                    alt="Checkbox Indicator"
                    className="w-3 h-3"
                  />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <p className="font-medium ">Próximo automatico.</p>
            </div>

            <button
              className="font-bold text-sm min-[343px]:text-base  bg-yellow-900 shadow text-orange-100 rounded-lg flex w-full justify-center p-2"
              onClick={handleReset}
            >
              Reiniciar jogo
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
