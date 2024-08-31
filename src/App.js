import './App.css';
import Menu from './components/Menu/menu';
import Cart from './components/Cart/cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path='/menu' element={<Menu></Menu>} ></Route>
          <Route path='/cart' element={<Cart></Cart>} /> 
  
        </Routes>
       
        </BrowserRouter>
    </>
  );
}

export default App;
