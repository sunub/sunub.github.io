import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { PointerType } from "@/shared/type/editor/tool";

type ToolButtonBaseProps = {
  icon?: ReactNode;
  "aria-label": string;
  "aria-keyshortcuts"?: string;
  "data-testid"?: string;
  label?: string;
  title?: string;
  name?: string;
  id?: string;
  size?: "small" | "medium";
  keyBindingLabel?: string | null;
  showAriaLabel?: boolean;
  hidden?: boolean;
  visible?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
};

type ToolButtonProps =
  | (ToolButtonBaseProps & {
      type: "button";
      children?: ReactNode;
      onClick?(event: React.MouseEvent): void;
    })
  | (ToolButtonBaseProps & {
      type: "radio";
      checked: boolean;
      onChange?(data: { pointerType: PointerType | null }): void;
      onPointerDown?(data: { pointerType: PointerType }): void;
    });

export const ToolButton = ({
  props,
  ref,
}: {
  props: ToolButtonProps;
  ref: React.RefObject<unknown>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  if (props.type === "button") {
    return <button>HI</button>;
  }

  return (
    <label>
      <ToolIcon_radio
        type="radio"
        name={props.name}
        aria-label={props["aria-label"]}
        checked={props.checked}
        ref={innerRef}
      />
      <ToolIcon_icon>
        {props.icon}
        {props.keyBindingLabel && <span>{props.keyBindingLabel}</span>}
      </ToolIcon_icon>
    </label>
  );
};

const ToolIcon_radio = styled.input`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
`;

const ToolIcon_icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
