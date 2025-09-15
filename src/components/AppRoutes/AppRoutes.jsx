import "../../App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ExpensesPage from "../../pages/ExpensesPage";
import AnalysisPage from "../../pages/AnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MainPage from "../../pages/MainPage";
import SignInPage from "../../pages/SignInPage";
import SignUpPage from "../../pages/SignUpPage";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Загрузка...</div>; // пока проверяем пользователя

  return (
    <Routes>
      {/* Главная страница */}
      <Route
        path="/"
        element={user ? <MainPage /> : <Navigate to="/sign-in" replace />}
      >
        {/* Приватные маршруты */}
        <Route element={<PrivateRoute />}>
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route index element={<ExpensesPage />} />
        </Route>
      </Route>

      {/* Страницы аутентификации */}
      <Route
        path="/sign-in"
        element={user ? <Navigate to="/" replace /> : <SignInPage />}
      />
      <Route
        path="/sign-up"
        element={user ? <Navigate to="/" replace /> : <SignUpPage />}
      />

      {/* 404 */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
