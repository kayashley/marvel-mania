// moved import boostrap to index.scss for customization
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import { createRoot } from "react-dom/client"; // importing react-dom/client
import { MainView } from "./components/main-view/main-view"; // importing MainView
import Container from "react-bootstrap/Container"; // importing Container
import "./index.scss"; // import statement to bundle ./index.scss

// main component
const MCUApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// finds root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// tells React to render app in the root DOM element
root.render(<MCUApplication />);
