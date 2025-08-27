import "../../App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ExpensesPage from "../../pages/ExpensesPage";
import AnalysisPage from "../../pages/AnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthForm from "../AuthForm/AuthForm";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Routes>
      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Route>
      <Route
        path="/sign-in"
        element={<AuthForm isSignUp={false} setIsAuth={setIsAuth} />}
      />
      <Route
        path="/sign-up"
        element={<AuthForm isSignUp={true} setIsAuth={setIsAuth} />}
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
