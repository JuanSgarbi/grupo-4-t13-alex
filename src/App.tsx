import MakeRoutes from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./style/theme";
import AdProvider from "./context/announcements.context";
import UserProvider from "./context/user.context";

function App() {
  return (
    <>
      <ChakraProvider theme={theme} resetCSS={true} portalZIndex={40}>
        <UserProvider>
          <AdProvider>
            <MakeRoutes />
          </AdProvider>
        </UserProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
