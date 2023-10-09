import { useClickOutside } from "@/hooks/onClickOutside";
import xmark from "@/public/xmark.svg";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import ReactDice, { ReactDiceRef } from "react-dice-complete";

interface IManualDices {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ManualDices({ open, setOpen }: IManualDices) {
  const [newPlayer, setNewPlayer] = useState<string>("");
  const [error, setError] = useState<string>("");
  type TTry = 0 | 1 | 2 | 3;
  const [trys, setTrys] = useState<TTry>(1);
  const ref = useClickOutside(handleExit);

  function handleExit() {
    if (trys !== 3 && trys !== 1) {
      alert("Are you sure you want to exit?");
      setOpen(false);
    }
    setOpen(false);
  }

  const reactDice1 = useRef<ReactDiceRef>(null);
  const reactDice2 = useRef<ReactDiceRef>(null);
  const reactDice3 = useRef<ReactDiceRef>(null);
  const reactDice4 = useRef<ReactDiceRef>(null);
  const reactDice5 = useRef<ReactDiceRef>(null);

  const dices = [
    { id: 1, ref: reactDice1 },
    { id: 2, ref: reactDice2 },
    { id: 3, ref: reactDice3 },
    { id: 4, ref: reactDice4 },
    { id: 5, ref: reactDice5 },
  ];

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

  if (open) {
    return (
      <div className="fixed z-50 h-screen w-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center">
        <div
          ref={ref}
          className="relative bg-orange-100 w-80 text-yellow-950 rounded-lg py-8 px-4 max-w-[90%]"
        >
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
            <div className="border border-orange-900 rounded-lg bg-yellow-700 text-black flex items-center justify-around px-2 h-20">
              {dices.map((dice) => (
                <ReactDice
                  key={dice.id}
                  numDice={1}
                  disableIndividual
                  ref={dice.ref}
                  rollDone={rollDone}
                  dieSize={40}
                  faceColor="#fff7ed"
                  dotColor="#431407"
                  margin={0}
                  rollTime={1}
                />
              ))}
            </div>

            <p className="font-semibold mt-4">Mão</p>
            <div className="border border-orange-900 rounded-lg bg-orange-50 flex justify-around px-2 h-20"></div>
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
        </div>
      </div>
    );
  } else {
    return null;
  }
}
