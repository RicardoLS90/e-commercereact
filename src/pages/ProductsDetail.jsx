import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/productsList.slice';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/products.css'
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { createPurchasesThunk } from '../store/slices/sideBar.slice';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const ProductsDetail = () => {


  const { id } = useParams();
  const dispatch = useDispatch()





  useEffect(() => {
    dispatch(getProductsThunk())

  }, [])

  const productList = useSelector(state => state.productsList)

  const products = productList.find(item => item.id === Number(id))
  const relatedProducts = productList.filter(item => item.category.id === products.category.id)
  console.log(products)

  const [quantity, setQuantity] = useState(1)

  const addQuantity =()=> {
    setQuantity(quantity+1)
  }

  const lowQuantity= () => {
    setQuantity(quantity-1)
  }

  const addToCart = () => {
    const addProduct = {
      id: products.id,
      quantity: quantity
    }
    dispatch(createPurchasesThunk(addProduct))
  }


  return (
    <div className='productsDetail-container'>

      <h1>{products?.title}</h1>
      <div className='productDetail'>
        <div className='productDetail-info'>
          <Carousel>
            <Carousel.Item className='produtcslice'>
              <img
                className="d-block w-100 imgDetail"
                src={products?.productImgs[0]}
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='produtcslice'>
              <img
                className="d-block w-100 imgDetail"
                src={products?.productImgs[1]}
                alt="Second slide"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className='produtcslice'>
              <img
                className="d-block w-100 imgDetail"
                src={products?.productImgs[2]}
                alt="Third slide"
              />

              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='productInfo-container'>
          <h3>{products?.title}</h3>
          <br />
          <p>{products?.description}</p>
          <br />
          <div className='price'>
            <h3><b>Price</b></h3>
            <h3>$ {products?.price}</h3>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text" value={quantity} 
                onChange={e => setQuantity(e.target.value)}
              />
              <Button  onClick={addQuantity} variant="outline-secondary" id="button-addon2">
                +
              </Button>
              <Button disabled={quantity<=1} onClick={lowQuantity} variant="outline-secondary" id="button-addon2">
                -
              </Button>
              <Button onClick={addToCart} variant="outline-secondary" id="button-addon2">
                Add to Cart
              </Button>
            </InputGroup>
          </div>
        </div>

      </div>
      <h2>Related products</h2>
      <div className='related-items'>
        {relatedProducts.map((related) => (
          <li className='related-card' key={related.id}>
            <Link className='related-link' to={`/products/${related.id}`}>
              <Card className='img-container' style={{ width: '18rem' }}>
                <Card.Img className='img-product' variant="top" src={related.productImgs[0]} />
                <Card.Body>
                  <Card.Title>{related.title}</Card.Title>
                  <Card.Text>
                    Price
                    {related.price}
                  </Card.Text>
                  <Link className='link-home' to={`/products/${related.id}`}>
                  <Button variant="primary">Details</Button>
                  </Link>
                </Card.Body>
              </Card>


            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProductsDetail;