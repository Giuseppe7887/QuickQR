import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import QrSettings from "./qrSettings";

const URL_REGEX =
  /^(https?:\/\/)?((([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})|localhost|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[^\s]*)?$/;

function AddModal(props) {
  let [link, setLink] = useState({});
  let [error, setError] = useState("");
  let [validQR, setValidQR] = useState(false);

  // style
  let [style, setStyle] = useState("squares");
  let [level, setLevel] = useState("L");
  let [bg, setBg] = useState("#ffffff");
  let [fg, setFg] = useState("#000000");

  // ! IL SALVATAGGIO DEVE ESSERE UN OGGETTO OPPURE UNA STRINGA
  // ? DEVE CONTENERE I PARAMETRI
  //    - STYLE "squares" | "dots" | "fluid"
  //    - LEVEL 'L' 'M' 'Q' 'H'
  //    - BGCOLOR
  //    - FGCOLOR

  function carica() {
    if (!link || link === null || link === "")
      return setError("Field Required");
    if (!URL_REGEX.test(link)) return setError("Not Valid Link");

    let id = `QR-${uuid()}`;

    let model = {
      link,
      fg,
      bg,
      level,
      style
    }

    window.localStorage.setItem(id, JSON.stringify(model));
    props.onHide();
    props.showAlert("SUCCESS", "Saved");
    reset()
    props.fetchQR();
  }

  function changeState(state, value) {
    switch (state.toLowerCase()) {
      case "style":
        setStyle(value);
        break;
      case "level":
        setLevel(value);
        break;
      case "bg":
        setBg(value);
        break;
      case "fg":
        setFg(value);
        break;
      default:
        break;
    }
  }

  function reset(){
    setLink("");
    setBg("#ffffff");
    setFg("#000000")
    setLevel("L");
    setStyle("squares");
    setValidQR(false);
    setError("")
  }

  return (
    <Modal {...props} show={props.show} centered={true} size="lg">
      <Modal.Header onClick={(e)=>{
        e.preventDefault();
        reset()
        props.onHide()
      }} closeButton> ADD NEW QR CODE</Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            carica();
          }}
        >
          <Form.Group>
            <Form.Control
            autoFocus
              onFocus={() => setError("")}
              style={{
                borderColor: error !== "" && "red",
                color: error !== "" && "red",
              }}
              type="text"
              placeholder="insert link"
              onChange={(e) => {
                setLink(e.target.value.toString().trim());
                setValidQR(URL_REGEX.test(e.target.value));
              }}
            />
            <span style={{ color: "red" }}>{error}</span>
            <br />
            {validQR && <QrSettings changeState={changeState} fg={fg} bg={bg} level={level} style={style} url={link} />}
            <center>
              <Button
                style={{ marginRight: 10 }}
                onClick={(e) => {
                  e.preventDefault();
                  carica();
                }}
              >
                ADD
              </Button>
            </center>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddModal;
