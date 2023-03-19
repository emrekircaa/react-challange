import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, addFav } from "../../feature/cartSlices";
import { useAppDistpach, useAppSelector } from "../../hooks/hook";
import style from "./Home.module.scss";
import SelectBox from "../../components/SelectBox";
import { ArrowDown } from "react-feather";

function Home() {
  const [selected, setSelected] = useState("Varsayilan");
  const [isActive, setActive] = useState(false);
  const options = ["Varsayılan", "Fiyat Artan", "Fiyat Azalan", "Puan"];
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDistpach();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState([]);
  const [search, setSearch] = useState("");

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
  const SortByValue = (data: any) => {
    const preventData = state;
    if (data === "Fiyat Artan") {
      let newValue = state.sort((a: any, b: any) => {
        if (a.price < b.price) {
          return -1;
        }
      });
      console.log(preventData);
      setState(newValue);
    }
    if (data === "Fiyat Azalan") {
      let newValue = state.sort((a: any, b: any) => {
        if (a.price > b.price) {
          return -1;
        }
      });
      console.log(newValue);
      setState(newValue);
    }
    if (data === "Puan") {
      let newValue = state.sort((a: any, b: any) => {
        if (a.rating > b.rating) {
          return -1;
        }
      });
      console.log(newValue);
      setState(newValue);
    }
  };
  return (
    <div>
      <div className={style.filterContainer}>
        <div className={style.dropdown}>
          <div
            className={style.dropdownButton}
            onClick={(e) => setActive(!isActive)}
          >
            {selected}
            <span>
              <ArrowDown size={16} />
            </span>
            {isActive && (
              <div className={style.dropdownContent}>
                {options.map((item, index: number) => (
                  <div
                    key={index.toString()}
                    onClick={(e) => {
                      setSelected(item);
                      setActive(false);
                      SortByValue(item);
                    }}
                    className={style.dropdownItem}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <input
            className={style.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className={style.container}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={style.produtcs}>
            {state &&
              state
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.title.toLowerCase().includes(search);
                })
                .map((product) => (
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
    </div>
  );
}

export default Home;
