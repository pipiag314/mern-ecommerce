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
import { UserContext } from './context/UserContext';

function App() {

  const user = {
    token: "",
    user_id: ""
  }
  
  return (
    <ProductsContextProvider>
      <div className=''>
        <UserContext.Provider value={user}>
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
        </UserContext.Provider>
      </div>
    </ProductsContextProvider>
  )
}

export default App
