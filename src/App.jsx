import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PublicRoutes from "./Routes/PublicRoutes";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import UserDashboardIndex from "./Pages/UserDashboard/UserDashboardIndex";
import UserDashboardRoutes from "./Routes/UserDashboardRoutes";

function App() {
  return (
    <div className="">
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}

        {/* user routes */}
        <Route path="/user-dashboard" element={<UserDashboard />}>
          <Route index element={<UserDashboardIndex />} />
          {UserDashboardRoutes.map(({ path, Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
