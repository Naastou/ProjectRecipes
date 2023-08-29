import { Link } from "react-router-dom";
import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaCopyright,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-center">
        <div className="footer-links">
          <Link className="footer-link" to="/">
            Home
          </Link>
          <Link className="footer-link" to="/about">
            About
          </Link>
        </div>

        <div className="footer-text">
          <span style={{ paddingRight: 5 }}>Copyright </span>
          <FaCopyright />
          <span style={{ paddingLeft: 5 }}>
            {new Date().getFullYear()} CookAddict. All Rights Reserved.
          </span>
        </div>
        <div className="footer-icons">
          <a href="https://www.instagram.com/">
            <FaInstagram />
          </a>
          <a href="https://www.facebook.com/">
            <FaFacebook />
          </a>
          <a href="https://www.youtube.com/">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
