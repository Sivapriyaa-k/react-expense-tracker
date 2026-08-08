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
    setIsUpdate({ isUpdate: true, expenseId: index });
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
      <div className="min-h-screen bg-[#f4f5f7] text-[#333] px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#252525]">
              Expense Tracker
            </h1>
            <p className="text-gray-500 mt-2">
              Track and manage your daily expenses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border borrder-gray-200">
              <p className="text-sm font-medium text-gray-500">
                TOTAL EXPENSE{" "}
              </p>
              <h2 className="text-3xl font-bold text-[#222] mt-2">
                ₹
                {filteredExpenses.reduce((total, filteredExpense) => {
                  return total + Number(filteredExpense.amount);
                }, 0)}
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border borrder-gray-200">
              <p className="text-sm font-medium text-gray-500">TRANSACTIONS </p>
              <h2 className="text-3xl font-bold text-[#222] mt-2">
                {filteredExpenses.length}
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border borrder-gray-200">
              <p className="text-sm font-medium text-gray-500">
                AVERAGE EXPENSE
              </p>
              <h2 className="text-3xl font-bold text-[#222] mt-2">
                ₹
                {filteredExpenses.length > 0
                  ? Math.round(
                      filteredExpenses.reduce((total, filteredExpense) => {
                        return total + Number(filteredExpense.amount);
                      }, 0) / filteredExpenses.length,
                    )
                  : 0}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
              <h2 className="text-xl font-bold text-[#222] mb-1">
                {" "}
                {isUpdate.isUpdate ? "Update Expense" : "Add New Expense"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 top-1">
                <div className="formField mb-6 relative">
                  <label
                    htmlFor="expensename"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    {" "}
                    Expense Name
                  </label>
                  <input
                    type="text"
                    id="expensename"
                    name="expensename"
                    placeholder="e.g. Grocery shopping"
                    value={formData.name}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-gray-500 focus:ring-2 focus-ring-gray-100"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  {error.name && (
                    <p className="bottom-[-10] absolute error">{error.name}</p>
                  )}
                </div>
                <div className="formField mb-6 relative">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    {" "}
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    placeholder="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-gray-500 focus:ring-2 focus-ring-gray-100"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                  {error.amount && (
                    <p className="bottom-[-10] absolute error">
                      {error.amount}
                    </p>
                  )}
                </div>
                <div className="formField mb-6 relative">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    {" "}
                    Amount
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    <option value="food">food</option>
                    <option value="shopping">Shopping</option>
                    <option value="travel">Travel</option>
                  </select>
                  {error.category && (
                    <p className="bottom-[-10] absolute error">
                      {error.category}
                    </p>
                  )}
                </div>
                <div className="formField mb-6 relative">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-600 mb-2"
                  >
                    {" "}
                    Amount
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-gray-500 focus:ring-2 focus-ring-gray-100"
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                  {error.date && (
                    <p className="bottom-[-10] absolute error">{error.date}</p>
                  )}
                </div>

                <button
                  type={isUpdate.isUpdate ? "button" : "submit"}
                  onClick={
                    isUpdate.isUpdate
                      ? () => updateExpense(isUpdate.expenseId)
                      : undefined
                  }
                  className="w-full bg-[#222] text-white py-3 rounded-lg font-medium hover:bg-[#444] transition cursor-pointer"
                >
                  {isUpdate.isUpdate ? "Update Expense" : "Add Expense"}
                </button>
              </form>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm-items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2>Expense History</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {filteredExpenses.length} transaction
                    {filteredExpenses.length !== 1 ? "s" : ""}
                  </p>
                </div>
                {expenses.length > 0 && (
                  <select
                    name="filter"
                    id="filter"
                    className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white textt-sm outline-none"
                    onChange={(e) => filter(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="food">🍔 Food</option>
                    <option value="shopping">🛍 Shopping</option>
                    <option value="travel">✈️ Travel</option>
                  </select>
                )}
              </div>
              {filteredExpenses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-5xl mb-4">💸</div>

                  <h3 className="text-lg font-semibold text-gray-700">
                    No expenses yet
                  </h3>

                  <p className="text-sm text-gray-400 mt-2">
                    Add your first expense to start tracking.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredExpenses.map((expense, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                          {expense.category === "food"
                            ? "🍔"
                            : expense.category === "shopping"
                              ? "🛍️"
                              : "✈️"}
                        </div>
                        <div>
                          <h3 className="font-semibold textt-gray-800">
                            {expense.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                            <span className="capitalize">
                              {expense.category}
                            </span>
                            <span>•</span>
                            <span>{expense.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="font-bold text-lg text-gray-800">
                          {expense.amount}
                        </span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                            onClick={() => {
                              // console.log(index);
                              editExpense(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition cursor-pointer"
                            onClick={() => {
                              deleteExpense(index);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
