import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import {
  FaCreditCard,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaShoppingBag,
  FaLock,
  FaArrowRight,
  FaTruck,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const Checkout = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const productId = searchParams.get("productId");

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${productId}`);
        if (!res.ok) {
          throw new Error("Product not found");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    AOS.refresh();
  }, [product]);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login before placing an order.");
      navigate("/login");
      return;
    }

    if (!address.trim() || !mobileNumber.trim()) {
      toast.error("Please enter your address and mobile number.");
      return;
    }

    setIsLoading(true);
    try {
      const body = { name, address, mobileNumber };
      if (productId) {
        body.productId = productId;
      }

      const res = await fetch("http://localhost:3000/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      toast.success(data.message);
      if (res.ok) {
        navigate("/orders");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state for product fetch (Buy Now checkout)
  if (productId && pageLoading) {
    return (
      <div className="checkout-page">
        <div className="page-loading">
          <div className="page-loading-spinner"></div>
          <h4>Loading checkout...</h4>
          <p>Preparing your order details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Decorative background */}
      <div className="checkout-bg-deco">
        <span className="checkout-deco-circle checkout-deco-1"></span>
        <span className="checkout-deco-circle checkout-deco-2"></span>
      </div>

      {/* Header */}
      <div className="checkout-header" data-aos="fade-down">
        <div className="checkout-header-left">
          <FaCreditCard className="checkout-header-icon" />
          <h2>{productId ? "Buy Now Checkout" : "Checkout"}</h2>
        </div>
        <div className="checkout-header-right">
          <FaLock className="checkout-lock-icon" />
          <span>Secure Checkout</span>
        </div>
      </div>

      <div className="checkout-body">
        <div className="checkout-layout">
          {/* Left: Form */}
          <div className="checkout-form-section" data-aos="fade-up">
            <div className="checkout-section-title">
              <FaMapMarkerAlt />
              <span>Delivery Details</span>
            </div>

            <div className="checkout-card">
              {/* Name */}
              <div className="checkout-field">
                <label className="checkout-label">
                  <FaUser className="checkout-label-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="checkout-field">
                <label className="checkout-label">
                  <FaMapMarkerAlt className="checkout-label-icon" />
                  Delivery Address
                </label>
                <textarea
                  className="checkout-input checkout-textarea"
                  placeholder="Enter Your Full Address"
                  value={address}
                  rows={3}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              {/* Mobile */}
              <div className="checkout-field">
                <label className="checkout-label">
                  <FaPhoneAlt className="checkout-label-icon" />
                  Mobile Number
                </label>
                <input
                  type="tel"
                  className="checkout-input"
                  placeholder="Enter Your Mobile Number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Trust badges */}
            <div className="checkout-trust-badges" data-aos="fade-up" data-aos-delay="200">
              <div className="checkout-trust-item">
                <FaShieldAlt />
                <span>Secure Payment</span>
              </div>
              <div className="checkout-trust-item">
                <FaTruck />
                <span>Fast Delivery</span>
              </div>
              <div className="checkout-trust-item">
                <FaClock />
                <span>30 Min Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="checkout-summary-section" data-aos="fade-up" data-aos-delay="150">
            <div className="checkout-section-title">
              <FaShoppingBag />
              <span>Order Summary</span>
            </div>

            <div className="checkout-summary-card">
              {productId && product ? (
                <div className="checkout-product-item">
                  <div className="checkout-product-img">
                    <img
                      src={`data:image/png;base64,${product.image}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="checkout-product-info">
                    <p className="checkout-product-name">{product.name}</p>
                    <p className="checkout-product-qty">Qty: 1</p>
                  </div>
                  <span className="checkout-product-price">₹{product.price}</span>
                </div>
              ) : (
                <div className="checkout-cart-summary">
                  <FaShoppingBag className="checkout-cart-icon" />
                  <p>Cart checkout — your items will be included in this order</p>
                </div>
              )}

              <div className="checkout-divider"></div>

              <div className="checkout-total-row">
                <span className="checkout-total-label">Total Amount</span>
                <span className="checkout-total-amount">
                  {productId && product ? `₹${product.price}` : "Cart Total"}
                </span>
              </div>

              <button
                className="checkout-place-btn"
                onClick={placeOrder}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="checkout-spinner"></span>
                    Placing Order...
                  </>
                ) : (
                  <>
                    PLACE ORDER <FaArrowRight />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
