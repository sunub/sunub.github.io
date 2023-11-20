import LandingPage from "@/components/LandingPage";
import HeroImage from "@/components/LandingPage/HeroImage";
import Main from "@/components/Main";

export const fetchCache = "default-no-store";

export default function Page() {
  return (
    <>
      <Main>
        <HeroImage />
        <LandingPage />
      </Main>
    </>
  );
}
