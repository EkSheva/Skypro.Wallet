import "../../App.css";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import ExpensesPage from "../../pages/ExpensesPage";
import AnalysisPage from "../../pages/AnalysisPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AuthForm from "../AuthForm/AuthForm";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MainPage from "../../pages/MainPage";
import { AuthContext } from "../../context/AuthContext";
function AppRoutes() {
  const { isAuth } = useContext(AuthContext); // Получаем isAuth из контекста

  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route
          path="expenses"
          element={
            <PrivateRoute isAuth={isAuth}>
              <ExpensesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="analysis"
          element={
            <PrivateRoute isAuth={isAuth}>
              <AnalysisPage />
            </PrivateRoute>
          }
        />
      </Route>
      <Route
        path="/sign-in"
        element={
          isAuth ? <Navigate to="/" replace /> : <AuthForm isSignUp={false} />
        }
      />
      <Route
        path="/sign-up"
        element={
          isAuth ? <Navigate to="/" replace /> : <AuthForm isSignUp={true} />
        }
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
// function AppRoutes() {
//   const [isAuth, setIsAuth] = useState(false);

//   return (
//     <Routes>
//       <Route element={<PrivateRoute isAuth={isAuth} />}>
//         <Route path="/" element={<MainPage />}>
//           <Route path="/expenses" element={<ExpensesPage />} />
//           <Route path="/analysis" element={<AnalysisPage />} />
//         </Route>
//       </Route>
//       <Route
//         path="/sign-in"
//         element={<AuthForm isSignUp={false} setIsAuth={setIsAuth} />}
//       />
//       <Route
//         path="/sign-up"
//         element={<AuthForm isSignUp={true} setIsAuth={setIsAuth} />}
//       />
//       <Route path="/*" element={<NotFoundPage />} />
//     </Routes>
//   );
// }

// export default AppRoutes;
