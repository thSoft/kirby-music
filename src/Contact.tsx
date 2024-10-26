import { Button } from "react-bootstrap";

export function Contact() {
  return (
    <Button
      style={{
        position: "fixed",
        bottom: "16px",
        left: "20px",
        zIndex: "1000",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
      }}
      size="sm"
      variant="info"
      onClick={() =>
        (window.location.href = `mailto:harmathdenes@gmail.com?subject=Kirby Music Analysis Database Feedback`)
      }
    >
      Leave feedback
    </Button>
  );
}
