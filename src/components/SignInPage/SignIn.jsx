import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {

  const [user, setUser] = useState({ phoneNumber: "", password: "" })
  let navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.phoneNumber === "" || user.password === "") {
      alert("Please provide login details.")
    }
    else {
      axios.post("http://localhost:8060/login", user)
        .then((Response) => {
          localStorage.setItem("Token", Response.data);
          console.log(localStorage.getItem("Token"))
          toast.success("User Logged Successfully");
          setTimeout(() => { navigate('/'); }, 2000);
        })
        .catch((err) => { toast.error(err.response.data) })
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          onChange={onChangeHandler}
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          autoComplete="off"
          autoFocus
        />
        <TextField
          onChange={onChangeHandler}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />

        <Button
          onClick={handleSubmit}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link onClick={() => { navigate('/Signup') }} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={2000} />
    </Box>
  );
}
export default SignIn