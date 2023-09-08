import { usePlayersContext } from "@/context/playersContext";
import { getRandomHexColor } from "@/hooks/getRandomHexColor";
import { hexToRgbA } from "@/hooks/getRandomRgbColor";
import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAddPlayer {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddPlayer({ open, setOpen }: IAddPlayer) {
  const { players, setPlayers } = usePlayersContext();
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [error, setError] = useState<string>("");
  const ref = useClickOutside(() => setOpen(false));

  function handleAddPlayer() {
    try {
      if (players.some((p) => p.name === newPlayer)) {
        setError("Um jogador com esse nome já existe.");
      } else {
        const hex = getRandomHexColor();
        const rgb = hexToRgbA(hex);

        setPlayers((prevState) => [
          ...prevState,
          {
            name: newPlayer,
            color: hex,
            bgColor: rgb,

            as: null,
            duque: null,
            terno: null,
            quadra: null,
            quina: null,
            sena: null,
            full: null,
            seguida: null,
            quadrada: null,
            general: null,
          },
        ]);

        setNewPlayer("");
        setError("");
        setOpen(false);
      }
    } catch (error) {
      console.log("erro:", error);
      setError("Erro ao adicionar jogador, tente novamente.");
    }
  }

  useEffect(() => {
    console.log("run");
  }, [open]);

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
            onClick={handleAddPlayer}
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
