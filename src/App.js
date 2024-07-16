import { QRCode } from "react-qrcode-logo";
import { useEffect, useRef, useState } from "react";
import AddModal from "./componenti/addModal.jsx";
import Alert from "./componenti/alert.jsx";
import { Button } from "react-bootstrap";

function App() {
  const [addModalShow, setAddModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useState({
    visible: false,
    stato: "",
    messaggio: ""
  });
  const downloadLinkRef = useRef();
  const qrCanvasRef = useRef();

  function fetchQR() {
    let store = Object.keys(localStorage);
    let res = [];

    for (let item of store) {
      if (item.toUpperCase().startsWith("QR")) {
        let parsed = JSON.parse(window.localStorage.getItem(item));
        parsed["id"] = item;
        res.push(parsed);
      }
    }
    setData(res);
  }

  useEffect(() => {
    fetchQR();
  }, []);

  function addNewQR() {
    setAddModalShow(true);
  }

  function showAlert(stato, messaggio, timeout = 1000) {
    setAlertData({
      visible: true,
      messaggio: messaggio,
      stato: stato
    });

    setTimeout(() => {
      setAlertData({ visible: false });
      setTimeout(() => {
        setAlertData({ ...alertData, messaggio: "", stato: "" });
      }, timeout + 1000);
    }, timeout);
  }

  function remove(id) {
    window.localStorage.removeItem(id);
    fetchQR();
    showAlert("success", "Deleted");
  }

  function downloadQRCode(id) {
    const canvas = qrCanvasRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const linkElement = downloadLinkRef.current;
      linkElement.href = url;
      linkElement.download = `qrcode-${id}.png`;
      linkElement.click();
    }
  }

  return (
    <>
      <div id="container" style={{ overflowX: "hidden", width: "100vw",display:"grid" }}>
        {data.map((x) => {
          return (
            <center>
            <div key={x.id} style={{ margin: 10 }} className="card">
              <div className="qrContainer" ref={qrCanvasRef}>
                <QRCode qrStyle={x?.style} ecLevel={x?.level} size={100} value={x?.link} bgColor={x?.bg} fgColor={x?.fg} />
              </div>
              <div className="body" style={{ wordBreak: "break-all" }}>
                <p align="center">{x?.link}</p>
              </div>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button  onClick={() => downloadQRCode(x?.id)}  style={{ borderRadius: 0, width: "50%", borderBottomLeftRadius: 5,backgroundColor:"rgba(0,0,200,0.5)" }}>DOWNLOAD</Button>
                <Button onClick={() => remove(x?.id)} style={{ borderRadius: 0, width: "50%", borderBottomRightRadius: 5,backgroundColor:"rgba(200,0,0,0.5)" }} >CANCEL</Button>
              </div>
            </div>
            </center>
          );
        })}
        <center>
        <div onClick={() => addNewQR()} className="card placeh" style={{ flexGrow: 1, margin: 10 }}>
          <div className="qrContainer">
            <QRCode size={100} value="" fgColor="rgba(230,230,230,0.8)" />
          </div>
          <div className="body">
            <h5 align="center">NEW QR CODE</h5>
          </div>
        </div>
        </center>
 
      </div>
      <a ref={downloadLinkRef} style={{ display: "none" }}>Download</a>
      <AddModal fetchQR={fetchQR} showAlert={showAlert} onHide={() => setAddModalShow(false)} show={addModalShow} />

      <Alert stato={alertData.stato} messaggio={alertData.messaggio} show={alertData.visible} />
    </>
  );
}

export default App;
