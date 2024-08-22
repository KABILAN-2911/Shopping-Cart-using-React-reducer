import React, { useReducer, useState } from "react";
import ReactDOM from "react-dom";
import apple from "./assets/apple-256268_1280.jpg";
import banana from "./assets/bananas.jpg";
import grapes from "./assets/grapes.jpg";
import mango from "./assets/Mango.jpg";
import watermelon from "./assets/watermelon.jpg";
// import strawberry from "./assets/strawberry.jpg";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        totalQuantity: state.totalQuantity + 1,
        totalAmount: state.totalAmount + action.payload.price,
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
        totalQuantity: state.totalQuantity - 1,
        totalAmount: state.totalAmount - action.payload.price,
      };
      case "UPDATE_QUANTITY":
        const newQuantity = parseInt(action.payload.quantity); 
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.productId
              ? { ...item, quantity: newQuantity }
              : item
          ),
          totalQuantity: state.items.reduce((total, item) => total + item.quantity, 0),
          totalAmount: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
        };
    default:
      return state;
  }
}

const Shop = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleIncrement = (productId) => {
    dispatch({ type: "INCREMENT", payload: productId });
  };

  const handleDecrement = (productId) => {
    dispatch({ type: "DECREMENT", payload: productId });
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId,quantity } });
  };

  const products = [
    { id: "apple", name: "Apple", price: 100, image: apple },
    { id: "banana", name: "Banana", price: 80, image: banana },
    { id: "grapes", name: "Grapes", price: 120, image: grapes },
    { id: "mango", name: "Mango", price: 130, image: mango },
    { id: "watermelon", name: "Watermelon", price: 180, image: watermelon },
  ];

  return (
    <div>
      <div className="container ">
        <h1 className="text-center mt-5">Shopping chart</h1>

        <div className="row mt-5">
          {products.map((product) => (
            <div className="col" key={product.id}>
              <div class="card ">
                <img src={product.image} alt="" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title text-center">{product.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item text-center">
                    <button
                      className="btn btn-success"
                      onClick={() => handleIncrement(product.id)}
                    >
                      +
                    </button>
                    <input
                      type="text"
                      value={state.items.find((item) => item.id === product.id)?.quantity || 0}
                      className="w-25 mx-3 text-center"
                      readOnly
                    />
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDecrement(product.id)}
                    >
                      -
                    </button>
                  </li>
                  <li class="list-group-item">
                    <p className="fw-bold text-center">
                      Price:<span className="fw-normal">₹{product.price}</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5 ">
        <h3 className="">
          Total Quantity: <span className="text-success">{state.totalQuantity}</span>
        </h3>
        <h3>
          Total Amount: <span className="text-success">{state.totalAmount}</span>
        </h3>
      </div>
    </div>
  );
}

export default Shop;