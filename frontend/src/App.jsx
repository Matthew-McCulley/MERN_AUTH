import Header from "./components/Header"
import {Container} from 'react-bootstrap'
import {Outlet} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return(
    <>
      <Header/>
      <ToastContainer/>
      <Container className='my-2 py-5 d-flex justify-content-center w-75'>
        <Outlet/>
      </Container>
    </>
  )
}
export default App
