import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  return (
    <>
      <ExpenseForm />
    </>
  );
}

export default App;
