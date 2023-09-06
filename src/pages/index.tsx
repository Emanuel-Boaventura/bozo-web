import { usePlayersContext } from "@/context/playersContext";
import Link from "next/link";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const { players, setPlayers } = usePlayersContext();

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

      <Link
        href={"/game"}
        className="font-bold w-full p-4 text-center mt-10 border border-black"
      >
        Iniciar partida
      </Link>
    </main>
  );
}
