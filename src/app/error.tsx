"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { goToHome } from "@/utils/redirect";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] bg-gradient-radial from-[oklch(88.45%,0.059,18.33)] to-[oklch(71.42%,0.059,18.33)]">
      <div className="bg-red-200 bg-error-pattern animate-pan w-full h-full bg-[10%] flex items-center justify-center">
        <div className="bg-slate-100 p-12 flex flex-col rounded-xl place-content-center w-full h-fit">
          <h1 className="text-2xl font-bold ring-offset-1 leading-relaxed">
            {error.message}
          </h1>
          <div className="mt-5 mb-10">
            <pre className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {error.stack?.split("\n")[0]}
            </pre>
            <p>{error.digest}</p>
          </div>
          <div className="flex flex-row gap-2">
            <Button variant={"destructive"} onClick={() => goToHome()}>
              홈으로 돌아가기
            </Button>
            <Button onClick={reset}>다시 시도해주세요</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
