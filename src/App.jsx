import "./App.css";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import GlobalStyle from "./components/GlobalStyles/GlobalStyles";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <AppRoutes />
    </AuthProvider>
  );
}
export default App;