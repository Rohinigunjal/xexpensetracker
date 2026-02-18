import React from "react";

function App() {
  const [walletBalance, setWalletBalance] = React.useState(5000);

  const [expenses, setExpenses] = React.useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [date, setDate] = React.useState("");

  const [incomeAmount, setIncomeAmount] = React.useState("");

  // Save expenses to localStorage
  React.useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Handle Add Income
  const handleAddIncome = (e) => {
    e.preventDefault();

    if (!incomeAmount) return;

    setWalletBalance(walletBalance + Number(incomeAmount));
    setIncomeAmount("");
  };

  // Handle Add Expense
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!title || !price || !category || !date) return;

    if (Number(price) > walletBalance) {
      alert("Insufficient balance");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title,
      price: Number(price),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);
    setWalletBalance(walletBalance - Number(price));

    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
  };

  return (
    <div>
      <h1>Expense Tracker</h1>

      <h2>Wallet Balance: ₹{walletBalance.toFixed(2)}</h2>

      {/* Buttons */}
      <button type="button">+ Add Income</button>
      <button type="button">+ Add Expense</button>

      {/* Add Income Form */}
      <form onSubmit={handleAddIncome}>
        <input
          type="number"
          placeholder="Income Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />
        <button type="submit">Add Balance</button>
      </form>

      {/* Add Expense Form */}
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense Title"
        />

        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Expense Amount"
        />

        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      {/* Expense List */}
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - ₹{expense.price} - {expense.category} -{" "}
            {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
