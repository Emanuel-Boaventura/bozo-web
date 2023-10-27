import AddPlayer from "@/components/AddPlayer";
import GameAlert from "@/components/GameAlert";
import { useGameContext } from "@/context/gameContext";
import { usePlayersContext } from "@/context/playersContext";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const { players, setPlayers } = usePlayersContext();
  const { currentGame, setCurrentGame } = useGameContext();
  const [open, setOpen] = useState<boolean>(false);

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newPlayers = Array.from(players);

    // Remove the item from the source index and insert the removed item at the destination index
    const [removed] = newPlayers.splice(source.index, 1);
    newPlayers.splice(destination.index, 0, removed);

    setPlayers(newPlayers);
  };

  function remove(name: string) {
    setPlayers((prevState) => prevState.filter((p) => p.name !== name));
  }

  function handleNewGame() {
    setPlayers([]);
    localStorage.removeItem("partida-bozó");
    setCurrentGame(null);
  }

  return (
    <>
      <AddPlayer open={open} setOpen={setOpen} />
      <GameAlert />
      <main className="flex flex-col items-center p-10 bg-yellow-800 text-orange-50 min-h-screen max-w-2xl mx-auto md:py-16">
        <h1 className="text-2xl font-bold text-center">
          Bem vindo ao Bozó WEB!
        </h1>

        <p className="text-center">
          Escolha quantos jogadores participarão do jogo.
        </p>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="column-1">
            {(provided) => (
              <div
                className="flex flex-col w-full mt-6"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {players.map((player, index) => (
                  <Draggable
                    key={player.name}
                    draggableId={player.name}
                    index={index}
                  >
                    {(providedTwo) => (
                      <div
                        className="relative bg-orange-100 text-center shadow mt-3 rounded-lg overflow-hidden "
                        ref={providedTwo.innerRef}
                        {...providedTwo.draggableProps}
                        {...providedTwo.dragHandleProps}
                      >
                        <Image
                          src={xmark}
                          alt="Botão de fechar"
                          onClick={() => remove(player.name)}
                          className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform cursor-pointer"
                        />

                        <p className="mt-2 mb-1 text-yellow-950 font-bold">
                          {player.name}
                        </p>

                        <div
                          className="w-full h-[14px]"
                          style={{
                            backgroundColor: player.color,
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          type="button"
          className="font-semibold w-full p-2 text-center mt-4 rounded-lg border-dashed opacity-60 border-orange-100 border-[3px] mb-8"
          onClick={() => setOpen(true)}
        >
          Adicionar jogador
        </button>

        {currentGame && (
          <button
            onClick={handleNewGame}
            className="font-bold w-full shadow p-4 text-center mb-3 rounded-lg bg-orange-950 !text-orange-50"
          >
            Novo jogo
          </button>
        )}

        <Link
          href={"/game"}
          className="font-bold w-full shadow p-4 text-center rounded-lg bg-orange-100 !text-orange-950"
        >
          {currentGame ? "Retomar jogo" : "Iniciar partida"}
        </Link>
      </main>
    </>
  );
}
