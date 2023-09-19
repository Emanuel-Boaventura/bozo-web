import { usePlayersContext } from "@/context/playersContext";
import { getRandomRgbColor } from "@/hooks/getRandomRgbColor";
import { getRgbToHex } from "@/hooks/getRgbToHex";
import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface IManualDices {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ManualDices({ open, setOpen }: IManualDices) {
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [trys, setTrys] = useState<0 | 1 | 2 | 3>(0);
  const ref = useClickOutside(handleExit);

  function handleExit() {
    if (trys !== 3 && trys !== 0) {
      alert("Are you sure you want to exit?");
      setOpen(false);
    }
    setOpen(false);
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
            className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform  cursor-pointer"
          />
          <p className="text-2xl font-bold text-center">Nome do jogador</p>
          <input
            type="text"
            value={newPlayer}
            autoFocus
            placeholder="Insira o nome"
            className="border border-orange-900 text-orange-950 w-full mt-5 p-2 rounded-lg outline-none bg-orange-50 text-center font-semibold  placeholder:opacity-50"
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
          />{" "}
          {error && (
            <p className="text-[12px] font-medium leading-none text-center text-red-500 mt-1">
              {error}
            </p>
          )}
          <button
            type="button"
            className="font-bold mt-4 bg-yellow-900 shadow text-orange-100 rounded-lg flex w-full justify-center  p-2"
            // onClick={handleManualDices}
          >
            Adicionar
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
