import "./App.css";
import Mint from "./components/Mint";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Mint />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default App;
