import HeroImage from "@/components/HeroImage";
import Footer from "@/components/Footer";
import HeaderContents from "@/components/HeaderContents";
import Main from "@/components/Main";
import { createPortal } from "react-dom";
import React from "react";

export const dynamic = "force-dynamic";

function Page() {
  return (
    <div id="side-ng__main-content">
      <Main />
    </div>
  );
}

export default Page;
