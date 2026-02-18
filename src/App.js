import React, { useState, useEffect } from 'react';
import './App.css';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const expenseCategories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [walletBalance, setWalletBalance] = useState(5000);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food', date: '' });

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

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    if (isEditing) {
      setExpenses(expenses.map(exp => exp.id === editingId ? { ...formData, id: editingId, amount: parseFloat(formData.amount) } : exp));
      setIsEditing(false);
      setEditingId(null);
    } else {
      const newExpense = { ...formData, id: Date.now(), amount: parseFloat(formData.amount) };
      setExpenses([...expenses, newExpense]);
    }
    setFormData({ title: '', amount: '', category: 'Food', date: '' });
  };

  const handleEdit = (expense) => {
    setIsEditing(true);
    setEditingId(expense.id);
    setFormData(expense);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const categoryData = expenseCategories.map(cat => ({
    name: cat,
    value: expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
  })).filter(d => d.value > 0);

  const trendData = [
    { name: 'Today', value: expenses.filter(exp => new Date(exp.date).toDateString() === new Date().toDateString()).reduce((sum, exp) => sum + exp.amount, 0) },
    { name: 'This Week', value: 1200 }, // Simplified; extend with date logic
    { name: 'This Month', value: expenses.reduce((sum, exp) => sum + exp.amount, 0) }
  ];

  return (
    <div className="container">
      <header>
        <h1>Expense Tracker</h1>
        <div className="wallet-balance">Wallet Balance: ₹{walletBalance.toFixed(2)}</div>
      </header>

      <form className="add-expense-form" onSubmit={handleAddOrUpdate}>
        <input type="text" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <input type="number" placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
          {expenseCategories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
        <button type="submit">{isEditing ? 'Update' : 'Add Expense'}</button>
      </form>

      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <span>{expense.title} - ₹{expense.amount} ({expense.category}) - {new Date(expense.date).toLocaleDateString()}</span>
            <div className="expense-actions">
              <button onClick={() => handleEdit(expense)}>Edit</button>
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h3>Expense Summary (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-wrapper">
          <h3>Spending Trends (Bar Chart)</h3>
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
