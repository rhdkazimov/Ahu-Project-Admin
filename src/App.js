import "./App.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./Routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <AppRoutes />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
