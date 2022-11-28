import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtercategorythun, getProductsThunk, inputFilterThunk } from '../store/slices/productsList.slice';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/home.css'

const Home = () => {

  const products = useSelector((state) => state.productsList)
  const dispatch = useDispatch()
  const [categoryList, setCatgoryList] = useState([]);
  const [inputSearch, setInputSearch] = useState('')

  useEffect(() => {
    dispatch(getProductsThunk())
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCatgoryList(res.data.data.categories))
  }, [])

  console.log(categoryList)



  return (
    <div className='Home-container'>
      <div className='find-container'>
        <div className='categories'>
          <h2>Categories</h2>
          {categoryList.map((category) => (
            <Button
              className='categories-buttons'
              key={category.name}
              onClick={() => dispatch(filtercategorythun(category.id))}
              variant="info">
              {category.name}</Button>
          ))}
        </div>
       
      </div>
      <div className='productsList-container'>
      <div className='input-container'>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search Product"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputSearch}
            onChange={e => setInputSearch(e.target.value)}
          />
          <Button
            onClick={() => dispatch(inputFilterThunk(inputSearch))}
            variant="outline-secondary" id="button-addon2">
            search
          </Button>
        </InputGroup>
        </div>
        <div className='productlist-title'>
      <h1>Products</h1>
      </div>
      <div className='productsList-detail'>
      {products.map(product => (
        <li className='product-list' key={product.id}>
          <Link className='product-detail' to={`/products/${product.id}`} >
            <p className='product-name'>{product.title}</p>
            <img className='img-product' src={product.productImgs[0]} alt="" />
          </Link>
        </li>
      ))}
      </div>
      </div>
    </div>
  
  );
};

export default Home;