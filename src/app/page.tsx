import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import Main from "@/components/Main";

export const fetchCache = "default-no-store";

export default function Page() {
  return (
    <Main>
      <LandingPage />
    </Main>
  )
}
