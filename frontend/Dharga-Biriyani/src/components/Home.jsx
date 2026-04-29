import { PiBowlSteamFill } from "react-icons/pi";
import { IoRocket } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { GiKnifeFork, GiChefToque, GiChickenOven } from "react-icons/gi";
import { TiStarburst } from "react-icons/ti";
import { FaTruck, FaAward, FaClipboardList, FaSmileBeam } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const whyChooseUs = [
    {
      icon: <GiKnifeFork className="feature-icon" />,
      title: "Authentic Recipe",
      description:
        "Traditional biryani recipes passed down through generations",
      delay: 0,
    },
    {
      icon: <FaTruck className="feature-icon" />,
      title: "Fast Delivery",
      description: "Get your order delivered within 30 minutes guaranteed",
      delay: 200,
    },
    {
      icon: <TiStarburst className="feature-icon" />,
      title: "Fresh Ingredients",
      description: "Only the finest and freshest ingredients used every day",
      delay: 400,
    },
  ];



  const stats = [
    { value: "1000+", label: "Orders Delivered", icon: <FaTruck className="stat-icon" /> },
    { value: "50+", label: "Dish Varieties", icon: <GiChickenOven className="stat-icon" /> },
    { value: "4.8", label: "Customer Rating", icon: <FaAward className="stat-icon" /> },
    { value: "30", label: "Min Delivery", icon: <IoRocket className="stat-icon" /> },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-image d-flex align-items-center text-light">
        {/* Floating Particles */}
        <div className="hero-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>

        {/* Decorative spice dots */}
        <div className="hero-spice-deco">
          <span></span><span></span><span></span><span></span><span></span>
        </div>

        <div className="home-container">
          {/* Small tag above title */}
          <div className="hero-tag" data-aos="fade-down" data-aos-delay="0">
            <span className="hero-tag-dot"></span>
            <span>EST. 2020 &bull; AUTHENTIC BIRYANI</span>
          </div>

          <h1
            data-aos="fade-up"
            className="display-4 fw-bold hero-title floating-text"
            style={{ textShadow: "0px 2px 4px black" }}
          >
            Authentic Taste of{" "}
            <span
              className="text-warning gradient-text"
              style={{ textShadow: " 2px 4px black" }}
            >
              Dharga Biryani
            </span>
          </h1>

          {/* Decorative gold line under title */}
          <div className="hero-title-line" data-aos="fade-up" data-aos-delay="100"></div>

          <p
            className="lead hero-subtitle"
            data-aos="fade-up"
            data-aos-delay="200"
            style={{ textShadow: "0px 2px 4px black" }}
          >
            Splice Aroma & Tradition served on your plate!
          </p>

          {/* Typed-style sub-tagline */}
          <p
            className="hero-tagline"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="tagline-bracket">{`<`}</span>
            Fresh &bull; Flavorful &bull; Fast
            <span className="tagline-bracket">{`/>`}</span>
          </p>

          <Nav.Link
            as={Link}
            to="/productMenu"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <button className="order-btn mt-3">
              <div className="waviy">
                <span style={{ "--i": 1 }}>O</span>
                <span style={{ "--i": 2 }}>R</span>
                <span style={{ "--i": 3 }}>D</span>
                <span style={{ "--i": 4 }}>E</span>
                <span style={{ "--i": 5 }}>R</span>
                <span style={{ "--i": 6 }}>
                  <PiBowlSteamFill className="mb-1 fs-4" />
                </span>
                <span style={{ "--i": 7 }}>N</span>
                <span style={{ "--i": 8 }}>O</span>
                <span style={{ "--i": 9 }}>W</span>
              </div>
            </button>
          </Nav.Link>

          {/* Compact Call-to-Action Section */}
          <div
            className="cta-container"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="cta-grid">
              <div className="cta-item">
                <IoRocket className="cta-icon" />
                <div className="cta-content">
                  <span className="cta-label">Delivery</span>
                  <span className="cta-value">30 Min</span>
                </div>
              </div>
              <div className="cta-item">
                <BiSolidOffer className="cta-icon" />
                <div className="cta-content">
                  <span className="cta-label">First Order</span>
                  <span className="cta-value">20% OFF</span>
                </div>
              </div>
              <div className="cta-item">
                <FaAward className="cta-icon" />
                <div className="cta-content">
                  <span className="cta-label">Rating</span>
                  <span className="cta-value">4.9★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span>Scroll Down</span>
        </div>

        {/* Bottom gradient fade */}
        <div className="hero-bottom-fade"></div>
      </section>

      {/* Wavy Divider - Hero to Promo */}
      <div className="wavy-divider wavy-hero-to-promo">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C360,100 720,0 1080,60 C1260,80 1380,50 1440,40 L1440,100 L0,100 Z" fill="#1a1a1a" />
        </svg>
      </div>

      {/* Promo Offer Strip */}
      <section className="promo-strip">
        <div className="promo-track">
          <span className="promo-text">
            🔥 <strong>FLAT 20% OFF</strong> on your first order! Use code <strong>DHARGA20</strong> 🔥
            &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            🚚 <strong>FREE DELIVERY</strong> on orders above ₹500 &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            🍛 <strong>SPECIAL WEEKEND COMBO</strong> — Chicken Biryani + Raita at ₹299 only!
            &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            🔥 <strong>FLAT 20% OFF</strong> on your first order! Use code <strong>DHARGA20</strong> 🔥
            &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            🚚 <strong>FREE DELIVERY</strong> on orders above ₹500 &nbsp;&nbsp;&nbsp;✦&nbsp;&nbsp;&nbsp;
            🍛 <strong>SPECIAL WEEKEND COMBO</strong> — Chicken Biryani + Raita at ₹299 only!
          </span>
        </div>
      </section>

      {/* Today's Special Section */}
      <section className="todays-special">
        <div className="special-container">
          <div className="special-content" data-aos="fade-up">
            <div className="special-badge">
              <span className="badge-pulse"></span>
              <span className="badge-text">🔥 TODAY'S SPECIAL</span>
            </div>
            <div className="special-card">
              <div className="special-image">
                <img src="./src/assets//img/mutton-biryani-in-pressure-cooker-easy-tasty-mutton-biryani-recipe-mutton-biryani.jpg" alt="Special Mutton Biryani" />
                <div className="special-overlay">
                  <span className="limited-tag">⏳ Limited Time</span>
                </div>
              </div>
              <div className="special-info">
                <h3 className="special-dish-name">Mutton Biryani Special</h3>
                <p className="special-description">
                  Slow-cooked succulent mutton, layered with fragrant basmati rice, 
                  saffron, and secret spices — crafted with love by our master chef.
                </p>
                <div className="special-pricing">
                  <span className="special-original">₹350</span>
                  <span className="special-price">₹249</span>
                  <span className="special-save">Save ₹101!</span>
                </div>
                <Nav.Link as={Link} to="/productMenu">
                  <button className="special-order-btn">
                    Order Now <PiBowlSteamFill className="btn-icon" />
                  </button>
                </Nav.Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wavy Divider - Special to Why Choose Us */}
      <div className="wavy-divider wavy-special-to-why">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,20 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="#1a1a1a" />
        </svg>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="why-section-container">
          <div className="why-header" data-aos="fade-up">
            <h2 className="why-title">Why Choose Us?</h2>
            <p className="why-subtitle">
              Experience the finest biryani with unmatched quality and service
            </p>
            <div className="title-line"></div>
          </div>

          <div className="features-grid">
            {whyChooseUs.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
                data-aos="fade-up"
                data-aos-delay={feature.delay}
              >
                <div className="feature-card-inner">
                  <div className="feature-icon-wrapper">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card"
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="stat-icon-circle">{stat.icon}</div>
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wavy Divider - Stats to Popular Dishes */}
      <div className="wavy-divider wavy-dark-to-light">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,60 C360,0 720,80 1080,20 C1260,0 1380,40 1440,60 L1440,80 L0,80 Z" fill="#fff8e1" />
        </svg>
      </div>

      {/* Popular Dishes Section */}
      <section className="popular-dishes">
        <div className="popular-container">
          <div className="popular-header" data-aos="fade-up">
            <h2 className="popular-title">Our Popular Dishes</h2>
            <p className="popular-subtitle">
              Discover the flavors that keep our customers coming back
            </p>
            <div className="title-line"></div>
          </div>

          <div className="dishes-grid">
            <div className="dish-card" data-aos="fade-up" data-aos-delay="0">
              <div className="dish-image">
                <img
                  src="./src/assets/img/7310050-biryani-picture.jpg"
                  alt="Chicken Biryani"
                />
                <div className="dish-badge">⭐ Bestseller</div>
              </div>
              <div className="dish-content">
                <h3>Chicken Biryani</h3>
                <p>Tender chicken with aromatic spices and basmati rice</p>
                <div className="dish-footer">
                  <span className="dish-price">₹250</span>
                  <Nav.Link as={Link} to="/productMenu">
                    <button className="dish-add-btn">Order</button>
                  </Nav.Link>
                </div>
              </div>
            </div>

            <div className="dish-card" data-aos="fade-up" data-aos-delay="200">
              <div className="dish-image">
                <img
                  src="./src/assets/img/7311481-mutton-biryani-in-pressure-cooker-steffis-recipes.jpg"
                  alt="Mutton Biryani"
                />
                <div className="dish-badge chef-badge">👨‍🍳 Chef's Pick</div>
              </div>
              <div className="dish-content">
                <h3>Mutton Biryani</h3>
                <p>Succulent mutton cooked to perfection with rich flavors</p>
                <div className="dish-footer">
                  <span className="dish-price">₹300</span>
                  <Nav.Link as={Link} to="/productMenu">
                    <button className="dish-add-btn">Order</button>
                  </Nav.Link>
                </div>
              </div>
            </div>

            <div className="dish-card" data-aos="fade-up" data-aos-delay="400">
              <div className="dish-image">
                <img src="./src/assets/img/A plate of vegetarian biryani, bursting with flavor and color.jpg" alt="Veg Biryani" />
                <div className="dish-badge veg-badge">🌿 Veg</div>
              </div>
              <div className="dish-content">
                <h3>Paneer Rice</h3>
                <p>Fresh vegetables with authentic spices and rice</p>
                <div className="dish-footer">
                  <span className="dish-price">₹200</span>
                  <Nav.Link as={Link} to="/productMenu">
                    <button className="dish-add-btn">Order</button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>

          <div className="view-more" data-aos="fade-up" data-aos-delay="600">
            <Nav.Link as={Link} to="/productMenu">
              <button className="view-more-btn">View All Dishes</button>
            </Nav.Link>
          </div>
        </div>
      </section>

      <div className="bg-black">
        <br />
      </div>
    </>
  );
};

export default Home;
