import { MutableRefObject } from "react";

export type LoopCallbackFunction = (
  disabled: boolean,
  setDisabled: (value: boolean) => void,
  timerRef?: MutableRefObject<NodeJS.Timeout | null>
) => void | Promise<void>;

export interface LoopCallbackProps {
  loopCallback: LoopCallbackFunction;
}
