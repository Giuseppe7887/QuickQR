import { QRCode } from "react-qrcode-logo";
import { useEffect, useRef, useState } from "react";
import AddModal from "./componenti/addModal.jsx";
import Alert from "./componenti/alert.jsx";
import { Button } from "react-bootstrap";
import SimpleModal from "./componenti/simpleModal.jsx";


function Main() {
  const [addModalShow, setAddModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [alertData, setAlertData] = useState({
    visible: false,
    stato: "",
    messaggio: "",
  });
  let [SimpleModalData,setSimpleModalData] = useState({
    visible:false,
    data:""
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

  function showAlert(stato, messaggio, timeout = 2000) {
    if(alertData.visible) return;
    setAlertData({
      visible: true,
      messaggio: messaggio,
      stato: stato.toUpperCase(),
    });

      setTimeout(() => {
        setAlertData({ visible:false, messaggio: "", stato: "" });
    }, timeout);
    
  }

  function remove(id) {
    window.localStorage.removeItem(id);
    fetchQR();
    showAlert("SUCCESS", "Deleted");
  }

  function downloadQRCode(id) {
    const canvas = qrCanvasRef.current.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const linkElement = downloadLinkRef.current;
      linkElement.href = url;
      linkElement.download = `qrcode-${id}.png`;
      linkElement.click();
    }
  }

  function share(x){
    const base = "https://giuseppe7887.github.io/QuickQR"
    const url = `${base}/#qr?ref=${x?.link}&bg=${x?.bg.replace("#","")}&fg=${x?.fg.replace("#","")}&size=200&style=${x?.style}&download=false`;
    setSimpleModalData({
      visible:true,
      data:url
    })
  }

  

  return (
    <>
      <div
        id="container"
        style={{ overflowX: "hidden", width: "100vw", display: "grid" }}
      >
        {data.map((x) => {
          return (
            <center>
              <div
                key={x.id}
                style={{ margin: 10, position: "relative" }}
                className="card"
              >
                <svg
                onClick={()=>remove(x?.id)}
                style={{ position: "absolute",top:10,right:10,fontWeight:900 }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
                <div className="qrContainer" ref={qrCanvasRef}>
                  <QRCode
                    qrStyle={x?.style}
                    ecLevel={x?.level}
                    size={100}
                    value={x?.link}
                    bgColor={x?.bg}
                    fgColor={x?.fg}
                  />
                </div>
                <div className="body" style={{ wordBreak: "break-all" }}>
                  <p align="center">{x?.link}</p>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => downloadQRCode(x?.id)}
                    style={{
                      borderColor:"transparent",
                      borderRadius: 0,
                      width: "50%",
                      borderBottomLeftRadius: 5,
                      backgroundColor: "rgba(0,0,200,0.5)",
                    }}
                  >
                    DOWNLOAD
                  </Button>
                  <Button
                    onClick={() => share(x)}
                    style={{
                      borderColor:"transparent",
                      borderRadius: 0,
                      width: "50%",
                      borderBottomRightRadius: 5,
                      backgroundColor: "rgba(0,200,0,0.5)",
                    }}
                  >
                    SHARE
                  </Button>
                </div>
              </div>
            </center>
          );
        })}
        <center>
          <div
            onClick={() => addNewQR()}
            className="card placeh"
            style={{ flexGrow: 1, margin: 10 }}
          >
            <div className="qrContainer">
              <QRCode size={100} value="" fgColor="rgba(230,230,230,0.8)" />
            </div>
            <div className="body">
              <h5 align="center">NEW QR CODE</h5>
            </div>
          </div>
        </center>
      </div>
      <a ref={downloadLinkRef} style={{ display: "none" }}>
        Download
      </a>
      <AddModal
        fetchQR={fetchQR}
        showAlert={showAlert}
        onHide={() => setAddModalShow(false)}
        show={addModalShow}
      />

      <Alert
        stato={alertData.stato}
        messaggio={alertData.messaggio}
        show={alertData.visible}
      />

      <SimpleModal showAlert={showAlert} visible={SimpleModalData.visible} link={SimpleModalData.data} close={()=>setSimpleModalData({...SimpleModalData,visible:false})}/>
    </>
  );
}

export default Main;
