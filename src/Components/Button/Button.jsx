import styles from "./Button.module.css";

export default function Button({children, handleClick, btncolor='add_btn', type='button'}){
  return (<button type={type} onClick={handleClick} className={
   `${styles.regularbtn} ${styles[btncolor]}` }>
    {children}
    </button>)
}
