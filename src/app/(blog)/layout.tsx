import Footer from "@/components/Footer";
import MinimalHeader from "@/components/MinimalHeader";
import React from "react";

function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <MinimalHeader />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

export default CategoryLayout;
