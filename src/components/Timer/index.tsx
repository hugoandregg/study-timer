import { useEffect, useState } from "react";
import { ITask } from "../../types/tasks";
import Button from "../Button";
import Clock from "./Clock";
import style from "./Timer.module.scss";
import { timeToSeconds } from "../../common/utils/time";

interface Props {
  selected: ITask | undefined;
  finishTask: () => void;
}

export default function Timer({ selected, finishTask }: Props) {
  const [time, setTime] = useState<number>();

  useEffect(() => {
    if (selected?.time) {
      setTime(timeToSeconds(selected.time));
    }
  }, [selected]);

  function regress(timer: number = 0) {
    setTimeout(() => {
      if (timer > 0) {
        setTime(timer - 1);
        return regress(timer - 1);
      }
      finishTask();
    }, 1000);
  }

  return (
    <div className={style.timer}>
      <p className={style.title}>Choose a card and start the timer</p>
      <div className={style.clockWrapper}>
        <Clock time={time} />
      </div>
      <Button
        onClick={() => {
          regress(time);
        }}
      >
        Start
      </Button>
    </div>
  );
}
