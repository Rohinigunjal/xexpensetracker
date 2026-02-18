import styles from "./Expenselistcard.module.css";
import { CiRollingSuitcase, CiPizza } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { GrFormEdit } from "react-icons/gr";
import { FiGift } from "react-icons/fi";
import { useEffect } from "react";

 const Expenselistcard = ({transactioninfo, handleDelete, handleEdit}) => {

  
  
  return (<> 
    <div className={styles.expenselist_section}>          
        
      <div className={styles.inner_layout}>
        
        <div className={styles.category_icon}>          
         {transactioninfo.category === "food" && <CiPizza />}
         {transactioninfo.category === "entertainment" && <FiGift />}
         {transactioninfo.category === "travel" && <CiRollingSuitcase />}         
        </div> 

        <div className={styles.title_date}>
          <p className={styles.transaction_title}>{transactioninfo.title}</p>
          <p className={styles.transaction_date}>{transactioninfo.date}</p>
        </div> 

      </div> 

      <div className={styles.inner_layout}>
          
        <h4>&#8377;{transactioninfo.price}</h4>

        <div className={styles.btn}>
          <button className={styles.del_icon} onClick={handleDelete}><TiDeleteOutline /></button>        

          <button className={styles.edit_icon} onClick={handleEdit}><GrFormEdit/></button> 

        </div>  
        
        </div>        
      </div>
      <hr/> 
      
      </>
  )
}

export default Expenselistcard;