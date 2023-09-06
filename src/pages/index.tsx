import { useState } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

interface IPlayers {
  name: string;
  color: string;
}

export default function Home() {
  const [players, setPlayers] = useState<IPlayers[]>([
    {
      name: "Marcos",
      color: "bg-[#ff0000]",
    },
    {
      name: "Faria",
      color: "bg-[#0000ff]",
    },
    {
      name: "Emanuel",
      color: "bg-[#00ff00]",
    },
    {
      name: "João Lucas",
      color: "bg-[#ffa500]",
    },
  ]);
  console.log("players:", players);

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

  return (
    <main className="flex flex-col gap-4 items-center justify-between p-10">
      <h1 className="text-2xl font-bold text-center">Bem vindo ao Bozó WEB!</h1>

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
                      className="text-center border border-black mt-4"
                      ref={providedTwo.innerRef}
                      {...providedTwo.draggableProps}
                      {...providedTwo.dragHandleProps}
                    >
                      <p className="mt-2 mb-1">{player.name}</p>
                      <div className={`${player.color} w-full h-2`} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
