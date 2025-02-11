import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import PublicRoutes from "./Routes/PublicRoutes";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        {PublicRoutes.map(({ path, Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
