import { IPlayer } from "@/context/playersContext";
import gear from "@/public/gear.svg";
import home from "@/public/home.svg";
import rank from "@/public/rank.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";

interface IGameHeader {
  setOpenSettings: Dispatch<SetStateAction<boolean>>;
  setOpenScoreboard: Dispatch<SetStateAction<boolean>>;
  player: IPlayer;
}

export function GameHeader({
  setOpenSettings,
  setOpenScoreboard,
  player,
}: IGameHeader) {
  console.log("player:", player);
  const router = useRouter();
  const [color, setcolor] = useState<string>("");
  console.log("color:", color);

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

  // useEffect(() => {
  //   setcolor(player.bgColor.replaceAll(" ", "_"));
  // }, [player]);

  return (
    <header
      className="relative w-full p-4"
      // className={`relative w-full p-4 bg-[rgb(255,_0,_0,_0.5)]`}
      // className={`relative w-full p-4 bg-[${color}]`}
      style={{
        background: player.bgColor,
        // background: color,
      }}
    >
      {/* <Image
    src={dice}
    alt="Trhow Dices"
    classNam
    e="game-buttons left-4 "
  /> */}

      <Image
        src={rank}
        alt="Scoreboard Button"
        className="game-buttons left-4"
        onClick={() => setOpenScoreboard(true)}
      />

      <Image
        src={gear}
        alt="Settings Button"
        className="game-buttons right-4"
        onClick={() => setOpenSettings(true)}
      />

      <Image
        src={home}
        alt="Home Button"
        className="game-buttons right-14"
        onClick={() => router.push("/")}
      />

      <p className="text-2xl font-bold text-center">BOZÓ WEB!</p>
      <p className="text-lg text-center font-semibold">{player.name}</p>

      <p className="text-8xl font-semibold text-center mt-5">
        {playerSum(player)}
      </p>
    </header>
  );
}
