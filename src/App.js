import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Classroom from "./pages/Classroom";
import Student from "./pages/Student";
import Report from "./pages/Report";
import Profile from "./pages/Profile";
import ReportDetail from "./pages/ReportDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentHomePage from "./pages/StudentHomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/classroom/*",
    element: <Classroom />,
  },

  {
    path: "/me",
    element: <Profile />,
  },
  {
    path: "/report/*",
    element: <ReportDetail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/student-homepage",
    element: <StudentHomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
