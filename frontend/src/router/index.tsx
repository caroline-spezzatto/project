import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { Home } from '../pages/Home'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
