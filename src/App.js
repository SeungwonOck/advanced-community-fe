import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "./style/common.style.css"
import Navbar from "./component/Navbar"
import AppRouter from "./routes/AppRouter"

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}

export default App;
