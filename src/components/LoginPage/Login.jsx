import React, { useState } from 'react'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({ phoneNumber: "", password: ""})

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(value)
  }

  const submitHandler = () => {
    console.log(user)
    if (user.phoneNumber === ""|| user.password === "") {
      alert("Please provide login details.")
    }
    else {
      axios.post("http://localhost:8060/login", user)
        .then((Response) => { localStorage.setItem("Token", Response.data );
      console.log(localStorage.getItem("Token"))
      })
        .catch((err) => { console.log(err) })
    }
  }

  return (
    <div className='logincontainerbody'>
      <div className='logincontainer'>
        <div>
          <label className='logintitle'>LoginPage</label>
        </div><br/>
        <div>
          <label>PhoneNumber</label><br />
          <input onChange={onChangeHandler} type="tel" name="phoneNumber" placeholder="ex:- 87*****950" id="phoneNumber" required />
        </div><br />
        <div>
          <label>Password</label><br />
          <input onChange={onChangeHandler} type="password" name="password" id="password" required />
        </div><br />
        <button onClick={submitHandler} type="submit">Submit</button>
      </div>
      <ToastContainer autoClose={5000} />
    </div>
  )
}
export default Login