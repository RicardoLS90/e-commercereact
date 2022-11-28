import { HashRouter,Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductsDetail from './pages/ProductsDetail'
import { Container } from 'react-bootstrap'
import NavBar from './components/NavBar'
import Purchases from './pages/Purchases'
import IsLoading from './components/IsLoading'
import { useSelector } from 'react-redux'

function App() {
 
  const isLoading=useSelector(state=>state.isloading)

  return (
    
      <HashRouter>
        <div>
       <NavBar />
       {isLoading && <IsLoading />}
      <Container> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<ProductsDetail />} />
        <Route path='/purchases' element={<Purchases />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      </Container>
      </div>
      </HashRouter>
    
  )
}

export default App
