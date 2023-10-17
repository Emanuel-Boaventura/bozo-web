import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ReactDice, { ReactDiceRef } from "react-dice-complete";
import { DieContainerRef } from "react-dice-complete/dist/DiceContainer";

interface IManualDices {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface Dice {
  id: string;
  ref: RefObject<DieContainerRef>;
}

interface Column {
  id: string;
  dicesIds: string[];
}

interface DicesBoard {
  dices: { [diceId: string]: Dice };
  columns: { [columnId: string]: Column };
  columnOrder: string[];
}

export default function ManualDices({ open, setOpen }: IManualDices) {
  const reactDice1 = useRef<ReactDiceRef>(null);
  const reactDice2 = useRef<ReactDiceRef>(null);
  const reactDice3 = useRef<ReactDiceRef>(null);
  const reactDice4 = useRef<ReactDiceRef>(null);
  const reactDice5 = useRef<ReactDiceRef>(null);

  const [dicesData, setDicesData] = useState<DicesBoard>({
    dices: {
      "dice-1": { id: "dice-1", ref: reactDice1 },
      "dice-2": { id: "dice-2", ref: reactDice2 },
      "dice-3": { id: "dice-3", ref: reactDice3 },
      "dice-4": { id: "dice-4", ref: reactDice4 },
      "dice-5": { id: "dice-5", ref: reactDice5 },
    },
    columns: {
      "column-1": {
        id: "column-1",
        dicesIds: ["dice-1", "dice-2", "dice-3", "dice-4"],
      },
      "column-2": {
        id: "column-2",
        dicesIds: ["dice-5"],
      },
    },
    // Facilitate reordering of the columns
    columnOrder: ["column-1", "column-2"],
  });
  console.log("dicesData:", dicesData);
  const [error, setError] = useState<string>("");
  type TTry = 0 | 1 | 2 | 3;
  const [trys, setTrys] = useState<TTry>(0);
  const ref = useClickOutside(handleExit);

  function handleExit() {
    if (trys !== 3 && trys !== 1) {
      alert("Are you sure you want to exit?");
      setOpen(false);
    }
    setOpen(false);
  }

  const rollDone = (totalValue: number, values: number[]) => {
    //
  };

  const rollAll = () => {
    if (trys < 3) {
      reactDice1.current?.rollAll();
      reactDice2.current?.rollAll();
      reactDice3.current?.rollAll();
      reactDice4.current?.rollAll();
      reactDice5.current?.rollAll();

      setTrys((t) => (t + 1) as TTry);
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = dicesData.columns[source.droppableId];
    console.log("start:", start);
    const finish = dicesData.columns[destination.droppableId];
    console.log("finish:", finish);

    if (start.id === finish.id) {
      const newDicesIds = Array.from(start.dicesIds);
      newDicesIds.splice(source.index, 1);
      newDicesIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        dicesIds: newDicesIds,
      };
      console.log("newColumn:", newColumn);

      const newDicesData = {
        ...dicesData,
        columns: {
          ...dicesData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setDicesData(newDicesData);
      return;
    }

    // Moving from one list to another
    const startDicesIds = Array.from(start.dicesIds);
    startDicesIds.splice(source.index, 1);
    const newStart = {
      ...start,
      dicesIds: startDicesIds,
    };

    const finishDicesIds = Array.from(finish.dicesIds);
    finishDicesIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      dicesIds: finishDicesIds,
    };

    const newDicesData = {
      ...dicesData,
      columns: {
        ...dicesData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setDicesData(newDicesData);
  };

  if (open) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div
          ref={ref}
          className="relative bg-orange-100 w-80 text-yellow-950 rounded-lg py-8 px-4 max-w-[90%]"
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Image
              src={xmark}
              alt="Botão de fechar"
              onClick={() => setOpen(false)}
              className="absolute w-5 h-5 top-2 right-2 active:translate-y-[1px] transition-transform  cursor-pointer"
            />
            <p className="text-2xl font-bold text-center mb-2">Dados</p>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold">Copo</p>

                <button
                  type="button"
                  className="font-semibold cursor-pointer"
                  onClick={rollAll}
                >
                  Jogar dados
                </button>
              </div>

              <Droppable droppableId="column-1">
                {(provided) => (
                  <div
                    className="border border-orange-900 rounded-lg bg-yellow-700 text-black flex items-center justify-around px-2 h-20"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {dicesData.columns["column-1"].dicesIds.map(
                      (diceId, index) => {
                        const dice = dicesData.dices[diceId];

                        return (
                          <Draggable
                            key={dice.id}
                            draggableId={dice.id}
                            index={index}
                          >
                            {(providedTwo) => (
                              <div
                                ref={providedTwo.innerRef}
                                {...providedTwo.draggableProps}
                                {...providedTwo.dragHandleProps}
                              >
                                <ReactDice
                                  key={dice.id}
                                  numDice={1}
                                  disableIndividual
                                  rollDone={rollDone}
                                  dieSize={40}
                                  faceColor="#fff7ed"
                                  dotColor="#431407"
                                  margin={0}
                                  rollTime={1}
                                  ref={dice.ref}
                                />
                              </div>
                            )}
                          </Draggable>
                        );
                      }
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <p className="font-semibold mt-4">Mão</p>
              <Droppable droppableId="column-2">
                {(provided) => (
                  <div
                    className="border border-orange-900 rounded-lg bg-orange-300 flex justify-around px-2 h-20"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {dicesData.columns["column-2"].dicesIds.map(
                      (diceId, index) => (
                        <Draggable
                          key={dicesData.dices[diceId].id}
                          draggableId={dicesData.dices[diceId].id.toString()}
                          index={index}
                        >
                          {(providedTwo) => (
                            <div
                              ref={providedTwo.innerRef}
                              {...providedTwo.draggableProps}
                              {...providedTwo.dragHandleProps}
                            >
                              <ReactDice
                                key={dicesData.dices[diceId].id}
                                numDice={1}
                                disableIndividual
                                rollDone={rollDone}
                                dieSize={40}
                                faceColor="#fff7ed"
                                dotColor="#431407"
                                margin={0}
                                rollTime={1}
                                ref={dicesData.dices[diceId].ref}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            <div className="flex justify-between mt-4 -mb-4">
              <p className="font-semibold">
                Tentativa:{" "}
                <span className={`${trys === 3 ? "text-red-500" : ""}`}>
                  {trys} {trys === 3 ? "(Máximo)" : ""}
                </span>
              </p>

              <button
                type="button"
                className="font-semibold cursor-pointer"
                onClick={() => setTrys(0)}
              >
                Resetar
              </button>
            </div>
          </DragDropContext>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
