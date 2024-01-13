import { Routes, Route } from 'react-router-dom';
import Marketplace from "./pages/Marketplace";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Signin from './pages/Signin';
import Checkout from './pages/Checkout';
import Purchased from './pages/Purchased';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

import { ProductsContextProvider } from './context/productsContext';
import { UserContextProvider } from './context/UserContext';

function App() {
  
  return (
    <ProductsContextProvider>
      <UserContextProvider>
        <div className=''>
          <header className='header'>
            <Navbar />
          </header>
          <div className='body-wrapper'>
            <Routes>
              <Route path='/' element={<Marketplace />} />
              <Route path='/register' element={<Register />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/purchased' element={<Purchased />} />
            </Routes>
          </div>
        </div>
      </UserContextProvider>
    </ProductsContextProvider>
  )
}

export default App
