import React from "react";
import { useAppDistpach, useAppSelector } from "../../hooks/hook";
import style from "./Fav.module.scss";
import { removeFav, addToCart } from "../../feature/cartSlices";

function Fav() {
  const cart = useAppSelector((state) => state.cart);

  const dispatch = useAppDistpach();
  const check = (id: number) => {
    const found = cart.cartItems.findIndex((item) => item.id === id);
    return found;
  };

  return (
    <div className={style.container}>
      {cart.favItems.length === 0 ? (
        <div>
          <p>Your Favorites is currently empty</p>
        </div>
      ) : (
        <div>
          <div className={style.produtcs}>
            {cart.favItems &&
              cart.favItems?.map((product) => (
                <div className={style.produtc} key={product.id}>
                  <div className={style.favContainer}>
                    {/* <span className={style.fav}>{product.rating}</span> */}
                  </div>
                  <img src={product.images[0]} alt={product.title} />

                  <div className={style.details}>
                    <span className={style.title}>{product.title}</span>
                  </div>
                  <div className={style.details}>
                    <span className={style.price}>${product.price}</span>
                  </div>
                  <div>
                    <button
                      className={style.FavButton}
                      onClick={() => dispatch(removeFav(product))}
                    >
                      Remove To Fav
                    </button>
                    {check(product.id) >= 0 ? null : (
                      <button
                        className={style.Addbutton}
                        onClick={() => dispatch(addToCart(product))}
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Fav;
