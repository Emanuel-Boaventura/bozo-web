import GameAlert from "@/components/GameAlert";
import { GameHeader } from "@/components/GameHeader";
import Scoreboard from "@/components/Scoreboard";
import SelectValue from "@/components/SelectValue";
import Settings from "@/components/Settings";
import { usePlayersContext } from "@/context/playersContext";
import cut from "@/public/cut.png";
import Image from "next/image";
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
        setOpenScoreboard={setOpenScoreboard}
      />

      <Settings open={openSettings} setOpen={setOpenSettings} />
      <Scoreboard open={openScoreboard} setOpen={setOpenScoreboard} />

      <GameAlert />

      <GameHeader
        setOpenSettings={setOpenSettings}
        setOpenScoreboard={setOpenScoreboard}
        player={players[actualPlayer]}
      />

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
