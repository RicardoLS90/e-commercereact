import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/productsList.slice';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/products.css'

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
        </div>
      </div>

      </div>
      <h2>Related products</h2>
      <div className='related-items'>
        {relatedProducts.map((related) => (
          <li className='related-card' key={related.id}>
            <Link className='related-link' to={`/products/${related.id}`}>
              <h3 className='related-title'>{related.title}</h3>
              <img className='related-img' src={related.productImgs[0]} alt="" />
            
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProductsDetail;