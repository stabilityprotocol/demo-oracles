import "./common/i18n";
import { ThemeProvider } from "styled-components";
import { Theme } from "./common/Theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PortalRoot } from "./components/PortalRoot";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Overview } from "./pages/overview";
import { OracleSync } from "./common/Oracle/OracleSync";
import { Historical } from "./pages/historical";
import { OracleTransactions } from "./common/Oracle/OracleTransactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PortalRoot />,
    children: [
      { path: "/", element: <Overview />, },
      { path: "/overview", element: <Overview /> },
      { path: "/historical", element: <Historical /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RecoilRoot>
          <OracleSync />
          <OracleTransactions />
          <ThemeProvider theme={Theme}>
            <RouterProvider router={router} />
            <ToastContainer theme="dark" />
          </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default App;
