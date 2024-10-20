import { ReactElement } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export function TooltipWrapper({ children, tooltip }: { children: ReactElement; tooltip: string | undefined }) {
  return tooltip ? <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>{children}</OverlayTrigger> : children;
}
