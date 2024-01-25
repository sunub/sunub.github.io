import HeroImage from "@/components/HeroImage";
import Footer from "@/components/Footer";
import HeaderContents from "@/components/HeaderContents";
import Main from "@/components/Main";
import Client from "@/components/client";
import React from "react";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <React.Fragment>
      <div id="side-ng__main-content">
        <Main />
      </div>
    </React.Fragment>
  );
}

export default Page;
