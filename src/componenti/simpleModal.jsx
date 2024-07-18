import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CopyToClipboard } from 'react-copy-to-clipboard';

function SimpleModal({ visible, close, link, showAlert }) {


  async function copy() {
    // Get the text field
    // var copyText = document.getElementById("myInput");

    // // Select the text field
    // copyText.select();
    // copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    // window.navigator.clipboard.write(link);


    try {
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText(link).then(res => {

        }).catch(err => showAlert("ERROR", "Someting went wrong"))
      } else {
        document.execCommand('copy', true, link);

      }
      showAlert("SUCCESS", "Copied");
    } catch (err) {
      showAlert("ERROR", "Someting went wrong");
    }


    // Alert the copied text
  }

  return (
    <Modal centered onHide={close} show={visible}>
      <Modal.Header>
        <Modal.Title>This is your link</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ wordBreak: "break-all" }}>
        <p>{link}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close} variant="danger">
          Close
        </Button>
        <a href={link} target="_blank">
          <Button variant="success">Open Url</Button>
        </a>
        <CopyToClipboard text={link} onCopy={()=>showAlert("SUCCESS","Copied in clipboard")}>
          <Button style={{ background: "orange", border: "none" }}>
            Copy
          </Button>
        </CopyToClipboard>

      </Modal.Footer>
    </Modal >
  );
}

export default SimpleModal;
