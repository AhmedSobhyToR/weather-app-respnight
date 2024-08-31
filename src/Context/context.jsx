import { React, createContext, useState } from 'react';
import Menu from '../components/Menu/menu';
import donuts_data from '../Donuts/donuts';
import Cart from '../components/Cart/cart';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
export const donutsData = createContext(null);
function createDefaultCart(){
    let cart = [];
    for(let i =0; i<donuts_data.length;i++){
      cart[i] = 0;
    }
    return cart;
  
  }

const Context = (props) => {
  const [items,setItems] = useState(donuts_data);
  const [cartItems, setCartItems] = useState(createDefaultCart());
  function addToCart(id){
      const selectedItemIdx = donuts_data.findIndex((i)=>i.id === id);
      const selectedItem = donuts_data[selectedItemIdx];
      cartItems[selectedItemIdx]++;
      setCartItems([...cartItems]);
      console.log(cartItems);

  }
  function removeFromCart(id){
    const selectedItemIdx = donuts_data.findIndex((i)=>i.id === id);
    if(cartItems[selectedItemIdx]> 0){
      cartItems[selectedItemIdx]--;
      setCartItems([...cartItems]);

    }
  
    
  }
  const contextValue = {items,cartItems,setCartItems,createDefaultCart, addToCart,removeFromCart}
  console.log(contextValue);
    return (
       <>
        <donutsData.Provider value={contextValue} >
        {props.children}
        </donutsData.Provider>
       </>
    );
}

export default Context;
