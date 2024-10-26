import { Container } from "react-bootstrap";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { Contact } from "./Contact.tsx";
import "./custom.scss";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Container fluid>
      <App />
      <Contact />
    </Container>
  </BrowserRouter>
);
