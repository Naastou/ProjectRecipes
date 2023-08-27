import { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import { GiChefToque } from "react-icons/gi";

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  useEffect(() => {
    if (!linksRef.current) return;
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    console.log(linksRef);
    console.log(linksHeight);
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <Nav>
            <GiChefToque />
            <Logo to={"/"}>CookAddict</Logo>
          </Nav>
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
          >
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <div className=" links " ref={linksRef}>
            <NavLink to="/" className="link">
              Home
            </NavLink>
            <NavLink to="/about" className="link">
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
  font-weight: 700;
  font-family: "Lobster Two", cursive;
`;

const Nav = styled.div`
padding; 4rem 0rem;
display: flex;
justify-content: flex-start;
align-items: center;
 svg{
  font-size: 2rem;
  color: white;
 }
`;
export default Navbar;
