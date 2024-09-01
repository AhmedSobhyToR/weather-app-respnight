import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
function App() {

  return (
    <>
        <BrowserRouter basename="/weather-app">
        <Routes>
          <Route path='/' element={<Home></Home>} ></Route>
        </Routes>
       
        </BrowserRouter>
    </>
  );
}

export default App;
