import { useState } from "react";
import "./App.css";
import Header from "./component/Header";
import Main from "./component/Main";
import Basket from "./component/Basket";
import products from "./data/data";

function App() {
  const [cartItem, setCartItem] = useState([]);

  const onAdd = (product) => {
    const newCart = [...cartItem]
    const idx = cartItem.findIndex(item => item.id === product.id);
    if(idx != -1) {
      newCart[idx] = { ...newCart[idx], qty : newCart[idx].qty + 1 };
    } else {
      newCart.push({...product, qty : 1});
      }
    // console.log(newCart)
    setCartItem(newCart);
  };

  const delItem = products => {
    const delCart = [...cartItem];
    const idx = cartItem.findIndex(item => item.id === products.id);
    if(idx !== -1) {
      delCart[idx] = {...delCart[idx], qty : delCart[idx].qty - 1};
    }
    if(delCart[idx].qty === 0){
      delCart.splice(idx, 1)
    }
    console.log(delCart);
    setCartItem(delCart);
  }

  // อีกวิธี
  const onRemove = product => {
    // const exist = cartItem.find(x => x.id === product.id);
    const exist = {...product};
    console.log(exist); // ให้ค่า obj ที่มี x.id === product.id เช่น id = 3 จะได้ {id: 3, name: 'Shoes', price: 1000, img: 'http://picsum.photos/id/21/800', qty: 1}
    if(exist.qty === 1) {
      // ถ้าจะไม่ clone แล้ว setState ใหม่เลยต้องใช้คู่กับ method filter/map เพราะ มันจะสร้าง array ใหม่ โดยไม่เกี่ยวข้องกับ array เก่า 
      setCartItem(cartItem.filter(x => x.id != product.id));
      // cartItem จะเท่ากับทุกตัวยกเว้นตัวที่ id == product.id
    }else {
      setCartItem( cartItem.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1} : x ) )
    }
  }

  return (
    <div className="App">
      <Header cartItem={cartItem}/>
      <div className="row">
        <Main products={products} onAdd={onAdd} />
        <Basket cartItem={cartItem} onAdd={onAdd} delItem={delItem} onRemove={onRemove}/>
      </div>
    </div>
  );
}

export default App;
