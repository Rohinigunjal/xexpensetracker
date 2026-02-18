import { useState } from "react";
import styles from "./Modalforms.module.css";
import Button from "../Button/Button";
import {useSnackbar} from "notistack";

export default function Addbalance({setIsOpenModal, setBalance}){

  const [income, setIncome] = useState('');
  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(Number(income<0)){
      enqueueSnackbar("Income should be greater than 0", {variant: "warning"});
      setIsOpenModal(false);
      return
    }

      setBalance(prev => prev + Number(income));
      setIsOpenModal(false);

  }

  return (
    <div className={styles.modal_wrapper}>
      <h2>Add Balance</h2>
      <form onSubmit={handleSubmit}>

        <input 
        type="number" 
        placeholder="Income Amount"
        value={income}
        onChange={(e)=> setIncome(e.target.value)}
        required
        />

        <Button
        type="submit"
        btncolor="add_btn"
        >Add Balance
        </Button>

        <Button
        btncolor="cancel_btn"
        handleClick={()=>setIsOpenModal(false)}
        >Cancel
        </Button>
        
      </form>
    </div>
  );
}