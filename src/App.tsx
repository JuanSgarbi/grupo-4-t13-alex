import MakeRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";
import AdProvider from "./context/announcements.context";

function App() {
  return (
    <>
      <ChakraProvider theme={theme} resetCSS={true} portalZIndex={40}>
        <AdProvider>
          <MakeRoutes />
        </AdProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
