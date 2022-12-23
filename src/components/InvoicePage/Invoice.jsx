import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import './Invoice.css'

const Invoice = () => {
    const [booksInCart, setBooksInCart] = useState([])
    const [user, setUser] = useState([])
    const [totalSum, setTotalSum] = useState(0);
    var logged = localStorage.getItem("Token");
    let navigate = useNavigate();

    useEffect(() => {
        fetchCart();
        loadUser();
    }, []);

    useEffect(() => {
        const total = booksInCart.reduce((acc, row) => acc + (row.price * row.countOfBook), 0);
        setTotalSum(total)
    }, [booksInCart]);

    console.log(totalSum)

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

    const loadUser = () => {
        axios.get(`http://localhost:8060/getUserDetails/${localStorage.getItem("Token")}`)
            .then((Response) => {
                console.log(Response.data)
                setUser(Response.data)
            })
            .catch((err) => { console.log(err) })
        console.log(user)
    }

    const checkoutHandler = () => {
        axios
            .post(`http://localhost:8060/orderTheCart/${logged}`)
            .then((res) => {
                toast.success(res.data.message);
                fetchCart();
                setTimeout(() => { navigate('/'); }, 2000);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    }

    return (
        <div class="container"><TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ fontSize: "1.25rem" }}>
                            Address:
                        </TableCell>
                        <TableCell align="left">
                            {user.address}, {user.locality}, {user.landmark}, {user.city}, {user.pinCode}
                        </TableCell>
                        <TableCell sx={{ fontSize: "1.25rem" }}>
                            Customer Name:
                        </TableCell>
                        <TableCell>
                            {user.name}
                        </TableCell>
                    </TableRow>
                    <TableRow
                        sx={{
                            borderBottom: "1.25px solid grey",
                            borderTop: "2px solid black",
                            "& th": {
                                fontSize: "1.5rem",
                            }
                        }}
                    >
                        <TableCell align="center" rowSpan={1} colSpan={1}>
                            Details
                        </TableCell>
                        <TableCell align="right" colSpan={2}>Price</TableCell>
                    </TableRow>
                    <TableRow
                        sx={{
                            borderBottom: "2px solid black",
                            "& th": {
                                fontSize: "1.5rem",
                            }
                        }}
                    >
                        <TableCell align="center">Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Unit</TableCell>
                        <TableCell align="right">Sum</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {booksInCart.map((product) => {
                        return (
                            <TableRow key={product.id}>
                                <TableCell align="center">
                                    <p sx={{ fontSize: "1.5" }}>
                                        {product.bookName}
                                    </p><br />
                                    <label>
                                        written by {product.bookAuthor}
                                    </label>
                                </TableCell>
                                <TableCell align="right">{product.countOfBook}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">{product.countOfBook * product.price}</TableCell>
                            </TableRow>
                        );
                    })}

                    <TableRow

                    >
                        <TableCell colSpan={3} align="right" sx={{ fontSize: "1.5rem" }}>Subtotal</TableCell>
                        <TableCell colSpan={1} align="right">{totalSum}</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
            <Button
                onClick={checkoutHandler}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                CheckOut
            </Button>
            <ToastContainer autoClose={2000} />
        </div>

    );
}
export default Invoice