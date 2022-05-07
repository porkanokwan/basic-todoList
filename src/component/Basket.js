import React from "react";

function Basket(props) {
    const {cartItem, onAdd, delItem, onRemove} = props;
    let itemPrice = cartItem.reduce( (accumulator, current) => accumulator+ current.price * current.qty,0)
    const shipping = itemPrice > 2000 ? 0 : itemPrice * 0.02;
    // let itemPrice = 0;
    // cartItem.forEach( (item, index, arr) => itemPrice += arr[index].price * arr[index].qty);
    const tax = itemPrice * 0.1;
    // const shipping = itemPrice * 0.02;
    // console.log(itemPrice + tax + shipping)
    console.log(itemPrice)
  return (
    <div className="col-1 block">
      <h2>Cart Items</h2>
      <div>
        {/* {cartItem.length === 0 ? <div>Cart empty</div> : cartItem.map(item => <><div key={item.id} className="row">
            <div>{item.name}</div>
            <div>
                <button className="add" onClick={() => onAdd(item)}>+</button>
                <button className="remove" onClick={() => delItem(item)}>-</button>
            </div>
            <div className="col-2 text-right">{`${item.qty} x ${item.price.toFixed(2)}`}</div>
        </div></>)} */}
        {/* อีกวิธี */}
        <div>{cartItem.length === 0 && <div>Cart empty</div>}</div>
        { cartItem.map( item => 
        <div key={item.id} className="row">
            <div>{item.name}</div>
            <div>
                <button className="add" onClick={() => onAdd(item)}>+</button>
                {/* <button className="remove" onClick={() => delItem(item) } >-</button> */}
                <button className="remove" onClick={() => onRemove(item) } >-</button>
            </div>
            <div className="col-2 text-right">{item.qty} x ${item.price.toFixed(2)}</div>
        </div> ) }
      </div>
      <hr />
      <div className="row">
        <div className="col-2">Item price</div>
        <div className="col-1 text-right">${ itemPrice }</div>
      </div>
      <div className="row">
        <div className="col-2">Tax</div>
        <div className="col-1 text-right">${tax}</div>
      </div>
      <div className="row">
        <div className="col-2">Shipping</div>
        <div className="col-1 text-right">${shipping}</div>
      </div>
      <div className="row">
        <div className="col-2">Total</div>
        <div className="col-1 text-right">${(itemPrice * 1) + tax + shipping}</div>
      </div>
    </div>
  );
}

export default Basket;
