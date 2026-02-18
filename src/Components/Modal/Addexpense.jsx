import styles from "./Modalforms.module.css";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useSnackbar } from "notistack";

export default function Addexpense({setIsOpenModal, setBalance, balance, setExpenseList, expenseList, editExpenseId}){

  const [formData, setFormData] = useState({
    title:'',
    category:'',
    price:'',
    date:'',
  });

  const { enqueueSnackbar} = useSnackbar();

  const handleChange = (e)=>{
      setFormData(prev => ({...prev, [e.target.name]:e.target.value}))

      console.log(formData);
  }

  const handleAddExpense = (e) =>{
    e.preventDefault();
    if(balance<Number(formData.price)){
      enqueueSnackbar("Price should be less than the wallet balance", {variant: "warning"});
      setIsOpenModal(false);
      return;
    }

     setBalance(prev => prev - Number(formData.price));

     const lastId = expenseList.length > 0 ? expenseList[0].id : 0
     setExpenseList(prev => [{ ...formData, id: lastId + 1 }, ...prev])

    setFormData({
      title: '',
      category:'',
      price:'',
      date:'',
    })
   
    console.log("formdata" + formData);
     setIsOpenModal(false);
  }



  const handleCancel = () =>{
      setIsOpenModal(false);
  }

  const handleEditExpense = (e) =>{
    e.preventDefault();
    const editedData = expenseList.map((expense1)=>{
       if(expense1.id === editExpenseId){
        const priceDifference = expense1.price - Number(formData.price);

        if(priceDifference < 0 && Math.abs(priceDifference)>balance){
          enqueueSnackbar("Price should be less than the wallet balance", {variant: "warning"});
          setIsOpenModal(false)
          return {...expense1}
        }
        setBalance(prev => prev+priceDifference)
          return { ...formData, id: editExpenseId}        
       }
       else{
          return expense1;
       }
    })
      setExpenseList(editedData);
      setIsOpenModal(false);
  }


  useEffect(()=>{
    if(editExpenseId){
      const transaction = expenseList.find(transaction1 => transaction1.id === editExpenseId);
      setFormData({
        title: transaction.title,
        category: transaction.category,
        price: transaction.price,
        date: transaction.date
      })
    }
  }, [editExpenseId, expenseList]); 

  return (
    <div className={styles.modal_wrapper}>
      <h2>{editExpenseId? 'Edit Expense': 'Add Expenses'}</h2>
      <form onSubmit={editExpenseId ? handleEditExpense : handleAddExpense} className={styles.myform}>

      <input type="text" 
      name="title" 
      placeholder="Title"
      value={formData.title}
      onChange={handleChange}
      required
      />

      <input type="number"
      name="price" 
      placeholder="Price"
      value={formData.price}
      onChange={handleChange}
      required
      />

      <select name="category"
      value={formData.category}
      onChange={handleChange}
      required>
        <option value='' disabled>Select Category</option>
        <option value='food'>Food</option>
        <option value='entertainment'>Entertainment</option>
        <option value='travel'>Travel</option>
      </select>

      <input type="date"
      name="date"       
      value={formData.date}
      onChange={handleChange}
      required
      />

      <Button type="submit" btncolor="add_btn">{editExpenseId? 'Edit Expense' : 'Add Expense'}</Button>

      <Button
              btncolor="cancel_btn"
              handleClick={handleCancel}
              >Cancel
              </Button>
      </form>
    </div>
  )

}