import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DailyQuoteModal = (props) => {
  const { random } = props;
    let quote = "";
    if (random.text && random.author) {
        quote = (<div>
                    <h4 style={{textAlign:'justify'}}>"{random.text}"</h4>
                    <p style={{textAlign:'center'}}>{random.author}</p>
                </div>)};
    if (random.author == null && random.text != null) {
        quote = (<div>
                    <h4 style={{textAlign:'justify'}}>"{random.text}"</h4>
                    <p style={{textAlign:'center'}}>unknown author</p>
                </div>)
    }
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          { quote }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>CLOSE</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default DailyQuoteModal;