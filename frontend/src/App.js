import './App.css';
import {Routes,Route} from "react-router-dom";
import Singup from './components/Singup';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
function App() {
  return (
    <div className="App">
       
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Singup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
        </Routes>
       
    </div>
  );
}
export default App;




