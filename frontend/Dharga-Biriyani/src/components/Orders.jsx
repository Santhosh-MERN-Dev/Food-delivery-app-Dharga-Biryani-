import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import { CgProfile } from "react-icons/cg";
import {
  FaShoppingBag,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaRupeeSign,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaLock,
  FaArrowRight,
  FaReceipt,
} from "react-icons/fa";
import API_URL from "../config/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: false });
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [orders]);

  const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/orders/${orderId}/cancel`,
        {
          method: "DELETE",
          headers: {
            authorization: token,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Order cancelled successfully");
        fetchOrders();
      } else {
        toast.error(data.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Pending":
        return {
          color: "pending",
          borderColor: "#ffc107",
          icon: <FaClock />,
          text: "Order is being prepared",
        };
      case "Cancelled":
        return {
          color: "cancelled",
          borderColor: "#dc3545",
          icon: <FaTimes />,
          text: "Order has been cancelled",
        };
      case "Delivered":
        return {
          color: "delivered",
          borderColor: "#28a745",
          icon: <FaCheckCircle />,
          text: "Order delivered successfully",
        };
      default:
        return {
          color: "default",
          borderColor: "#6c757d",
          icon: <FaShoppingBag />,
          text: "Order status unknown",
        };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="ord-page">
        <div className="ord-loading">
          <div className="ord-loading-spinner"></div>
          <h4>Loading your delicious orders...</h4>
          <p>Please wait while we fetch your order history</p>
        </div>
      </div>
    );
  }

  // No token
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="ord-page">
        <Toaster />
        <div className="ord-no-auth" data-aos="zoom-in">
          <FaLock className="ord-no-auth-icon" />
          <h2>Please Login to View Orders</h2>
          <p>Your order history is waiting for you</p>
          <button
            className="ord-gold-btn"
            onClick={() => navigate("/login")}
          >
            <FaLock /> Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ord-page">
      <Toaster position="bottom-center" reverseOrder={false} />

      {/* Decorative background */}
      <div className="ord-bg-deco">
        <span className="ord-deco-circle ord-deco-1"></span>
        <span className="ord-deco-circle ord-deco-2"></span>
      </div>

      {/* Header */}
      <div className="ord-header" data-aos="fade-down">
        <div className="ord-header-left">
          <FaReceipt className="ord-header-icon" />
          <div>
            <h2>My Orders</h2>
            <p className="ord-header-sub">
              {orders.length > 0
                ? `${orders.length} order${orders.length > 1 ? "s" : ""} placed`
                : "Track your delicious biryani orders"}
            </p>
          </div>
        </div>
        {orders.length > 0 && (
          <button
            className="ord-order-btn"
            onClick={() => navigate("/productMenu")}
          >
            Order More <FaArrowRight />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="ord-body">
        {orders.length === 0 ? (
          <div className="ord-empty" data-aos="fade-up">
            <div className="ord-empty-icon-wrap">
              <FaShoppingBag className="ord-empty-icon" />
            </div>
            <h3>No orders yet</h3>
            <p>Start your biryani journey by ordering from our menu!</p>
            <button
              className="ord-gold-btn"
              onClick={() => navigate("/productMenu")}
            >
              Browse Menu <FaArrowRight />
            </button>
          </div>
        ) : (
          <div className="ord-list">
            {orders.map((order, index) => {
              const statusConfig = getStatusConfig(order.status);
              return (
                <div
                  key={order._id}
                  className="ord-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  style={{
                    borderLeftColor: statusConfig.borderColor,
                  }}
                >
                  {/* Card Header */}
                  <div className="ord-card-header">
                    <div className="ord-card-header-left">
                      <div className="ord-id-block">
                        <span className="ord-id-label">ORDER</span>
                        <span className="ord-id-value">
                          #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <span
                        className={`ord-status ord-status-${statusConfig.color}`}
                      >
                        {statusConfig.icon}
                        {order.status}
                      </span>
                    </div>
                    {order.status === "Pending" && (
                      <button
                        className="ord-cancel-btn"
                        onClick={() => cancelOrder(order._id)}
                      >
                        <FaTimes /> Cancel
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="ord-card-body">
                    {/* Delivery Info */}
                    <div className="ord-info-section">
                      <div className="ord-info-title">
                        <FaMapMarkerAlt /> Delivery Details
                      </div>
                      <div className="ord-info-items">
                        <div className="ord-info-item">
                          <CgProfile className="ord-info-icon" />
                          <div>
                            <span className="ord-info-label">Name</span>
                            <span className="ord-info-value">{order.name}</span>
                          </div>
                        </div>
                        <div className="ord-info-item">
                          <FaMapMarkerAlt className="ord-info-icon" />
                          <div>
                            <span className="ord-info-label">Address</span>
                            <span className="ord-info-value">{order.address}</span>
                          </div>
                        </div>
                        <div className="ord-info-item">
                          <FaPhone className="ord-info-icon" />
                          <div>
                            <span className="ord-info-label">Phone</span>
                            <span className="ord-info-value">{order.mobileNumber}</span>
                          </div>
                        </div>
                        <div className="ord-info-item">
                          <FaCalendarAlt className="ord-info-icon" />
                          <div>
                            <span className="ord-info-label">Ordered on</span>
                            <span className="ord-info-value">
                              {new Date(order.createdAt).toLocaleString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="ord-info-section">
                      <div className="ord-info-title">
                        <FaShoppingBag /> Order Items
                      </div>
                      <div className="ord-products">
                        {order.products &&
                          order.products.map((item, idx) => (
                            <div
                              key={item.productId?._id || idx}
                              className="ord-product"
                            >
                              <div className="ord-product-img">
                                {item.productId?.image ? (
                                  <img
                                    src={`data:image/png;base64,${item.productId.image}`}
                                    alt={item.productId?.name || "Product"}
                                  />
                                ) : (
                                  <div className="ord-product-no-img">
                                    <FaShoppingBag />
                                  </div>
                                )}
                              </div>
                              <div className="ord-product-info">
                                <span className="ord-product-name">
                                  {item.productId?.name || "Product"}
                                </span>
                                <div className="ord-product-meta">
                                  <span className="ord-product-price">
                                    <FaRupeeSign />
                                    {item.productId?.price || "N/A"}
                                  </span>
                                  <span className="ord-product-qty">
                                    Qty: {item.qty}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Total */}
                      <div className="ord-total">
                        <span className="ord-total-label">Total Amount</span>
                        <span className="ord-total-amount">
                          <FaRupeeSign className="ord-rupee" />
                          {order.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Message */}
                  <div
                    className={`ord-status-msg ord-status-msg-${statusConfig.color}`}
                  >
                    {statusConfig.icon}
                    <span>{statusConfig.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
