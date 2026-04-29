import { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrashAlt,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { setCartCount } = useCart();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const getCart = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        headers: { authorization: token },
      });
      const data = await res.json();
      const items = Array.isArray(data) ? data : data.products || [];
      setCart(items);
      setCartCount(items.length);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart([]);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      getCart();
    })();
  }, [getCart]);

  useEffect(() => {
    AOS.refresh();
  }, [cart]);

  const updateQty = async (productId, type) => {
    const t = localStorage.getItem("token");
    await fetch("http://localhost:3000/cart/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json", authorization: t },
      body: JSON.stringify({ productId, type }),
    });
    getCart();
  };

  const removeItem = async (id) => {
    const t = localStorage.getItem("token");
    await fetch(`http://localhost:3000/cart/remove/${id}`, {
      method: "DELETE",
      headers: { authorization: t },
    });
    toast.success("Item removed from cart");
    getCart();
  };

  const total = cart.reduce(
    (acc, item) => acc + item.productId.price * item.qty,
    0
  );

  // Loading state
  if (loading) {
    return (
      <div className="cart-page">
        <div className="page-loading">
          <div className="page-loading-spinner"></div>
          <h4>Loading your cart...</h4>
          <p>Fetching your delicious items</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!token) {
    return (
      <div className="cart-page">
        <Toaster />
        <div className="cart-no-auth" data-aos="zoom-in">
          <FaLock className="cart-no-auth-icon" />
          <h2>Please Login to View your Cart</h2>
          <p>Your items are waiting for you</p>
          <button
            className="cart-gold-btn"
            onClick={() => navigate("/login")}
          >
            <FaLock /> Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Decorative background */}
      <div className="cart-bg-deco">
        <span className="cart-deco-circle cart-deco-1"></span>
        <span className="cart-deco-circle cart-deco-2"></span>
      </div>

      {/* Header */}
      <div className="cart-header" data-aos="fade-down">
        <div className="cart-header-left">
          <FaShoppingCart className="cart-header-icon" />
          <h2>My Cart</h2>
          {cart.length > 0 && (
            <span className="cart-badge">{cart.length}</span>
          )}
        </div>
        {cart.length > 0 && (
          <span className="cart-header-sub">
            {cart.length} item{cart.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Cart Body */}
      <div className="cart-body">
        {cart.length === 0 ? (
          <div className="cart-empty" data-aos="fade-up">
            <div className="cart-empty-icon-wrap">
              <FaShoppingCart className="cart-empty-icon" />
            </div>
            <h3>Your cart is empty</h3>
            <p>Add some delicious biryani to get started</p>
            <button
              className="cart-gold-btn"
              onClick={() => navigate("/productMenu")}
            >
              Browse Menu <FaArrowRight />
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {cart.map((item, index) => {
              const product = item.productId || {};
              return (
                <div
                  key={product._id || index}
                  className="cart-item"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <div className="cart-item-img">
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.name || "Food"}
                    />
                  </div>

                  <div className="cart-item-info">
                    <p className="cart-item-name">
                      {product.name || "Unknown product"}
                    </p>
                    <p className="cart-item-price">₹{product.price}</p>
                    <p className="cart-item-sub">
                      Subtotal: ₹{(product.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="cart-item-controls">
                    <div className="cart-qty">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQty(product._id, "dec")}
                        disabled={item.qty === 1}
                      >
                        <FaMinus />
                      </button>
                      <span className="cart-qty-num">{item.qty}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateQty(product._id, "inc")}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(product._id)}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer / Summary */}
      {cart.length > 0 && (
        <div className="cart-footer" data-aos="fade-up">
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Total Amount</span>
              <span className="cart-summary-amount">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="cart-summary-divider"></div>
            <button
              className="cart-checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              PLACE ORDER <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
