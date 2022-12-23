import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Homepage from './pages/HomePage/Homepage';
import Loginpage from './pages/LoginPage/Loginpage';
import SigninPage from './pages/Signin/SigninPage'
import SignupPage from './pages/Signup/SignupPage';
import CartPage from './pages/Cart/CartPage';
import InvoicePage from './pages/Invoice/InvoicePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = {<Homepage/>}/>
          <Route path = "/Login" element = {<Loginpage/>}/>
          <Route path = "/Signin" element = {<SigninPage/>}/>
          <Route path = "/Signup" element = {<SignupPage/>}/>
          <Route path = "/Cart" element = {<CartPage/>}/>
          <Route path = "/Invoice" element = {<InvoicePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
