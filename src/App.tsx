import MakeRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";

function App() {
  return (
    <>
      <ChakraProvider theme={theme} resetCSS={true} portalZIndex={40}>
        <MakeRoutes />
      </ChakraProvider>
    </>
  );
}

export default App;
