import React, { useEffect } from "react";
import { useAppDistpach, useAppSelector } from "../../hooks/hook";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
  addFav,
} from "../../feature/cartSlices";
import style from "./Box.module.scss";
import { Trash } from "react-feather";
import Swal, { SweetAlertOptions } from "sweetalert2";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  cartQuantity: number;
}

function Box() {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDistpach();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product: Product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product: Product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleAddFav = (product: Product) => {
    dispatch(addFav(product));
    dispatch(removeFromCart(product));
  };

  return (
    <div className={style.cartContainer}>
      {cart?.cartItems?.length === 0 ? (
        <div className={style.loading}>
          <p>Your cart is currently empty</p>
        </div>
      ) : (
        <div>
          <div className={style.titles}>
            <h3 className={style.productTitle}>Product</h3>
            <h3 className={style.price}>Price</h3>
            <h3 className={style.quantity}>Quantity</h3>
            <h3 className={style.total}>Total</h3>
          </div>
          <div className={style.cartItems}>
            {cart?.cartItems &&
              cart?.cartItems?.map((cartItem: Product) => (
                <div className={style.cartItem} key={cartItem.id}>
                  <div className={style.cartProduct}>
                    <div className={style.imgContainer}>
                      <img
                        src={cartItem?.images && cartItem?.images[0]}
                        alt={cartItem.title}
                      />
                    </div>
                    <div>
                      <h3>{cartItem.title}</h3>
                      <p>{cartItem.description}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={style.cartProductPrice}>
                    ${cartItem.price}
                  </div>
                  <div className={style.cartProductQuantity}>
                    {cartItem.cartQuantity === 1 ? (
                      <button
                        onClick={() => {
                          Swal.fire({
                            showCancelButton: true,
                            showCloseButton: true,
                            closeOnClickOutside: false,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            text: "Would you like to add to favourites?",
                            confirmButtonText: "Add to Favorites and Delete",
                            cancelButtonText: "Delete Product",
                          } as SweetAlertOptions).then(function (result: any) {
                            if (result.isConfirmed) {
                              handleAddFav(cartItem);
                            } else if (
                              result.isDismissed &&
                              result?.dismiss === "cancel"
                            ) {
                              handleDecreaseCart(cartItem);
                            }
                          });
                        }}
                      >
                        <Trash
                          color="red"
                          size={20}
                          style={{ padding: "0px" }}
                        />
                      </button>
                    ) : (
                      <button onClick={() => handleDecreaseCart(cartItem)}>
                        -
                      </button>
                    )}
                    <div className={style.count}>{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className={style.cartProductTotalPrice}>
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
          </div>
          <div className={style.cartSummary}>
            <button
              className={style.clearBtn}
              onClick={() => {
                Swal.fire({
                  showCancelButton: true,
                  showCloseButton: true,
                  closeOnClickOutside: false,
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  text: "Do you want to delete the whole cart?",
                  confirmButtonText: "Yes",
                  cancelButtonText: "No",
                } as SweetAlertOptions).then(function (result: any) {
                  if (result.isConfirmed) {
                    handleClearCart();
                  } else if (
                    result.isDismissed &&
                    result.dismiss === "cancel"
                  ) {
                  }
                });
              }}
            >
              Clear Cart
            </button>
            <div className={style.cartCheckout}>
              <div className={style.subtotal}>
                <span>Subtotal</span>
                <span className={style.amount}>${cart.cartTotalAmount}</span>
              </div>
              {/* <button>Check out</button> */}
              <div className={style.continueShopping}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Box;
