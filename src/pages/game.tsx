import { IPlayer, usePlayersContext } from "@/context/playersContext";
import { useState } from "react";

export default function Game() {
  const { players } = usePlayersContext();
  const [actualPlayer, setActualPlayer] = useState<number>(0);

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
      (player.general ?? 0)
    );
  }

  return (
    <>
      <header
        className=" w-full p-2"
        style={{
          backgroundColor: players[actualPlayer].bgColor,
        }}
      >
        <p className="text-2xl font-bold text-center">Bozó WEB!</p>
        <p className="text-lg text-center">{players[actualPlayer].name}</p>
      </header>

      <div
        style={{
          backgroundColor: players[actualPlayer].bgColor,
        }}
      >
        <p className="text-8xl text-center">
          {playerSum(players[actualPlayer])}
        </p>
      </div>
      <main className="flex flex-col justify-between p-4 gap-6">
        <div className="grid grid-cols-3 leading-none">
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].as}</p>
            <p className="square-title">Ás</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].duque}</p>
            <p className="square-title">Duque</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].terno}</p>
            <p className="square-title">Terno</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].quadra}</p>
            <p className="square-title">Quadra</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].quina}</p>
            <p className="square-title">Quina</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].sena}</p>
            <p className="square-title">Sena</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].full}</p>
            <p className="square-title">Full</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].seguida}</p>
            <p className="square-title">Seguida</p>
          </button>
          <button type="button" className="square">
            <p className="square-point">{players[actualPlayer].quadrada}</p>
            <p className="square-title">Quadrada</p>
          </button>
          <button type="button" className="square col-span-full">
            <p className="square-point">{players[actualPlayer].general}</p>
            <p className="square-title">General</p>
          </button>
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
