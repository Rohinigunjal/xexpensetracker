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
  const [expenseList, setExpenseList] = useState([]);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const totalExpense = expenseList.reduce((acc, curr) => acc + Number(curr.price || 0), 0);
  const expenseCategory = {
    entertainment: expenseList.filter(e => e.category === "entertainment").reduce((acc, curr) => acc + Number(curr.price || 0), 0),
    food: expenseList.filter(e => e.category === "food").reduce((acc, curr) => acc + Number(curr.price || 0), 0),
    travel: expenseList.filter(e => e.category === "travel").reduce((acc, curr) => acc + Number(curr.price || 0), 0)
  };
  const categoryCount = {
    entertainment: expenseList.filter(e => e.category === "entertainment").length,
    food: expenseList.filter(e => e.category === "food").length,
    travel: expenseList.filter(e => e.category === "travel").length
  };

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
    if (isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }
  }, [expenseList, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance.toString());
    }
  }, [balance, isMounted]);

  return (
    <>
      <div className={styles.container}>
        <h1>Expense Tracker</h1>

        <div className={styles.top_section}>
          <Card
            title="Wallet Balance"
            money={balance}
            buttonText="+ Add Income"
            buttonColorType="greenish"
            handleClick={() => setIsOpenBalance(true)}
          />

          <Card 
            title="Expenses"
            money={totalExpense}  
            buttonText="+ Add Expense"
            buttonColorType="redish"
            textColor={false}
            handleClick={() => setIsOpenExpense(true)}
          />

          <Piecharts 
            data={[
              {name: "Food", value: expenseCategory.food},
              {name: "Entertainment", value: expenseCategory.entertainment},
              {name: "Travel", value: expenseCategory.travel}
            ]}
          />
        </div>

        <div className={styles.bottom_section}>
          <Transactions 
            expenseListprop={expenseList} 
            setExpenseListprop={setExpenseList} 
            balanceprop={balance} 
            setBalanceprop={setBalance} 
          />

          <BarChart 
            data={[
              {name: "Entertainment", value: categoryCount.entertainment},
              {name: "Food", value: categoryCount.food},
              {name: "Travel", value: categoryCount.travel}
            ]}
          />
        </div>

        <Modal isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
          <Addbalance setIsOpenModal={setIsOpenBalance} setBalance={setBalance} />
        </Modal>

        <Modal isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
          <Addexpense 
            setIsOpenModal={setIsOpenExpense} 
            setBalance={setBalance}
            balance={balance}
            setExpenseList={setExpenseList}
            expenseList={expenseList}
          />
        </Modal>
      </div>
    </>
  );
}
