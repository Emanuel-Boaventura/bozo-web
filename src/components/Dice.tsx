import { getOpositeNumber } from "@/utils/getOpositeNumber";
import dynamic from "next/dynamic";
import { Ref } from "react";
import { DieContainerRef } from "react-dice-complete/dist/DiceContainer";

interface IDiceProps {
  forwardedRef: Ref<DieContainerRef> | undefined;
  onRollDone: (value: number, diceId: string) => void;
  diceId: string;
  value: number;
  onCup?: boolean;
  below: boolean;
}

export const Dice = dynamic(
  async () => {
    const { default: ReactDice } = await import("react-dice-complete");

    const NewDice = ({
      forwardedRef,
      value,
      diceId,
      below,
      onCup = false,
      onRollDone,
      ...props
    }: IDiceProps) => (
      <>
        <ReactDice
          {...props}
          ref={forwardedRef}
          numDice={1}
          rollDone={(total) => onRollDone(total, diceId)}
          defaultRoll={value}
          disableIndividual
          dieSize={40}
          faceColor="#fff7ed"
          dotColor="#431407"
          margin={0}
          rollTime={1}
        />

        {below && onCup && (
          <p className="text-red-500 mx-auto text-center bg-orange-50 rounded h-6 w-6">
            {getOpositeNumber(value)}
          </p>
        )}
      </>
    );

    return NewDice;
  },
  { ssr: false }
);
