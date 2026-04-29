import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdRestaurantMenu } from "react-icons/md";
import { MdCreateNewFolder } from "react-icons/md";
import { ImCart } from "react-icons/im";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import { BsBagHeartFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { useCart } from "../context/CartContext";

const NavBar = () => {
  const location = useLocation();
  const { cartCount } = useCart();
  const navRef = useRef(null);

  const [role, setRole] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll shrink effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      (async () => {
        setRole(decoded.role);
      })();
    }
  }, []);

  const isActive = (path) =>
    location.pathname === path ? "nav-link1 active-link" : "nav-link1";

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar navbar-expand-lg sticky-top navbar-animated${scrolled ? " navbar-scrolled" : ""}`}
      >
        <div className="navbar-container container-fluid d-flex">
          {/* Brand */}
          <div className="nav-brand d-flex align-items-center gap-1">
            <Nav.Link as={Link} to="/">
              <img
                src="./src/assets/img/moon_740878.png"
                alt="Moon"
                width={50}
                className="moon-logo"
              />
            </Nav.Link>
            <Nav.Link as={Link} to="/" style={{ textDecoration: "none" }}>
              <div className="shine mb-2">DhargaBiriyani</div>
            </Nav.Link>
          </div>

          {/* Hamburger */}
          <label
            className="hamburger navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <input type="checkbox" />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              />
              <path className="line" d="M7 16 27 16" />
            </svg>
          </label>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Nav
              className="ms-auto d-flex flex-row gap-1 align-items-center my-2 my-lg-0"
              navbarScroll
            >
              <div className="nav-links-wrapper d-flex flex-row flex-wrap align-items-center">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={`${isActive("/")} nav-stagger`}
                >
                  <FaHome /> Home
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/login"
                  className={`${isActive("/login")} nav-stagger`}
                >
                  <SiGnuprivacyguard /> Login
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/productmenu"
                  className={`${isActive("/productmenu")} nav-stagger`}
                >
                  <MdRestaurantMenu /> Menu
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className={`${isActive("/profile")} nav-stagger`}
                >
                  <CgProfile /> Profile
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/cart"
                  className={`${isActive("/cart")} nav-stagger`}
                >
                  <ImCart /> Cart
                  {cartCount > 0 && (
                    <span className="nav-cart-badge nav-cart-badge-pulse">
                      {cartCount}
                    </span>
                  )}
                </Nav.Link>

                {role === "admin" && (
                  <Nav.Link
                    as={Link}
                    to="/adminpanel"
                    className={`${isActive("/adminpanel")} nav-stagger`}
                  >
                    <RiAdminFill /> Admin Panel
                  </Nav.Link>
                )}

                <Nav.Link
                  as={Link}
                  to="/orders"
                  className={`${isActive("/orders")} nav-stagger`}
                >
                  <BsBagHeartFill /> My Orders
                </Nav.Link>
              </div>
            </Nav>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
