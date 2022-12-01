import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsListSlice from '../store/slices/productsList.slice';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../styles/purchases.css'

const Purchases = () => {

  const dispach = useDispatch()

  const purchases = useSelector(state => state.purchases)

  useEffect(() => {
    dispach(getPurchasesThunk())
  }, [])

  return (
    <div>
      <h1>Purchases</h1>
      <ul>
        {
          purchases.map(purchase => (
            <div className='purchases-container' key={purchase.id}>{purchase.cart.products.map(products => (
              <li className='link-purchases' key={products.id}>
                <Link className='link-purchases' to={`/products/${products.id}`}>
                  <Card border="info" style={{ width: '18rem' }}>
                    <Card.Header>{purchase.createdAt}</Card.Header>
                    <Card.Body>
                      <Card.Title>{products.title}</Card.Title>
                      <Card.Text>
                       <b>Price:</b> {products.price}
                      </Card.Text>
                      <Card.Text>
                        <b>Quantity: </b> {products.productsInCart.quantity}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                </Link>
              </li>
            ))}
            </div>

          ))
        }
      </ul>
    </div>
  );
};

export default Purchases;