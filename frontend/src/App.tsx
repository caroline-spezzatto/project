import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Router } from './router'
import { GlobalStyle } from './styles'

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
