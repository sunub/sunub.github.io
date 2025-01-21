import { Fragment } from "react";
import { Wave } from "@/widgets/Wave";
import { Container } from "./layout.style";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Wave />
      <Container>{children}</Container>
    </Fragment>
  );
}
