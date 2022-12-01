import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { checkOutThunk, getsideBarThunk } from '../store/slices/sideBar.slice';
import { Link } from 'react-router-dom';
import '../styles/cart.css'




const PurchasesCart = ({show,handleClose,handleShow}) => {

  const sideitems = useSelector((state) => state.sidebar)

  const dispatch= useDispatch()

  useEffect (()=>{
    dispatch(getsideBarThunk())
  },[])


  return (
    <div>
       <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Purchases Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {sideitems.map(item=>(
              <Link className='link-cart' to={`/products/${item.id}`} key={item.id} >
              <p> {item.title}</p>
              <p> {item.productsInCart.quantity}</p>
              </Link>
            ))}
            <Button onClick={()=>dispatch(checkOutThunk())} variant="primary">CheckOut</Button>{' '}
          </Offcanvas.Body>
          
        </Offcanvas>
        
    </div>
  );
};

export default PurchasesCart;