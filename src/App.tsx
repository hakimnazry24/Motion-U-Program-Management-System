import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProgramManagerDashboard from "./pages/ProgramManagerDashboard";
import ClubMainboardDashboard from "./pages/ClubMainboardDashboard";
import ProgramPage from "./pages/ProgramPage";
import AddProgramPage from "./pages/AddProgramPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/program-manager-dashboard",
      element: <ProgramManagerDashboard></ProgramManagerDashboard>,
    },
    {
      path: "club-mainboard-dashboard",
      element: <ClubMainboardDashboard></ClubMainboardDashboard>,
      
    },
    {
      path: "/club-mainboard-dashboard/add-program",
      element: <AddProgramPage></AddProgramPage>
    },
    {
      path: "club-mainboard-dashboard/program/:programId",
      element: <ProgramPage></ProgramPage>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
