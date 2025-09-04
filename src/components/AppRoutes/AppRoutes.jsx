import "../../App.css";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import ExpensesPage from "../../pages/ExpensesPage";
import AnalysisPage from "../../pages/AnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthForm from "../AuthForm/AuthForm";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Header from "../Header/Header";

function AppRoutes() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      <Header />
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
    </>  
  );
}

export default AppRoutes;

/*import { Routes, Route } from "react-router-dom";
import AnalysisPage from "../../pages/AnalysisPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/*" element={<div>Страница не найдена</div>} />
    </Routes>
  );
}

export default AppRoutes;*/

