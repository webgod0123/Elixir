import { RecoilRoot } from "recoil";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider, Container } from "@mantine/core";
import { UserList } from "./components/UserList";
import { UserDetails } from "./components/UserDetail";
import Header from "./components/Header";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Header />
          <Container
            fluid
            mih="100vh"
            pt="100"
            bg="var(--mantine-color-blue-light)"
          >
            <Container maw="1200">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<UserList />} />
                  <Route path="/:id" element={<UserDetails />} />
                </Routes>
              </BrowserRouter>
            </Container>
          </Container>
        </MantineProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
