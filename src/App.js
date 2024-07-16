import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import QrPage from "./componenti/QrPage";



export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" Component={Main}/>
        <Route path="/qr" Component={QrPage}/>
      </Routes>
    </Router>
  );
}