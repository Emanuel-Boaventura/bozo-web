import { IPlayer, usePlayersContext } from "@/context/playersContext";
import gear from "@/public/gear.svg";
import home from "@/public/home.svg";
import dice from "@/public/dice.svg";
import rank from "@/public/rank.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface IGameHeader {
  setOpenSettings: Dispatch<SetStateAction<boolean>>;
  setOpenScoreboard: Dispatch<SetStateAction<boolean>>;
  setOpenManualDices: Dispatch<SetStateAction<boolean>>;
}

export function GameHeader({
  setOpenSettings,
  setOpenScoreboard,
  setOpenManualDices,
}: IGameHeader) {
  const { currentPlayer } = usePlayersContext();
  const router = useRouter();

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

  return (
    <header
      className="relative w-full p-4"
      style={{
        background: currentPlayer.bgColor,
      }}
    >
      <Image
        src={dice}
        alt="Trhow Dices"
        className="game-buttons left-12"
        onClick={() => setOpenManualDices(true)}
      />

      <Image
        src={rank}
        alt="Scoreboard"
        className="game-buttons left-4"
        onClick={() => setOpenScoreboard(true)}
      />

      <Image
        src={gear}
        alt="Settings"
        className="game-buttons right-4"
        onClick={() => setOpenSettings(true)}
      />

      <Image
        src={home}
        alt="Home"
        className="game-buttons right-12"
        onClick={() => router.push("/")}
      />

      <p className="text-2xl font-bold text-center">BOZÓ WEB!</p>
      <p className="text-lg text-center font-semibold">{currentPlayer.name}</p>

      <p className="text-8xl font-semibold text-center mt-5">
        {playerSum(currentPlayer)}
      </p>
    </header>
  );
}
