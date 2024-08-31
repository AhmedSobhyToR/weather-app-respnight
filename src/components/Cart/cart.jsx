import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { donutsData } from "../../Context/context";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Cart = () => {
    const Swal = require('sweetalert2');
    const { items, cartItems, setCartItems,createDefaultCart, addToCart, removeFromCart } =useContext(donutsData);
    const [TotalPay, setTotalPay] = useState(0);
    let emptyCart = createDefaultCart();
    useEffect(()=>{
        let total = 0;
      items.map((item)=>{
        if(cartItems[item.id]> 0){
            total+= parseInt(cartItems[item.id]*item.price);
        }
      })
      setTotalPay(total)
    },[items,cartItems])
    function handlePayClick(){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure you want to proceed?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Confirm!",
            cancelButtonText: "No, Cancel!",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed && TotalPay> 0) {
              swalWithBootstrapButtons.fire({
                title: "Payment Confirmed!",
                text: `You have payed ${TotalPay}$`,
                icon: "success"
              });
              setCartItems(emptyCart);
            }
            else if(result.isConfirmed && TotalPay=== 0){
                swalWithBootstrapButtons.fire({
                    title: "Your Cart is Empty!",
                    icon: "info"
                  });
            }
             else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your payment has been cancelled!",
                icon: "error"
              });
            }
          });
    }

    return (
        <div className="cart">
            <div className="cart-header">
                <h1>Cart</h1>
                <ul>
                    <li>Product</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Count</li>
                    <li>Total Price</li>
                    <li>Add</li>
                    <li>Remove</li>
                </ul>
                <div className="cart-items">
                    {items.map((item) => {
                        if (cartItems[item.id] > 0) {
                            return (
                                <ul key={uuid()}>
                                    <li>
                                        <img src={item.picture} alt="" />{" "}
                                    </li>
                                    <li>{item.title}</li>
                                    <li>{item.price}$</li>
                                    <li>{cartItems[item.id]}</li>
                                    <li>{cartItems[item.id] * item.price}$</li>
                                    <li
                                        style={{ cursor: "pointer" }}
                                        onClick={() => addToCart(item.id)}
                                    >
                                        +
                                    </li>
                                    <li
                                        style={{ cursor: "pointer" }}
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        x
                                    </li>
                                </ul>
                               
                            );
                         
                        }
                        
                    })}
                </div>
                <div>
                    <h2>Your Total Payment is: {TotalPay}$</h2>
                </div>
                <div className="cart-btns">
                    <input type="button" value="Pay" onClick={handlePayClick} />
                    <Link to="/menu"><input type="button" value="Back To Menu" /></Link> 
                </div>
            </div>
        </div>
    );
};

export default Cart;
