import React, { useState, useEffect } from 'react';
import './App.css';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const expenseCategories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Other', date: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      const loadedExpenses = JSON.parse(saved);
      setExpenses(loadedExpenses);
      const totalSpent = loadedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
      setWalletBalance(5000 - totalSpent);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    setWalletBalance(5000 - totalSpent);
  }, [expenses]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    return formData.title.trim() && formData.amount > 0 && formData.category && formData.date;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const expense = {
      id: editId || Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (editId) {
      setExpenses(expenses.map(exp => exp.id === editId ? expense : exp));
      setEditId(null);
    } else {
      setExpenses([...expenses, expense]);
    }
    setFormData({ title: '', amount: '', category: 'Other', date: '' });
    setShowForm(false);
  };

  const handleEdit = (expense) => {
    setFormData(expense);
    setEditId(expense.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const pieData = expenseCategories.map(cat => {
    const total = expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0);
    return { name: cat, value: total };
  }).filter(d => d.value > 0);

  const barData = expenses
    .slice(-7)
    .reduce((acc, exp) => {
      const date = new Date(exp.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + exp.amount;
      return acc;
    }, {});

  const trendData = Object.entries(barData).map(([name, value]) => ({ name, value })).reverse();

  return (
    <div className="container">
      <div className="wallet-balance">
        <h2>Wallet Balance</h2>
        <h1>₹{walletBalance.toLocaleString()}</h1>
        <button className="add-expense-btn" onClick={() => { setShowForm(true); setEditId(null); }}>
          + Add Expense
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3>{editId ? 'Edit Expense' : 'Add Expense'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Grocery shopping"
                required
              />
            </div>
            <div className="input-group">
              <label>Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="input-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                {expenseCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={!validateForm()}>
              {editId ? 'Update' : 'Add Expense'}
            </button>
          </form>
        </div>
      )}

      <div className="expense-list">
        <h3>Recent Expenses ({expenses.length})</h3>
        {expenses.slice(-5).map(expense => (
          <div key={expense.id} className="expense-item">
            <div>
              <strong>{expense.title}</strong>
              <div className="expense-meta">
                {expense.category} • {new Date(expense.date).toLocaleDateString()} • ₹{expense.amount.toFixed(2)}
              </div>
            </div>
            <div className="expense-actions">
              <button className="edit-btn" onClick={() => handleEdit(expense)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(expense.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h4>Expense Summary (Pie)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                nameKey="name"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper">
          <h4>Trends (Bar - Last 7 days)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
