import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Weathercard from './Components/WeatherCard/Weathercard';
function App() {

  return (
    <>
        <BrowserRouter basename="/weather-app-respnight">
        <Routes>
          <Route path='/' element={<Weathercard></Weathercard>} ></Route>

        </Routes>
       
        </BrowserRouter>
    </>
  );
}

export default App;
