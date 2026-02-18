import { useState, useEffect } from "react";
import Card from "../../Components/Card/Card";
import styles from "./Home.module.css";
import Piecharts from "../../Components/Piecharts/Piecharts";
import Modal from "../../Components/Modal/Modal";
import Addbalance from "../../Components/Modal/Addbalance";
import Addexpense from "../../Components/Modal/Addexpense";
import BarChart from "../../Components/Barchart/BarChart";
import Transactions from "../../Components/Transactions/Transactions";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState({ entertainment: 0, food: 0, travel: 0 });
  const [categoryCount, setCategoryCount] = useState({ entertainment: 0, food: 0, travel: 0 });

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", "5000");
    }

    const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenseList(expenses);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(expenseList.reduce((acc, curr) => acc + Number(curr.price), 0));
    } else {
      setExpense(0);
    }

    let foodvar = 0, entertainmentvar = 0, travelvar = 0;
    let foodCount = 0, entertainmentCount = 0, travelCount = 0;

    expenseList.forEach((expense1) => {
      if (expense1.category === "food") {
        foodvar += Number(expense1.price);
        foodCount++;
      } else if (expense1.category === "entertainment") {
        entertainmentvar += Number(expense1.price);
        entertainmentCount++;
      } else if (expense1.category === "travel") {
        travelvar += Number(expense1.price);
        travelCount++;
      }
    });

    setExpenseCategory({
      entertainment: entertainmentvar,
      food: foodvar,
      travel: travelvar,
    });

    setCategoryCount({
      entertainment: entertainmentCount,
      food: foodCount,
      travel: travelCount,
    });

    console.log("expense list home", expenseList.map((item) => item.category));
    console.log("food count", foodCount, "entertainment count", entertainmentCount, "travelCount", travelCount);
  }, [expenseList, isMounted]);  

  
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance.toString());
    }
  }, [balance, isMounted]);  

  // Rest of JSX unchanged...
  return (
    <>
      <div className={styles.container}>
        <h1>Expense Tracker</h1>
        {/* Your exact JSX */}
      </div>
    </>
  );
}
