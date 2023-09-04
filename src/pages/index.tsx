import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Home() {
  const players = [
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
  ];

  const handleDragEnd = (result: any) => {
    // Handle the end of a drag event here
  };

  return (
    <main className="flex flex-col gap-4 items-center justify-between p-10">
      <h1 className="text-2xl font-bold text-center">Bem vindo ao Bozó WEB!</h1>

      <p className="text-center">
        Escolha quantos jogadores participarão do jogo.
      </p>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="teste">
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
