import { Link } from "react-router-dom";
import styled from "styled-components";
import SearchLayout from "../layouts/SearchLayout";

function About() {
  return (
    <div>
      <SearchLayout />
      <HeroSection className="light hero">
        <div className="heroInner">
          <span>
            <h1>
              Find the perfect <br /> recipes{" "}
              <span className="everyday">everyday</span>
            </h1>
            <p>
              Welcome to CookAddict, the blog for all cooking addicts. <br />
              Here you will find easy everyday recipes with flavors from around
              the world. <br />
              Rediscover the pleasure of homemade, have fun in the kitchen and
              delight your friends and family.
            </p>
            <Link to={"/"}>
              <button>Find your inspiration</button>
            </Link>
          </span>
        </div>
      </HeroSection>
    </div>
  );
}

const HeroSection = styled.section`
  background: linear-gradient(rgba(241, 80, 37, 0.5), rgba(0, 0, 0, 0.75)),
    url("/images/background1.jpg") no-repeat center/cover fixed;

  height: fit-content;
  color: #fafafc;
  padding: 15rem 3rem 6rem;
  .heroInner {
    display: flex;
    max-width: 700px;
    margin-left: 2rem;
  }
  .everyday {
    color: red;
  }

  span: {
    max-width: 60%;
  }
  h1 {
    font-weight: 900;
    font-size: clamp(2rem, 5.5vw, 3.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  span p {
    font-size: 1.5rem;
    font-weight: 400;
    margin-top: 2rem;
  }
  
  }
  button {
    background: white;
    font-weight: bold;
    font-size: 1rem;
    margin-top: 2rem;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
  }
  @media (max-width: 600px) {
    background: linear-gradient(rgba(241, 80, 37, 0.5), rgba(0, 0, 0, 0.75)),
      url("/images/background1.jpg") no-repeat center/cover fixed;

    .heroInner {
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 60vw;
      min-height: 100vh;
    }

    h1 {
      margin: 0;
    }
    span p {
      font-size: 1.2rem;
      font-weight: 400;
      ligne-height: 1.5;
    }
    button {
      margin-bottom: 1rem;
      font-weight: Bold;
    }
  }
`;

export default About;
