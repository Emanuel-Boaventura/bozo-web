import GameAlert from "@/components/GameAlert";
import Scoreboard from "@/components/Scoreboard";
import SelectValue from "@/components/SelectValue";
import Settings from "@/components/Settings";
import { IPlayer, usePlayersContext } from "@/context/playersContext";
import cut from "@/public/cut.png";
import gear from "@/public/gear.svg";
import home from "@/public/home.svg";
import rank from "@/public/rank.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export type TPoint =
  | ""
  | "as"
  | "duque"
  | "terno"
  | "quadra"
  | "quina"
  | "sena"
  | "full"
  | "seguida"
  | "quadrada"
  | "general";

interface IRenderButton {
  name: string;
  value: string;
  playerPoint: null | number;
}
export default function Game() {
  const { players } = usePlayersContext();
  const [actualPlayer, setActualPlayer] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openScoreboard, setOpenScoreboard] = useState<boolean>(false);

  const [point, setPoint] = useState<TPoint>("");
  const router = useRouter();

  function nextPlayer() {
    setActualPlayer((prevState) =>
      prevState === players.length - 1 ? 0 : prevState + 1
    );
  }

  function prevPlayer() {
    setActualPlayer((prevState) =>
      prevState === 0 ? players.length - 1 : prevState - 1
    );
  }

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

  function handleSquareClick(e: any) {
    setPoint(e.currentTarget.value);
    setOpen(true);
  }

  const renderButton = ({ name, value, playerPoint }: IRenderButton) => (
    <button
      type="button"
      className={`square ${value === "general" ? "col-span-full" : ""}`}
      value={value}
      onClick={handleSquareClick}
    >
      <p className="square-point">
        {playerPoint === 0 ? (
          <Image
            src={cut}
            alt="Cortado"
            className="h-9 w-9 leading-none top-2 right-2 active:translate-y-[1px] transition-transform"
          />
        ) : (
          playerPoint
        )}
      </p>
      <p className="square-title">{name}</p>
    </button>
  );

  return (
    <>
      <SelectValue
        open={open}
        setOpen={setOpen}
        actualPlayer={actualPlayer}
        onNextPlayer={nextPlayer}
        point={point}
      />

      <Settings open={openSettings} setOpen={setOpenSettings} />
      <Scoreboard open={openScoreboard} setOpen={setOpenScoreboard} />

      <GameAlert />

      <header
        className="relative w-full p-4"
        style={{
          backgroundColor: players[actualPlayer].bgColor,
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
        <p className="text-lg text-center font-semibold">
          {players[actualPlayer].name}
        </p>

        <p className="text-8xl font-semibold text-center mt-5">
          {playerSum(players[actualPlayer])}
        </p>
      </header>
      <main
        className="flex flex-col p-4 pb-10 gap-6 bg-yellow-800  text-orange-50
        min-h-[calc(100vh-208px)]"
      >
        <div className="grid grid-cols-3 leading-none bg-orange-50 gap-[1px] p-[1px]">
          {renderButton({
            name: "Ás",
            value: "as",
            playerPoint: players[actualPlayer].as,
          })}

          {renderButton({
            name: "Quadra",
            value: "quadra",
            playerPoint: players[actualPlayer].quadra,
          })}
          {renderButton({
            name: "Full",
            value: "full",
            playerPoint: players[actualPlayer].full,
          })}
          {renderButton({
            name: "Duque",
            value: "duque",
            playerPoint: players[actualPlayer].duque,
          })}
          {renderButton({
            name: "Quina",
            value: "quina",
            playerPoint: players[actualPlayer].quina,
          })}
          {renderButton({
            name: "Seguida",
            value: "seguida",
            playerPoint: players[actualPlayer].seguida,
          })}
          {renderButton({
            name: "Terno",
            value: "terno",
            playerPoint: players[actualPlayer].terno,
          })}
          {renderButton({
            name: "Sena",
            value: "sena",
            playerPoint: players[actualPlayer].sena,
          })}
          {renderButton({
            name: "Quadrada",
            value: "quadrada",
            playerPoint: players[actualPlayer].quadrada,
          })}
          {renderButton({
            name: "General",
            value: "general",
            playerPoint: players[actualPlayer].general,
          })}
        </div>
        <div className="flex w-full justify-between">
          <button
            type="button"
            className="p-4 w-32 bg-orange-200 text-orange-950 rounded-lg font-bold tracking-wide shadow"
            onClick={prevPlayer}
          >
            Voltar
          </button>

          <button
            type="button"
            className="p-4 w-32 bg-orange-400 text-orange-50 rounded-lg font-bold tracking-wide shadow"
            onClick={nextPlayer}
          >
            Próximo
          </button>
        </div>
      </main>
    </>
  );
}
