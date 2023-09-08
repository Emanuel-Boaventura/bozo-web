import SelectValue from "@/components/SelectValue";
import { IPlayer, usePlayersContext } from "@/context/playersContext";
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
      <p className="square-point">{playerPoint}</p>
      <p className="square-title">{name}</p>
    </button>
  );

  return (
    <>
      <SelectValue
        open={open}
        setOpen={setOpen}
        actualPlayer={actualPlayer}
        point={point}
      />
      <header
        className=" w-full p-2"
        style={{
          backgroundColor: players[actualPlayer].color,
        }}
      >
        <p className="text-2xl font-bold text-center">Bozó WEB!</p>
        <p className="text-lg text-center">{players[actualPlayer].name}</p>
      </header>

      <div
        style={{
          backgroundColor: players[actualPlayer].color,
        }}
      >
        <p className="text-8xl text-center py-5">
          {playerSum(players[actualPlayer])}
        </p>
      </div>
      <main className="flex flex-col justify-between p-4 gap-6">
        <div className="grid grid-cols-3 leading-none bg-black gap-[1px] p-[1px]">
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
            className="p-4 border w-32 border-solid border-red-500"
            onClick={prevPlayer}
          >
            Voltar
          </button>

          <button
            type="button"
            className="p-4 border w-32 border-solid border-green-500"
            onClick={nextPlayer}
          >
            Proximo
          </button>
        </div>
      </main>
    </>
  );
}
