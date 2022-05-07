import React from "react";

function Header(props) {
  const {cartItem} = props;
  return (
    <header className="row block center">
      <div>
        <a href="#" />
        <h1>CC11 Shop</h1>
      </div>
      <div>
        <a href="#" />
        <h3>
          Cart <button>{cartItem.length}</button>
        </h3>
      </div>
    </header>
  );
}

export default Header;
