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

  if (loading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <MainPage /> : <Navigate to="/sign-in" replace />}
      >
        <Route element={<PrivateRoute />}>
          <Route path="expenses" element={<ExpensesPage />}>
            <Route index element={<ExpensesPage />} />{" "}
            <Route path="new" element={<ExpensesPage />} />{" "}
          </Route>
          <Route path="analysis" element={<AnalysisPage />}>
            <Route index element={<AnalysisPage />} />
            <Route path="calendar" element={<AnalysisPage />} />
            <Route path="chart" element={<AnalysisPage />} />
          </Route>
          <Route index element={<ExpensesPage />} />
        </Route>
      </Route>
      <Route
        path="/sign-in"
        element={user ? <Navigate to="/" replace /> : <SignInPage />}
      />
      <Route
        path="/sign-up"
        element={user ? <Navigate to="/" replace /> : <SignUpPage />}
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;

