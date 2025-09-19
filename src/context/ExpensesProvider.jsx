import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { ExpensesContext } from "./EspensesContext";
import { getTransactions } from "../services/transactions";
import { useMediaQuery } from "react-responsive";

export const ExpensesProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState("");
  const { user } = useContext(AuthContext);
  const isMobile = useMediaQuery({ query: `(max-width: 495px)` });
  const [showForm, setShowForm] = useState(true);

  const fetchExpenses = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const data = await getTransactions(user.token);
      setTransactions(data || []);
      if (isMobile) setShowForm(false);
    } catch (err) {
      console.error("Ошибка загрузки транзакций:", err.message);
    } finally {
      setLoading(false);
    }
  }, [isMobile, user?.token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <ExpensesContext.Provider
      value={{
        isMobile,
        setShowForm,
        transactions,
        setTransactions,
        setErrors,
        loading,
        errors,
        showForm,
        fetchExpenses,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};
