import Button from "../Button/Button";
import styles from "./Card.module.css";

export default function Card({title, money, buttonText, buttonColorType, handleClick, textColor=true}){

  return (<div className={styles.card}>
    <h4 className={styles.card_title}>
      {`${title}: `}<span className={textColor ? styles.pass : styles.fail}>&#8377;{`${money}`} </span>
    </h4>
    <Button handleClick={handleClick} btncolor={buttonColorType}>{buttonText}</Button>
  </div>)

}