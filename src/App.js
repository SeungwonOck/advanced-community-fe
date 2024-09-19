import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import "./style/common.style.css"
import Navbar from "./component/Navbar"
import AppRouter from "./routes/AppRouter"
import ToastMessage from './component/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from './action/userAction';
import Footer from './component/Footer';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(userActions.loginWithToken())
  }, [])
  return (
    <>
      <ToastMessage />
      <Navbar user={user} />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
