import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Modalsection({isOpen, setIsOpen, children}){

  const customStyles = {
  content:{
      top:'50%',
      left:'50%',
      background: 'rgba(239, 239, 239, 0.85)',
      border: '0',
      borderRadius: '15px',
      padding:'2rem',
      height: 'fit-content',
      maxHeight: '90vh',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '70%',
      maxWidth: '600px'
      
  },
};

  return (<Modal
  isOpen={isOpen}
  onRequestClose={() =>{
    setIsOpen(false)}}
  shouldCloseOnOverlayClick={true}
  style={customStyles}
  >
    {children}
  </Modal>)

}