import { RefreshCcw } from "lucide-react";
import styled from "styled-components";
import { useReloadContext } from "../hook/useReload";

export function ReloadButton() {
  const { reload } = useReloadContext();

  return (
    <Button onClick={reload}>
      <RefreshCcw size={24} />
    </Button>
  );
}

const Button = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
