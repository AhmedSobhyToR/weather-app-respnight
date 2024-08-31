import React from 'react';
import './Item.css'
const Item = (props) => {
    const Swal = require('sweetalert2');
    function handleAddToCart(){
        props.addToCart();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your order has been added to your cart",
            showConfirmButton: false,
            timer: 1000
          });
    }
    const item = props.item

    return (
       <>
       <ul>
                <li><img src={item.picture} alt="" /></li>
                <li>{item.title}</li>
                <li>{item.price}$</li>
                <li onClick={handleAddToCart}>+</li>
            </ul>
       </>
    );
}

export default Item;
