import { useState, useEffect } from "react";

export default function ExpenseForm() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [filteredExpenses, setFilteredExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [isUpdate, setIsUpdate] = useState({
    isUpdate: false,
    expenseId: "",
  });
  const [error, setError] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    console.log("Saving:", expenses);

    localStorage.setItem("expenses", JSON.stringify(expenses));
    // console.log(expenses);
  }, [expenses]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newError = {
      name: "",
      amount: "",
      category: "",
      date: "",
    };
    if (formData.name.trim() === "") {
      console.log(formData.name.trim() === "");
      newError.name = "Enter Name";
    }

    if (!formData.amount) {
      newError.amount = "Enter Amount";
    }
    if (!formData.category) {
      newError.category = "Select  Category";
    }
    if (!formData.date) {
      newError.date = "Select  Date";
    }

    if (
      newError.name ||
      newError.amount ||
      newError.category ||
      newError.date
    ) {
      setError(newError);
      return;
    }

    setError({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
    setFormData({
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    });
    setExpenses([...expenses, formData]);
    setFilteredExpenses([...expenses, formData]);
    setFormData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
    console.log(expenses);
  };

  const deleteExpense = (index) => {
    // e.preventDefault();
    const updatedExpenses = expenses.filter((expense, i) => index !== i);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const editExpense = (index) => {
    console.log(isUpdate.isUpdate);
    const editExpense = expenses[index];
    setFormData({
      name: editExpense.name,
      amount: editExpense.amount,
      category: editExpense.category,
      date: editExpense.date,
    });
    setIsUpdate({ isUpdate: false, expenseId: index });
  };

  const updateExpense = (index) => {
    console.log(index);

    const updatedExpenses = [...expenses];

    updatedExpenses[index] = {
      ...updatedExpenses[index],
      name: formData.name,
      amount: formData.amount,
      category: formData.category,
      date: formData.date,
    };
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
    setFormData({
      name: "",
      amount: "",
      category: "",
      date: "",
    });
    setIsUpdate({ isUpdate: true, expenseId: "" });
  };

  const filter = (category) => {
    if (category === "") {
      setFilteredExpenses([...expenses]);
      return;
    }
    const filteredData = expenses.filter(
      (expense, i) => category === expense.category,
    );
    console.log(filteredData);
    setFilteredExpenses(filteredData);
  };
  return (
    <>
    <h1>Expense tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="formField">
          <label htmlFor="expensename"> Expense Name</label>
          <input
            type="text"
            name="expensename"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <p>{error.name}</p>
        <div className="formField">
          <label htmlFor="amount"> Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>
        <p>{error.amount}</p>
        <div className="formField">
          <label htmlFor="category"> Amount</label>
          <select
            name="category"
            id=""
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="food">food</option>
            <option value="shopping">Shopping</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <p>{error.category}</p>
        <div className="formField">
          <label htmlFor="date"> Amount</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>
        <p>{error.date}</p>
        {isUpdate.isUpdate ? (
          <button
            type="button"
            onClick={(e) => updateExpense(isUpdate.expenseId)}
          >
            Update Expense
          </button>
        ) : (
          <button>Add Expense</button>
        )}
      </form>
      {filteredExpenses.map((expense, index) => (
        <div key={index} className="expenseContainer">
          <div className="expenseName">
            Expense: <span> {expense.name}</span>
          </div>
          <div className="expenseAmount">
            Amount: <span> {expense.amount}</span>
          </div>
          <div className="expenseCategory">
            Category: <span> {expense.category}</span>
          </div>
          <div className="expenseDate">
            Date: <span> {expense.date}</span>
          </div>
          <button
            onClick={() => {
              deleteExpense(index);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              // console.log(index);
              editExpense(index);
            }}
          >
            Edit
          </button>
        </div>
      ))}
      {expenses.length > 0 ? (
        <div>
          <div>
            <select
              name="filter"
              id="filter"
              onChange={(e) => filter(e.target.value)}
            >
              <option value="">Filter By</option>
              <option value="food">Food</option>
              <option value="shopping">shopping</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          <div>
            {" "}
            Total: ₹{" "}
            {filteredExpenses.reduce((total, filteredExpense) => {
              return total + Number(filteredExpense.amount);
            }, 0)}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
