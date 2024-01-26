"use client";

import React from "react";
import { createPortal } from "react-dom";
import HeroImage from "./HeroImage";

export default function Client() {
  React.useEffect(() => {
    const portalDOM = document.getElementById("blog-main__header-wrapper");
    createPortal(<HeroImage />, portalDOM as HTMLDivElement);
  }, []);

  return <React.Fragment />;
}
