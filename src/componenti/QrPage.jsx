import { useSearchParams } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import { useEffect, useRef } from "react";

function QrPage() {
  // download
  let canvasRef = useRef(null);
  let downloadRef = useRef(null);

  //params
  const [searchParams] = useSearchParams();
  const code = searchParams.get("ref") || "";
  const bg = searchParams.get("bg") || "black";
  const fg = searchParams.get("fg") || "white";
  const style = searchParams.get("style") || "squares";
  const size = searchParams.get("size") || 300;
  const download = searchParams.get("download") || "false";

  useEffect(() => {
    
    if(download === "true"){
        let canvas = document.querySelector("canvas");

        let payload = canvas.toDataURL();
    
        downloadRef.current.href = payload;
        downloadRef.current.download = "qrcode.png";
        downloadRef.current.click();
    
    }

  }, []);

  return (
    <main
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={canvasRef}>
        <QRCode
          size={size}
          value={code}
          bgColor={bg}
          fgColor={fg}
          qrStyle={style}
        />
      </div>
      <a ref={downloadRef} style={{visibility:"hidden",position:"absolute",bottom:0,left:0}}></a>
    </main>
  );
}

export default QrPage;
