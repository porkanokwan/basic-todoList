import React from "react";

function Product(props) {
  const { id, name, price, img } = props.objItem;
    // console.log(props)
//   console.log(img);
    const handleClick = () => {
        props.onAdd(props.objItem)
    }
  return (
    <div>
      <img className="small" src={img} alt={name} />
      <h3>{name}</h3>
      <div>${price}</div>
      <div>
        <button onClick={handleClick}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;
