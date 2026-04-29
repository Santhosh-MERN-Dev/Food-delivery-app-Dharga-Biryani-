import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import CreateProduct from "./components/CreateProduct";
import ProductMenu from "./components/ProductMenu";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Login from "./components/LoginUI/Login";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Orders from "./components/Orders";
import Adminpanel from "./components/Adminpanel";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
          <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-fill">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createproduct" element={<CreateProduct />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productmenu" element={<ProductMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={ <Checkout /> } />
              <Route path="/orders" element={ <Orders /> } />
              <Route path="/adminpanel" element={ <Adminpanel /> } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>

    </Router>
  );
}

export default App;
