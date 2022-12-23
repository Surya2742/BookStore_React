import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = () => {

    const [user, setUser] = useState({ name: "", phoneNumber: "", pinCode: 0, locality: "", Address: "", city: "", landmark: "", addressType: "", userType: "", password: "" })
    let navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(value)
    }
    console.log(user)

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8060/createUser", user)
            .then((Response) => { toast.success(Response.data.message);
                setTimeout(() => {  navigate('/Signin'); }, 5000);
                 })
            .catch((err) => { toast.error(err.response.data) })
    };

    return (

        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="phoneNumber"
                                label="UserID/ Phone Number"
                                name="phoneNumber"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="Address"
                                label="Address"
                                name="Address"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="locality"
                                label="Locality"
                                name="locality"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="landmark"
                                label="Landmark"
                                name="landmark"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                onChange={onChangeHandler}
                                autoComplete="off"
                                name="pinCode"
                                required
                                fullWidth
                                id="pinCode"
                                label="Pin Code"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="addressType"
                                label="Address Type"
                                name="addressType"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => { navigate('/Signin') }} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <ToastContainer/>
        </Container>
    );
}
export default SignUp