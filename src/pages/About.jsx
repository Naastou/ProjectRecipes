import { Link } from "react-router-dom";
import styled from "styled-components";

function About() {
  return (
    <div>
      <HeroSection className="light hero">
        <div className="heroInner">
          <span>
            <h1>Find the perfect recipes everyday</h1>
            <p>
              Welcome to CookAddict,the blog for all cooking addicts. <br />
              Here you will find easy everyday recipes with flavors from around
              the world. <br />
              Rediscover the pleasure of homemade, have fun in the kitchen and
              delight your friends and family.
            </p>
            <Link to={"/"} className="btn btn-light">
              Find your inspiration
            </Link>
          </span>
        </div>
      </HeroSection>
    </div>
  );
}

const HeroSection = styled.section`
  background: linear-gradient(rgba(241, 80, 37, 0.5), rgba(0, 0, 0, 0.75)),
    url("./background1.jpg") no-repeat center/cover fixed;

  height: fit-content;
  color: #fafafc;
  padding: 15rem 3rem 6rem;
  .heroInner {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
  }
  span {
    max-width: 50%;
  }
  h1 {
    font-weight: 900;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 576px) {
    background: linear-gradient(rgba(241, 80, 37, 0.25), rgba(0, 0, 0, 0.25)),
      url("./background1.jpg") no-repeat center/cover fixed;

    align-items: flex-start;
    padding-top: 7.5rem;
    height: 75vh;
    max-height: 720px;
  }
`;

export default About;
