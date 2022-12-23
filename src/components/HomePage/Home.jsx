import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Book1 from '../../assets/Book1.png'
import Book2 from '../../assets/Book2.png'
import Book3 from '../../assets/Book3.png'
import Book4 from '../../assets/Book4.png'
import Book5 from '../../assets/Book5.png'
import Book6 from '../../assets/Book6.png'
import Book7 from '../../assets/Book7.png'
import Book8 from '../../assets/Book8.png'
import Book9 from '../../assets/Book9.png'
import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'
import { toast, ToastContainer } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("")
  const [logstatus, setLogstatus] = useState(null)

  useEffect(() => {
    fetchProducts();
    let loggedInUser = localStorage.getItem("Token");
    if (loggedInUser) {
      setLogstatus(loggedInUser);
    }
    loggedInUser = ""
  }, []);

  const fetchProducts = () => {
    axios
      .get('http://localhost:8060/bookList')
      .then((res) => {
        console.log(res.data);
        setProducts(res.data)
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const logoutHandler = () => {
    axios
      .post(`http://localhost:8060/logout/${logstatus}`)
      .then((res) => {
        toast.success(res.data.message);
        setLogstatus(null);
        localStorage.clear()
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  const sorting = (e) => {
    console.log(e.target.value);
    if (e.target.value === 'Asc') {
      const sorted = [...products].sort((a, b) =>
        a.price > b.price ? 1 : -1
      );
      setProducts(sorted)
    }
    if (e.target.value === 'Dsc') {
      const sorted = [...products].sort((a, b) =>
        a.price < b.price ? 1 : -1
      );
      setProducts(sorted)
    }
  }

  const addToCartHandler = (id) => {
    if (logstatus === null) {
      toast.error("Please Login to buy Book.")
    }
    axios
      .post(`http://localhost:8060/addBookToCart/${logstatus}/${id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

  const longText = `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
    Praesent non nunc mollis, fermentum neque at, semper arcu.
    Nullam eget est sed sem iaculis gravida eget vitae justo.`;



  return (
    <>
      <header>
        <div className="project">
          <MenuBookIcon color="action" fontSize='large' className="projecticon" />
          <label className="projectname">BookStore</label>
          <TextField onChange={(e) => setSearch(e.target.value)} size="medium" id="standard-basic" label="Search" placeholder="Search …" variant="filled" sx={{ marginBottom: '5px', width: { sm: 200, md: 400 }, }} />
          <div className="projectcart">
            <select onChange={sorting}>
              <option value="Asc">Low-to-High(price)</option>
              <option value="Dsc">High-to-Low(price)</option>
            </select>
          </div>
          {logstatus &&
            <div className="projectcart">
              <IconButton onClick={() => { navigate('/cart') }} aria-label="cart">
                <ShoppingCartIcon />
              </IconButton></div>
          }
          {!logstatus &&
            <button onClick={() => { navigate('/Signin') }} className="loginbutton"> Login </button>
          }
          {logstatus &&
            <button onClick={logoutHandler} className="loginbutton"> Logout </button>
          }
        </div>

      </header>
      <div className='containerbody'>
        <div className='container'>
          <div className='cardcontainer'>
            {products.filter(val => {
              if (search === '') {
                return val;
              } else if (val.bookName.toLowerCase().includes(search.toLowerCase()) || val.bookAuthor.toLowerCase().includes(search.toLowerCase())) {
                return val;
              }
            }).map((product) => {
              return (

                <Tooltip title={longText} placement="right" arrow>
                  <Card key={product.id} className='card' sx={{ maxWidth: 200 }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.bookCover}
                      alt="Image not Available"
                      sx={{ objectFit: "contain" }}
                    ></CardMedia>
                    {product.stock === false  &&
                      <h1 className='content'>Out of Stock</h1>
                    }
                    {product.quantity === 0  &&
                      <h1 className='content'>Out of Stock</h1>
                    }
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
                    </CardContent>
                    <CardActions>
                      <Button disabled={product.stock === false | product.quantity === 0} onClick={() => addToCartHandler(product.id)} size="small">Add to Cart</Button>
                      <Button size="small">Wishlist</Button>
                    </CardActions>
                  </Card>
                </Tooltip>
              )
            })}

            <Card className='card' sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={Book2}
                alt="Book2"
                sx={{ objectFit: "contain" }}
              />
              <CardContent class="cardcontent">
                <label className='cardtitle'>
                  Don't make me think
                </label><br />
                <label className='authorname'>
                  by Steve King
                </label><br />
                <label className='cardtitle'>
                  Rs. 170
                </label>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Wishlist</Button>
              </CardActions>
            </Card>

            <Card className='card' sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={Book3}
                alt="Book3"
                sx={{ objectFit: "contain" }}
              />
              <CardContent class="cardcontent">
                <label className='cardtitle'>
                  Don't make me think
                </label><br />
                <label className='authorname'>
                  by Steve King
                </label><br />
                <label className='cardtitle'>
                  Rs. 170
                </label>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Wishlist</Button>
              </CardActions>
            </Card>

            <Card className='card' sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={Book4}
                alt="Book4"
                sx={{ objectFit: "contain" }}
              />
              <CardContent class="cardcontent">
                <label className='cardtitle'>
                  Don't make me think
                </label><br />
                <label className='authorname'>
                  by Steve King
                </label><br />
                <label className='cardtitle'>
                  Rs. 170
                </label>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Wishlist</Button>
              </CardActions>
            </Card>

            <Card className='card' sx={{ maxWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={Book5}
                alt="Book5"
                sx={{ objectFit: "contain" }}
              />
              <CardContent class="cardcontent">
                <label className='cardtitle'>
                  Don't make me think
                </label><br />
                <label className='authorname'>
                  by Steve King
                </label><br />
                <label className='cardtitle'>
                  Rs. 170
                </label>
              </CardContent>
              <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button size="small">Wishlist</Button>
              </CardActions>
            </Card>

          </div>
          <div className='pagination'>
            <Stack spacing={2}>
              <Pagination count={10} />
            </Stack>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Home
