import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import Spacer from "@/components/Spacer";

function HeaderContents() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background:
          "linear-gradient(1deg, rgba(253, 243, 241, 0.71) 30%, rgba(255, 176, 161, 0.68) 60%)",
      }}
    >
      <Spacer size={60} axis={"vertical"} />
      <Header />
      <HeroImage />
    </div>
  );
}

export default HeaderContents;
