import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, addFav } from "../../feature/cartSlices";
import { useAppDistpach, useAppSelector } from "../../hooks/hook";
import style from "./Home.module.scss";

function Home() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDistpach();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const check = (id: number) => {
    const found = cart.favItems.findIndex((item) => item.id === id);
    return found;
  };
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then(function (response) {
        // handle success
        setState(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }, [cart]);

  return (
    <div className={style.container}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={style.produtcs}>
          {state &&
            state?.map((product) => (
              <div className={style.produtc} key={product.id}>
                <div className={style.favContainer}>
                  <span className={style.fav}>{product.rating}</span>
                </div>
                <img src={product.images[0]} alt={product.name} />

                <div className={style.details}>
                  <span className={style.title}>{product.title}</span>
                </div>
                <div className={style.details}>
                  <span className={style.price}>${product.price}</span>
                </div>
                <div>
                  {check(product.id) >= 0 ? null : (
                    <button
                      className={style.FavButton}
                      onClick={() => dispatch(addFav(product))}
                    >
                      Add To Fav
                    </button>
                  )}

                  <button
                    className={style.Addbutton}
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Home;
