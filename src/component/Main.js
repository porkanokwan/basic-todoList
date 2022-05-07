import React from "react";
import Product from "./Product";

function Main(props) {
  const { products, onAdd } = props;
  return (
    <div className="col-2 block">
      <h2>Product</h2>
      <div className="row">
        {products.map((product) => (
          <Product key={product.id} objItem={product} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

export default Main;
