import GameAlert from "@/components/GameAlert";
import { GameHeader } from "@/components/GameHeader";
import ManualDices from "@/components/ManualDices";
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
  const { currentPlayer, prevPlayer, nextPlayer } = usePlayersContext();

  const [open, setOpen] = useState<boolean>(false);
  const [openSettings, setOpenSettings] = useState<boolean>(false);
  const [openScoreboard, setOpenScoreboard] = useState<boolean>(false);
  const [openManualDices, setOpenManualDices] = useState<boolean>(false);

  const [point, setPoint] = useState<TPoint>("");

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
        onNextPlayer={nextPlayer}
        point={point}
        setOpenScoreboard={setOpenScoreboard}
      />

      <Settings open={openSettings} setOpen={setOpenSettings} />
      <Scoreboard open={openScoreboard} setOpen={setOpenScoreboard} />
      <ManualDices open={openManualDices} setOpen={setOpenManualDices} />

      <GameAlert />

      <GameHeader
        setOpenSettings={setOpenSettings}
        setOpenScoreboard={setOpenScoreboard}
        setOpenManualDices={setOpenManualDices}
      />

      <main
        className="flex flex-col p-4 pb-10 gap-6 bg-yellow-800  text-orange-50
        min-h-[calc(100vh-208px)]"
      >
        <div className="grid grid-cols-3 leading-none bg-orange-50 gap-[1px] p-[1px]">
          {renderButton({
            name: "Ás",
            value: "as",
            playerPoint: currentPlayer.as,
          })}

          {renderButton({
            name: "Quadra",
            value: "quadra",
            playerPoint: currentPlayer.quadra,
          })}
          {renderButton({
            name: "Full",
            value: "full",
            playerPoint: currentPlayer.full,
          })}
          {renderButton({
            name: "Duque",
            value: "duque",
            playerPoint: currentPlayer.duque,
          })}
          {renderButton({
            name: "Quina",
            value: "quina",
            playerPoint: currentPlayer.quina,
          })}
          {renderButton({
            name: "Seguida",
            value: "seguida",
            playerPoint: currentPlayer.seguida,
          })}
          {renderButton({
            name: "Terno",
            value: "terno",
            playerPoint: currentPlayer.terno,
          })}
          {renderButton({
            name: "Sena",
            value: "sena",
            playerPoint: currentPlayer.sena,
          })}
          {renderButton({
            name: "Quadrada",
            value: "quadrada",
            playerPoint: currentPlayer.quadrada,
          })}
          {renderButton({
            name: "General",
            value: "general",
            playerPoint: currentPlayer.general,
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
