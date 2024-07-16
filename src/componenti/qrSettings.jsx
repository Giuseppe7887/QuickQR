import { FormControl, FormGroup, FormLabel,FormSelect } from "react-bootstrap";
import { QRCode } from "react-qrcode-logo";

function QrSettings({ url, bg, fg, style, level, changeState }) {

    const STYLES = ["squares","dots","fluid"];
    const LEVELS = ["L","M","Q","H"];

  return (
    <div
      id="qr-settings"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>Modify qr-code style</p>
      <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",width:"100%",margin:30}}>
      <QRCode
          qrStyle={style}
          ecLevel={level}
          bgColor={bg}
          fgColor={fg}
          style={{ width: 50, height: 50, margin: 14 }}
          value={url}
        />
        <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignItems:"end"}}>
          <FormGroup style={{ display: "flex",marginBottom:15 }}>
            <FormLabel style={{ marginRight: 10 }} htmlFor="qr-fg">
              Color
            </FormLabel>
            <FormControl
              onChange={(e) => {
                changeState("fg", e.target.value);
              }}
              name="qr-fg"
              id="qr-fg"
              type="color"
            />
          </FormGroup>
          <FormGroup style={{ display: "flex",marginBottom:15}}>
            <FormLabel style={{ marginRight: 10 }} htmlFor="qr-bg">
              Background
            </FormLabel>
            <FormControl
              onChange={(e) => {
                changeState("bg", e.target.value);
              }}
              name="qr-bg"
              id="qr-bg"
              type="color"
            />
          </FormGroup>
          <FormGroup style={{ display: "flex",marginBottom:15}}>
            <FormLabel style={{ marginRight: 10 }} htmlFor="qr-style">
              Style
            </FormLabel>
            <FormSelect id="qr-style" name="qr-style" onChange={(e)=>changeState("style",e.target.value)}>
              {
                STYLES.map(opt=><option>{opt}</option>)
              }
            </FormSelect>
          </FormGroup>
          <FormGroup style={{ display: "flex"}}>
            <FormLabel style={{ marginRight: 10 }} htmlFor="qr-level">
              Level
            </FormLabel>
            <FormSelect id="qr-level" name="qr-level" onChange={(e)=>changeState("level",e.target.value)}>
              {
                LEVELS.map(opt=><option>{opt}</option>)
              }
            </FormSelect>
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default QrSettings;
