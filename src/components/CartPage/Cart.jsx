import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Cart.css'
import emptyCart from '../../assets/emptyCart.jpg'

const Cart = () => {
    const [user, setUser] = useState({ name: "", phoneNumber: "", pinCode: 0, locality: "", address: "", city: "", landmark: "", addressType: "", userType: "", password: "" })
    let navigate = useNavigate();
    const [booksInCart, setBooksInCart] = useState([])
    var logged = localStorage.getItem("Token");

    useEffect(() => {
        loadUser();
        fetchCart();
    }, [])

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(user)
    }

    const loadUser = () => {
        axios.get(`http://localhost:8060/getUserDetails/${localStorage.getItem("Token")}`)
            .then((Response) => {
                console.log(Response.data)
                setUser(Response.data)
            })
            .catch((err) => { console.log(err) })
        console.log(user)
    }

    const updateHandler = (userdetail) => {
        axios.put(`http://localhost:8060/updateUserDetails/${localStorage.getItem("Token")}`, userdetail)
            .then((Response) => { console.log((Response.data)) })
            .catch((err) => { console.log(err.Response.data) })
    }


    const fetchCart = () => {
        axios.get(`http://localhost:8060/viewCart/${localStorage.getItem("Token")}`)
            .then((res) => {
                console.log(res.data)
                setBooksInCart(res.data);
            })
            .catch((err) => {
                console.log(err.response.data)
            });
    }

    const removeFromCart = (id) => {
        axios
            .delete(`http://localhost:8060/removeBookFromCart/${logged}/${id}`)
            .then((res) => {
                console.log(res.data.message);
                fetchCart();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const incrementQuantityButton = (id) => {
        axios
            .post(`http://localhost:8060/addBookCountToCart/${logged}/${id}`)
            .then((res) => {
                toast.success(res.data.message);
                fetchCart();
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }

    const decrementQuantityButton = (id) => {
        axios
            .post(`http://localhost:8060/removeBookCountFromCart/${logged}/${id}`)
            .then((res) => {
                toast.success(res.data.message);
                fetchCart();
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }

    return (
        <><header>
            <div className="project">
                <MenuBookIcon color="action" fontSize='large' className="projecticon" />
                <label className="projectname">BookStore</label>
            </div>
        </header>
            <div >
                <div className='cartContainer'>
                    <Accordion sx={{ width: '70%', justifyContent: 'center' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ height: '80px', marginLeft: '5%', marginRight: '5%' }}
                        >
                            <Typography variant="h5" gutterBottom>Cart</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {booksInCart.map((product) => {
                                return (
                                    <div className='cartcontainerbody'>
                                        <Card key={product.id} className='card' sx={{ display: 'flex', marginBottom: '1%', marginTop: '1%', width: '75%', maxHeight: '90%' }}>
                                            <div>
                                                <CardMedia
                                                    component="img"
                                                    height="100px"
                                                    image={product.bookCover}
                                                    alt="Image not Available"
                                                    sx={{ objectFit: "contain", width: '150px' }} />
                                            </div>
                                            <div className='cardContent'>
                                                <CardContent class="cardcontent">
                                                    <label className='cardtitle'>
                                                        {product.bookName}
                                                    </label><br />
                                                    <label className='authorname'>
                                                        {product.bookAuthor}
                                                    </label><br />
                                                    <label className='cardtitle'>
                                                        Rs. {product.price}
                                                    </label>
                                                    <div className='countOfItems'>
                                                        <button onClick={() => decrementQuantityButton(product.id)}> – </button>
                                                        <input onChange={onChangeHandler} value={product.countOfBook} className="count" type="text" name="countOfBook" id="Name" required />
                                                        <button onClick={() => incrementQuantityButton(product.id)}> + </button>
                                                    </div>
                                                </CardContent>
                                            </div>
                                            <div className='cardAction'>
                                                <CardActions>
                                                    <Button onClick={() => removeFromCart(product.id)} variant="outlined" startIcon={<DeleteIcon />}>
                                                        Delete
                                                    </Button>
                                                </CardActions>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
                            {booksInCart.length === 0 &&
                                <img src={emptyCart} height='50%' width='50%' />}
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className='cartContainer'>
                    <Accordion sx={{ width: '70%' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ height: '80px', marginLeft: '5%', marginRight: '5%' }}
                        >
                            <Typography variant="h5" gutterBottom>Shipping Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
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
                                            value={user.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            onChange={onChangeHandler}
                                            required
                                            fullWidth
                                            id="Address"
                                            label="Address"
                                            name="address"
                                            autoComplete="off"
                                            value={user.address}
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
                                            value={user.locality}
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
                                            value={user.landmark}
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
                                            value={user.pinCode}
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
                                            value={user.addressType}
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
                                            value={user.city}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    disabled={booksInCart.length === 0}
                                    onClick={() => updateHandler(user)}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, marginRight: '20%' }}
                                >
                                    Update
                                </Button>
                                <Button
                                    disabled={booksInCart.length === 0}
                                    onClick={() => { navigate('/Invoice') }}
                                    
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Proceed
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <ToastContainer autoClose={2000} />
            </div></>
    )
}
export default Cart