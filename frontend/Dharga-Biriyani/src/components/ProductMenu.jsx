import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FourSquare } from "react-loading-indicators";
import toast, { Toaster } from "react-hot-toast";
import AOS from "aos";
import { FiSearch } from "react-icons/fi";
import { GiChickenLeg, GiCookingPot } from "react-icons/gi";
import { FaLeaf, FaDrumstickBite, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;

const ProductMenu = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();
  const { fetchCartCount } = useCart();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/products`, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch products");
        }
      })
      .then((data) => {
        setProducts(data);
        AOS.refresh();
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    try {
      const res = await fetch(
        `${API_URL}/products/search?q=${value}`,
      );
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log("Error:", err);
      setSearch("Product Not Found");
    }
  };

  const buyNow = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to buy now.");
      navigate("/login");
      return;
    }
    navigate(`/checkout?productId=${productId}`);
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first to add to cart.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success("Added to Cart🛒");
      fetchCartCount();
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const getDiscountPercent = (actualPrice, price) => {
    if (!actualPrice || !price || actualPrice <= price) return 0;
    return Math.round(((actualPrice - price) / actualPrice) * 100);
  };

  const filteredProducts = products.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "veg") return item.name && item.name.toLowerCase().includes("veg");
    return activeFilter === "nonveg" ? (item.name && !item.name.toLowerCase().includes("veg")) : true;
  });

  if (isLoading) {
    return (
      <div className="menu-loading-container">
        <div className="menu-loading-content">
          <GiCookingPot className="menu-loading-icon" />
          <FourSquare
            color="#ffd700"
            size="medium"
            text="Loading Menu..."
            textColor="#ffd700"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <Toaster />

      {/* Menu Header */}
      <section className="menu-header">
        <div className="menu-header-content" data-aos="fade-down">
          <h2 className="menu-title">Our Menu</h2>
          <p className="menu-subtitle">Explore our authentic biryani collection</p>
          <div className="menu-title-line"></div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="menu-controls" data-aos="fade-up" data-aos-delay="200">
        <div className="menu-controls-inner">
          {/* Search Bar */}
          <div className="menu-search-wrapper">
            <FiSearch className="menu-search-icon" />
            <input
              type="text"
              placeholder="Search biryani, dishes..."
              value={search}
              onChange={handleSearch}
              className="menu-search-input"
            />
          </div>

          {/* Filter Tabs */}
          <div className="menu-filter-tabs">
            <button
              className={`menu-filter-btn ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              <GiCookingPot className="filter-icon" /> All
            </button>
            <button
              className={`menu-filter-btn ${activeFilter === "veg" ? "active" : ""}`}
              onClick={() => setActiveFilter("veg")}
            >
              <FaLeaf className="filter-icon" /> Veg
            </button>
            <button
              className={`menu-filter-btn ${activeFilter === "nonveg" ? "active" : ""}`}
              onClick={() => setActiveFilter("nonveg")}
            >
              <FaDrumstickBite className="filter-icon" /> Non-Veg
            </button>
          </div>
        </div>
      </section>

      {/* Error & Empty States */}
      {error && (
        <div className="menu-error" data-aos="fade-up">
          <p>⚠️ {error}</p>
        </div>
      )}

      {filteredProducts.length === 0 && !isLoading && (
        <div className="menu-empty" data-aos="fade-up">
          <GiChickenLeg className="menu-empty-icon" />
          <p>No dishes found. Try a different search!</p>
        </div>
      )}

      {/* Product Grid */}
      <section className="products-menu">
        {filteredProducts.map((item, index) => {
          const discount = getDiscountPercent(item.actualPrice, item.price);
          return (
            <div
              key={item._id || index}
              className="menu-card-wrapper"
              data-aos="zoom-in"
              data-aos-delay={(index % 4) * 100}
            >
              <div className="card">
                {/* Image with overlay badges */}
                <div className="menu-card-image">
                  <img
                    src={`data:image/png;base64, ${item.image}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  {discount > 0 && (
                    <span className="menu-card-discount">{discount}% OFF</span>
                  )}
                  {item.name && item.name.toLowerCase().includes("veg") ? (
                    <span className="menu-card-type veg-type">🌿 Veg</span>
                  ) : (
                    <span className="menu-card-type nonveg-type">🍗 Non-Veg</span>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.description}</p>

                  {/* Pricing */}
                  <div className="menu-card-pricing">
                    <span className="menu-card-original">₹{item.actualPrice}</span>
                    <span className="menu-card-price">₹{item.price}</span>
                    {discount > 0 && (
                      <span className="menu-card-save">Save ₹{item.actualPrice - item.price}</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="menu-card-actions">
                    <button
                      className="btn btn-warning menu-buy-btn"
                      onClick={() => buyNow(item._id)}
                    >
                      <FaBolt className="btn-icon" /> Buy Now
                    </button>
                    <button
                      className="btn btn-primary menu-cart-btn"
                      onClick={() => addToCart(item._id)}
                    >
                      <FaShoppingCart className="btn-icon" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default ProductMenu;
