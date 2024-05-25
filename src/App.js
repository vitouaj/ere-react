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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/student",
    element: <Student />,
  },
  {
    path: "/classroom/subject-item",
    element: <Classroom />,
  },
  {
    path: "/classroom/reports",
    element: <Report />,
  },
  {
    path: "/me",
    element: <Profile />,
  },
  {
    path: "/classroom/reports/detail",
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
