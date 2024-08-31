import React, { useContext, useState } from 'react';
import './menu.css'
import Item from '../Item/Item';
import {v4 as uuid} from "uuid"
import { donutsData } from "../../Context/context";
import { Link } from 'react-router-dom';
const Menu = () => {
    const {items,cartItems,addToCart} = useContext(donutsData);
    console.log(cartItems);
    return (
        <>
        <div className='menu'>
        <div className='menu-back'>
            <h1>Menu</h1>
            <ul>
                <li>Product</li>
                <li>Name</li>
                <li>Price</li>
                <li>Add</li>
            </ul>
            <div className='menu-items'>
            {
                items.map((item)=>{
                  return ( <Item key={uuid()} item={item} addToCart = {()=> addToCart(item.id)} ></Item>)
                })
            
            }
            

        
            </div>
           <div className='check-out'>
         <Link to="/cart"><input type="button" value="Check Out" /></Link> 
           </div>
           
        </div>
        </div>

        </>
    );
}

export default Menu;
