import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PublicRoutes from "./Routes/PublicRoutes";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserDashboardIndex from "./Pages/UserDashboard/UserDashboardIndex";
import UserDashboardRoutes from "./Routes/UserDashboardRoutes";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import AdminDashboardIndex from "./Pages/AdminDashboard/AdminDashboardIndex";
import AdminDashboardRoutes from "./Routes/AdminDashboardRoutes";

function App() {
  return (
    <>
      <Toaster position="bottom-right flex" />

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}

        {/* user routes */}
        {/* <Route element={<ProtectedRoute roles={["user"]} />}> */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<UserDashboardIndex />} />
          {UserDashboardRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
        {/* </Route> */}

        {/* admin routes */}
        {/* <Route element={<ProtectedRoute roles={["admin"]} />}> */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardIndex />} />
          {AdminDashboardRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
