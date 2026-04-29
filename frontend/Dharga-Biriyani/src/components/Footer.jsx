import { FaInstagram, FaFacebook, FaTwitter, FaPhone, FaMapLocationDot, FaClock } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import AOS from "aos";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="modern-footer">
      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="row g-4">
            {/* About Section */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="footer-section">
                <img
                  src="./src/assets/img/DhargaBiriyani logo.png"
                  alt="Dharga Biryani Logo"
                  className="footer-logo"
                />
                <p className="footer-desc">
                  Serving authentic and delicious biryani since <span className="year-highlight">1998</span>
                </p>
                <p className="footer-tagline">Quality • Flavor • Tradition</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="footer-section">
                <h5 className="footer-title">Quick Links</h5>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/productMenu">Menu</a></li>
                  <li><a href="/orders">My Orders</a></li>
                  <li><a href="/profile">Profile</a></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="footer-section">
                <h5 className="footer-title">Contact Info</h5>
                <div className="contact-item">
                  <FaMapLocationDot className="contact-icon" />
                  <span>Kanchipuram, Tamil Nadu</span>
                </div>
                <div className="contact-item">
                  <MdEmail className="contact-icon" />
                  <a href="mailto:DhargaBiriyani1998@gmail.com">
                    DhargaBiriyani1998@gmail.com
                  </a>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>+91 XXXX-XXXX-XX</span>
                </div>
                <div className="contact-item">
                  <FaClock className="contact-icon" />
                  <span>10 AM - 11 PM</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="footer-section">
                <h5 className="footer-title">Follow Us</h5>
                <p className="social-subtitle">Connect with us on social media</p>
                <div className="social-links">
                  <a href="#facebook" className="social-icon facebook-icon" title="Facebook">
                    <FaFacebook />
                  </a>
                  <a href="#twitter" className="social-icon twitter-icon" title="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="#instagram" className="social-icon instagram-icon" title="Instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} <span className="brand-name">Dharga Biryani</span>. All rights reserved.</p>
            <div className="footer-links-bottom">
              <a href="#privacy">Privacy Policy</a>
              <span className="divider">|</span>
              <a href="#terms">Terms & Conditions</a>
              <span className="divider">|</span>
              <a href="#shipping">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
