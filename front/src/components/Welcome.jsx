import styled from "styled-components";

function Welcome() {
  return (
    <Header>
      <div className="heroInner">
        <span>
          <h1>
            Welcome to <span className="cookaddict">CookAddict</span>, <br />
            The blog for all cooking addicts{" "}
          </h1>
        </span>
      </div>
    </Header>
  );
}

const Header = styled.div`
  background: linear-gradient(rgba(241, 80, 37, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/welcome.jpg") no-repeat bottom/cover fixed;

  height: fit-content;
  color: #fafafc;
  padding: 15rem 3rem 6rem;
  .heroInner {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
  }
  .cookaddict {
    color: red;
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
    background: linear-gradient(rgba(241, 80, 37, 0.5), rgba(0, 0, 0, 0.5)),
      url("/images/welcome.jpg") no-repeat bottom/cover fixed;

    align-items: flex-start;
    padding-top: 7.5rem;
    height: 75vh;
    max-height: 720px;

    .cookaddict {
      color: white;
    }
  }
`;
export default Welcome;
