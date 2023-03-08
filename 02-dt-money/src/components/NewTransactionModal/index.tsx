import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import { Container } from './styles';


Modal.setAppElement("#root")

interface NewNewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: ()=>void;
}
export function NewTransactionModal({isOpen,onRequestClose}: NewNewTransactionModalProps){
  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type='button'
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container>
        <h2>Cadastrar Informação</h2>

        <input placeholder='Titulo' />
        <input placeholder='Valor' type='number'/>
        <input placeholder='Categoria' />
        <button type="submit">Cadastrar</button>
      </Container>
          
    </Modal>
  )
}