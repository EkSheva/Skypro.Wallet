import "../App.css";
import Expenses from "../components/Expenses/Expenses";

function ExpensesPage({isAuth}) {
  return <Expenses isAuth={isAuth}/>;
}

export default ExpensesPage;
