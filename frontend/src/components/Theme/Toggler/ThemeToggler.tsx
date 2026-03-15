"use client";

import { VisuallyHidden } from "@/components/VisuallyHidden";
import { ToggleBtn } from "./ThemeToggler.style";
import { ThemeIcon } from "./ThemeIcon.tsx";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { useCallback } from "react";
import { getNextTheme } from "@/components/HeroImage/heroImageResources";

export function ThemeToggler({
  maskId,
  "data-testid": dataTestId = "theme-toggler-button",
  ...delegated
}: {
  maskId: string;
  "data-testid"?: string;
}) {
  const { colorTheme, setColorTheme } = useTheme();

  const handleClick = useCallback(() => {
    const nextTheme = getNextTheme(colorTheme);
    setColorTheme(nextTheme);
  }, [colorTheme, setColorTheme]);

  return (
    <ToggleBtn
      {...delegated}
      title="테마 변경"
      aria-label="theme-toggler-button"
      data-testid={dataTestId}
      onClick={handleClick}
    >
      <VisuallyHidden>테마 변경 버튼</VisuallyHidden>
      <ThemeIcon colorTheme={colorTheme} maskId={maskId} />
    </ToggleBtn>
  );
}
