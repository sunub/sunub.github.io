<<<<<<< HEAD
<<<<<<< HEAD
import LandingPage from "@/components/LandingPage";
import HeroImage from "@/components/LandingPage/HeroImage";
import Main from "@/components/Main";
=======
import Footer from "@/components/Footer";
import HeaderContents from "@/components/v2/HeaderContents";
import Main from "@/components/v2/Main";
>>>>>>> refs/remotes/origin/sunub

export const dynamic = "force-dynamic";

function Page() {
  return (
    <>
      <HeaderContents heroImageVisible={true} />
      <div id="side-ng__main-content">
        <Main />
        <Footer />
      </div>
    </>
  );
}
<<<<<<< HEAD
=======
import Footer from "@/components/Footer";
import HeaderContents from "@/components/v2/HeaderContents";
import Main from "@/components/v2/Main";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <>
      <HeaderContents />
      <div id="side-ng__main-content">
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default Page;
>>>>>>> dev-v2
=======

export default Page;
>>>>>>> refs/remotes/origin/sunub
