import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function SimpleModal({ visible, close, link }) {
  return (
    <Modal centered onHide={close} show={visible}>
      <Modal.Header>
        <Modal.Title>Copy this link to share your QR</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ wordBreak: "break-all" }}>
        <p>{link}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close} variant="primary">
          Close
        </Button>
        <a href={link} target="_blank">
          <Button variant="success">Open</Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default SimpleModal;
