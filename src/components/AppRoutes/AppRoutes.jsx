import "../../App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ExpensesPage from "../../pages/ExpensesPage";
import AnalysisPage from "../../pages/AnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthForm from "../AuthForm/AuthForm";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MainPage from "../../pages/MainPage";
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
        </Route>
      </Route>

      {/* Страницы аутентификации */}
      <Route
        path="/sign-in"
        element={user ? <Navigate to="/" replace /> : <AuthForm isSignUp={false} />}
      />
      <Route
        path="/sign-up"
        element={user ? <Navigate to="/" replace /> : <AuthForm isSignUp={true} />}
      />

      {/* 404 */}
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
