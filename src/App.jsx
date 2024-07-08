import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/home";
import { appRoutes } from "./routes/appRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Outlet />
            </Home>
          }
        >
          {appRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
