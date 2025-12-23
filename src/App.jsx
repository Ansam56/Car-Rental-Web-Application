import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import HistoryPage from "./pages/HistoryPage";
import ErrorPage from "./pages/ErrorPage";
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
          <Route index element={<HomePage />} />
          <Route path="cars/:id" element={<CarDetailsPage />} />
          <Route
            path="history"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <HistoryPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
