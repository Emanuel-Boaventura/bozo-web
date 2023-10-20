import { log } from "console";
import dynamic from "next/dynamic";
import { Ref } from "react";
import { DieContainerRef } from "react-dice-complete/dist/DiceContainer";

interface IDiceProps {
  forwardedRef: Ref<DieContainerRef> | undefined;
  onRollDone: (value: number, diceId: string) => void;
  diceId: string;
  value: number;
}

export const Dice = dynamic(
  async () => {
    const { default: ReactDice } = await import("react-dice-complete");

    const NewDice = ({
      forwardedRef,
      value,
      diceId,
      onRollDone,
      ...props
    }: IDiceProps) => (
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
    );

    return NewDice;
  },
  { ssr: false }
);
