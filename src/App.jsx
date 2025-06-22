import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import Commande from './pages/Commande/Commande'
import Recap from './pages/Recap/Recap'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/details/:name' element={<Details/>}/>
          <Route path='/confirmation' element={<Commande/>}/>
          <Route path='/recapitulatif' element={<Recap/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
