import AddPlayer from "@/components/AddPlayer";
import { usePlayersContext } from "@/context/playersContext";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const { players, setPlayers } = usePlayersContext();
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

  return (
    <main className="flex flex-col gap-4 items-center justify-between p-10">
      <h1 className="text-2xl font-bold text-center">Bem vindo ao Bozó WEB!</h1>

      <AddPlayer open={open} setOpen={setOpen} />

      <p className="text-center">
        Escolha quantos jogadores participarão do jogo.
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="column-1">
          {(provided) => (
            <div
              className="flex flex-col w-full"
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
                      className="relative bg-white text-center border border-black mt-4"
                      ref={providedTwo.innerRef}
                      {...providedTwo.draggableProps}
                      {...providedTwo.dragHandleProps}
                    >
                      <Image
                        src={xmark}
                        alt="Botão de fechar"
                        onClick={() => remove(player.name)}
                        className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform"
                      />

                      <p className="mt-2 mb-1">{player.name}</p>

                      <div
                        className="w-full h-2"
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
        className="font w-full p-2 text-center mt-5 border border-black"
        onClick={() => setOpen(true)}
      >
        Adicionar jogador
      </button>

      <Link
        href={"/game"}
        className="font-bold w-full p-4 text-center mt-10 border border-black"
      >
        Iniciar partida
      </Link>
    </main>
  );
}
