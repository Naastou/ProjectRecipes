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
      <div className="links">
        <Link
          to="/"
          // style={({ isActive }) => ({ color: isActive ? 'red' : 'grey' })}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          About
        </Link>
      </div>

      <div>
        <span style={{ paddingRight: 5 }}>Copyright </span>
        <FaCopyright />
        <span style={{ paddingLeft: 5 }}>
          {new Date().getFullYear()} CookAddict. All Rights Reserved.
        </span>
      </div>
      <a href="https://www.instagram.com/">
        <FaInstagram />
      </a>
      <a href="https://www.facebook.com/">
        <FaFacebook />
      </a>
      <a href="https://www.youtube.com/">
        <FaYoutube />
      </a>
    </footer>
  );
};

export default Footer;
