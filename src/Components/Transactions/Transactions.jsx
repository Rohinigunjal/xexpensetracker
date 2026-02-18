
import React, { useEffect, useState } from "react"
import styles from "./Transactions.module.css";
import Expenselistcard from "../ExpenselistCard/Expenselistcard";
import Addexpense from "../Modal/Addexpense";
import Modal from "../Modal/Modal";
import Pagination from "./Pagination";

export default function Transactions({expenseListprop, setExpenseListprop, balanceprop, setBalanceprop}){

  const [editTransactionId, setEditTransactionId] = useState(0);
  const [isOpenEditTransactionModal, setIsOpenEditTransactionModal] = useState(0);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const maxRecords = 3;

  useEffect(() => {
      const startindx = (currentPage-1)*maxRecords;
      const endindx = Math.min(currentPage*maxRecords, expenseListprop.length);
      setCurrentTransactions([...expenseListprop].slice(startindx, endindx))
      setTotalPages(Math.ceil(expenseListprop.length/maxRecords))
  }, [currentPage, expenseListprop])

  useEffect(() => {
    if(currentPage>totalPages && currentPage>1){
      setCurrentPage(prev => prev-1)
    }
  }, [totalPages, currentPage])

  const handleEdittransaction = (idToedit) => {
    setEditTransactionId(idToedit)    ;
    setIsOpenEditTransactionModal(true);
  }

  const handleDeletetransaction = (idTodel) => {
      const transactionTodel = expenseListprop.find(t => t.id === idTodel)
      setBalanceprop(prev => prev+Number(transactionTodel.price));
      setExpenseListprop(prev => (prev.filter(expenses => expenses.id !== idTodel)
    ))
  }
  
  return(
    <div className={styles.transaction_sec}>
    <h2>Recent Transactions</h2>
    { expenseListprop.length > 0 ?
    <div className={styles.transaction_list}>         
    {
      currentTransactions.map(transaction1 => (        
        <Expenselistcard transactioninfo={transaction1} handleDelete={() => handleDeletetransaction(transaction1.id)} handleEdit={() =>   handleEdittransaction(transaction1.id)}
        key={transaction1.id}
        />
      ))
    }     
      {totalPages>1 && <Pagination totalPage={totalPages} currentPage={currentPage} changeCurrentPage={setCurrentPage} />}

    </div>
    : (<p className={styles.txtclr}>No Transactions!</p>)
    
    }

    <Modal isOpen={isOpenEditTransactionModal} setIsOpen={setIsOpenEditTransactionModal}>
      <Addexpense setIsOpenModal={setIsOpenEditTransactionModal}
      setBalance={setBalanceprop} balance={balanceprop} setExpenseList={setExpenseListprop} expenseList={expenseListprop}
      editExpenseId={editTransactionId}
      />
    </Modal>

    </div>
  )
}