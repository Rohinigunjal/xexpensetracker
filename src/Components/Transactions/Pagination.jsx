import { BsArrowLeft, BsArrowRight  } from "react-icons/bs";
import styles from "./Pagination.module.css";

export default function Pagination({totalPage, currentPage, changeCurrentPage}){

    const handlePrev = () => {
      if(currentPage>1){
        changeCurrentPage(prev => prev-1);
      }

    }

    const handleNext = () => {
      if(currentPage !== totalPage){
        changeCurrentPage(prev => prev+1);
      }
    }

   return (<>
    <div className={styles.pagination_sec}>
      <button onClick={handlePrev} disabled={currentPage === 1} className={styles.navbtn}>
        
        <BsArrowLeft />
      </button>
      <p className={styles.page_num}>{currentPage}</p>
      <button onClick={handleNext} disabled={currentPage===totalPage} className={styles.navbtn}>
        <BsArrowRight />
      </button>
    </div>
   </>)
}