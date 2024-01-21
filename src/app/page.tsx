import Footer from "@/components/Footer";
import HeaderContents from "@/components/HeaderContents";
import Main from "@/components/Main";

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
