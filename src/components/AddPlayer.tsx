import { usePlayersContext } from "@/context/playersContext";
import { getRandomHexColor } from "@/hooks/getRandomHexColor";
import { getRandomRgbColor } from "@/hooks/getRandomRgbColor";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface IAddPlayer {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddPlayer({ open, setOpen }: IAddPlayer) {
  const { setPlayers } = usePlayersContext();
  const [newPlayer, setNewPlayer] = useState<string>("");

  function handleAddPlayer() {
    const rgb = getRandomRgbColor();
    const hex = getRandomHexColor();

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
          <p className="text-2xl font-bold text-center">Nome do jogador:</p>
          <p className="text-[10px] text-center mb-5">
            Não repete nome se não da merda
          </p>

          <input
            type="text"
            value={newPlayer}
            placeholder="Insira o nome"
            className="border border-black w-full mb-4 p-2 rounded outline-none "
            onChange={(e) => setNewPlayer(e.currentTarget.value)}
          />

          <button
            type="button"
            className="font-bold border rounded flex w-full justify-center  p-2"
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
