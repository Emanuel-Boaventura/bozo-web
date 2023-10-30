import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { ReactDiceRef } from "react-dice-complete";
import { DieContainerRef } from "react-dice-complete/dist/DiceContainer";
import { Dice } from "./Dice";
import { getOpositeNumber } from "@/utils/getOpositeNumber";

type TColumn = "cup" | "hand";

interface IManualDices {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface IDicesData {
  id: string;
  ref: RefObject<DieContainerRef>;
  value: number;
  column: TColumn;
  position: number;
}

export default function ManualDices({ open, setOpen }: IManualDices) {
  const reactDiceRefs = [
    useRef<ReactDiceRef>(null),
    useRef<ReactDiceRef>(null),
    useRef<ReactDiceRef>(null),
    useRef<ReactDiceRef>(null),
    useRef<ReactDiceRef>(null),
  ];
  const [below, setBelow] = useState(false);
  const [nextBelow, setNextBelow] = useState(false);

  const initialDicesData: IDicesData[] = [
    {
      id: "dice-1",
      ref: reactDiceRefs[0],
      value: 1,
      column: "cup",
      position: 0,
    },
    {
      id: "dice-2",
      ref: reactDiceRefs[1],
      value: 1,
      column: "cup",
      position: 1,
    },
    {
      id: "dice-3",
      ref: reactDiceRefs[2],
      value: 1,
      column: "cup",
      position: 2,
    },
    {
      id: "dice-4",
      ref: reactDiceRefs[3],
      value: 1,
      column: "cup",
      position: 3,
    },
    {
      id: "dice-5",
      ref: reactDiceRefs[4],
      value: 1,
      column: "cup",
      position: 4,
    },
  ];

  const [dicesData, setDicesData] = useState<IDicesData[]>(initialDicesData);

  const [trys, setTrys] = useState(0);
  const ref = useClickOutside(handleExit);

  function handleExit() {
    if (trys !== 3 && trys !== 1) {
      alert("Are you sure you want to exit?");
      setOpen(false);
    } else {
      setOpen(false);
    }
  }

  const rollAll = () => {
    if (dicesData && trys < 3) {
      dicesData
        .filter((dice) => dice.column === "cup")
        .forEach((dice) => {
          dice.ref.current?.rollAll();
        });

      setTrys((t) => t + 1);

      if (nextBelow) {
        setBelow(true);
        setNextBelow(false);
      } else {
        setBelow(false);
      }
    }
  };

  function handleReset() {
    setTrys(0);
    setBelow(false);
    setNextBelow(false);
    setDicesData(initialDicesData);
  }

  function onRollDone(value: number, diceId: string) {
    setDicesData((prevState) => {
      const newDice = prevState.find((dice) => dice.id === diceId);

      return [
        ...prevState.filter((dice) => dice.id !== newDice!.id),
        {
          ...newDice!,
          value: value,
        },
      ];
    });
  }

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const dice = dicesData.find((d) => d.id === draggableId);

    if (!dice) return;

    const arrayRearranged = [
      ...dicesData
        .filter((d) => d.id !== dice.id)
        .map((d) => {
          if (d.position > source.index && d.column === source.droppableId) {
            return {
              ...d,
              position: d.position - 1,
            };
          }
          return d;
        })
        .map((d) => {
          if (
            d.position >= destination.index &&
            d.column === destination.droppableId
          ) {
            return {
              ...d,
              position: d.position + 1,
            };
          }
          return d;
        }),
      {
        ...dice,
        position: destination.index,
        column: destination.droppableId,
        ...(below && { value: getOpositeNumber(dice.value) }),
      } as IDicesData,
    ];

    setDicesData(arrayRearranged);
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

              <Droppable droppableId="cup" direction="horizontal">
                {(provided) => (
                  <div
                    className="border border-orange-900 rounded-lg bg-yellow-700 text-black flex items-center gap-4 px-2 h-20"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {dicesData
                      .filter((dice) => dice.column === "cup")
                      .sort((a, b) => a.position - b.position)
                      .map((dice) => (
                        <Draggable
                          key={dice.id}
                          draggableId={dice.id}
                          index={dice.position}
                        >
                          {(providedTwo) => (
                            <div
                              ref={providedTwo.innerRef}
                              {...providedTwo.draggableProps}
                              {...providedTwo.dragHandleProps}
                            >
                              <Dice
                                key={dice.id}
                                diceId={dice.id}
                                value={dice.value}
                                onRollDone={onRollDone}
                                forwardedRef={dice.ref}
                                below={below}
                                onCup
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className="flex items-center mt-4 ">
                <input
                  id="below"
                  type="checkbox"
                  checked={nextBelow}
                  onChange={() => setNextBelow((s) => !s)}
                  className="w-4 h-4 rounded accent-orange-900 cursor-pointer"
                />
                <label
                  htmlFor="below"
                  className="ml-2 text-sm font-semibold cursor-pointer"
                >
                  Em baixo
                </label>
              </div>

              <p className="text-xs">
                Quando marcado, na próxima jogada, ao arrastar os dados para a
                mão serão salvos os valores opostos{" "}
                <span className="text-red-500">(em vermelho)</span>.
              </p>

              <p className="font-semibold mt-4">Mão</p>
              <Droppable droppableId="hand" direction="horizontal">
                {(provided) => (
                  <div
                    className="border border-orange-900 rounded-lg bg-orange-300 flex items-center gap-4 px-2 h-20"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {dicesData
                      .filter((dice) => dice.column === "hand")
                      .sort((a, b) => a.position - b.position)
                      .map((dice) => (
                        <Draggable
                          key={dice.id}
                          draggableId={dice.id}
                          index={dice.position}
                        >
                          {(providedTwo) => (
                            <div
                              ref={providedTwo.innerRef}
                              {...providedTwo.draggableProps}
                              {...providedTwo.dragHandleProps}
                            >
                              <Dice
                                key={dice.id}
                                diceId={dice.id}
                                value={dice.value}
                                onRollDone={onRollDone}
                                forwardedRef={dice.ref}
                                below={below}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
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
                onClick={handleReset}
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
