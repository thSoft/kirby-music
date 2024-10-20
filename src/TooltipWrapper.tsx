import { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/types";

export function TooltipWrapper({
  children,
  tooltip,
  placement,
}: {
  children: ReactElement;
  tooltip: string | undefined;
  placement?: Placement;
}) {
  return tooltip ? (
    <OverlayTrigger delay={300} placement={placement} overlay={<Tooltip>{tooltip}</Tooltip>}>
      {children}
    </OverlayTrigger>
  ) : (
    children
  );
}
