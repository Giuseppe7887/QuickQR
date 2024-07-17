import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';


function Alert(props) {
    return (
        <ToastContainer position="bottom-end" style={{margin:"20px"}}>
            <Toast  onClose={()=>props.onHide()} show={props.show} style={{ zIndex: 100000 }}>
                <Toast.Header closeButton={false}>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto" style={{ color: props.stato === "SUCCESS" ? "green" : "red" }}>{props?.stato?.toUpperCase()}</strong>
                </Toast.Header>
                <Toast.Body ><strong>{props.messaggio}</strong></Toast.Body>
            </Toast>
        </ToastContainer>
    )
};

export default Alert;