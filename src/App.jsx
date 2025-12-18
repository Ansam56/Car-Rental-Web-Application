import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/cars/:id" element={<CarDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
