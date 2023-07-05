import localFont from "next/font/local";

const nanumSquareNeo = localFont({
  src: "./fonts/NanumSquareNeo-Variable.ttf",
  variable: "--nanum-squareNeo",
});

const nanumSquareNeoBold = localFont({
  src: "./fonts/NanumSquareNeo-cBd.ttf",
  variable: "--nanum-squareNeo-bold",
});

const nanumSquareNeoHeavy = localFont({
  src: "./fonts/NanumSquareNeo-eHv.ttf",
  variable: "--nanum-squareNeo-heavy",
});

export { nanumSquareNeo, nanumSquareNeoBold, nanumSquareNeoHeavy };
