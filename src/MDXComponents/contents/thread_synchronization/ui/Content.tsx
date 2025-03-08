"use client";

import { Button } from "@/components/ui/button";
import { FlexRowCenter } from "@/shared/style/Flex";
import { EmphasizedText, Title } from "@/MDXComponents/shared/style";
import React, { useEffect, useRef, useState } from "react";
import { useReloadContext } from "@/shared/components/Reloadbutton";
import { handleCount } from "../utils/eventHandler";
import { type LoopCallbackProps } from "../type";

function Content({ loopCallback }: LoopCallbackProps) {
  const { key } = useReloadContext();
  const preKey = useRef(key);
  const [disabled, setDisabled] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (preKey.current < key) setDisabled(false);
    if (preKey.current < key && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [key]);

  return (
    <>
      <Title>
        <EmphasizedText>루프 시작</EmphasizedText>을 누른 후{" "}
        <EmphasizedText>카운트 버튼</EmphasizedText>을 눌러 보세요!
      </Title>
      <FlexRowCenter>
        <FlexRowCenter $gap="1rem">
          <Button onClick={handleCount}>카운트 버튼</Button>
          <div>
            Click count: <span id="clickCount">0</span>
          </div>
        </FlexRowCenter>
        <FlexRowCenter $gap="1rem">
          <Button
            onClick={() => loopCallback(disabled, setDisabled, timerRef)}
            disabled={disabled}
          >
            루프 시작
          </Button>
          <div>
            Loop count: <span id="loopCount">0</span>
          </div>
        </FlexRowCenter>
      </FlexRowCenter>
    </>
  );
}

export { Content };
