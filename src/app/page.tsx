import Footer from "@/components/Footer";
import HeaderContents from "@/components/v2/HeaderContents";
import Main from "@/components/v2/Main";

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

export default Page;
