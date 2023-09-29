import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { PiFishSimple } from "react-icons/pi";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const handleClick = (category) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("category", category);
    navigate(`/cuisine?${searchParams.toString()}`);
  };
  return (
    <List>
      <SLink className="button" to="/cuisine">
        <h4>All</h4>
      </SLink>
      <Button onClick={() => handleClick("Italian")}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </Button>
      <Button onClick={() => handleClick("American")}>
        <FaHamburger />
        <h4>American</h4>
      </Button>
      <Button onClick={() => handleClick("Thai")}>
        <GiNoodles />
        <h4>Thaï</h4>
      </Button>
      <Button onClick={() => handleClick("Japanese")}>
        <GiChopsticks />
        <h4>Japanese</h4>
      </Button>
      <Button onClick={() => handleClick("African")}>
        <PiFishSimple />
        <h4>African</h4>
      </Button>
    </List>
  );
}

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(2rem, 5rem));
  grid-gap: 1rem;
  justify-content: center;
  margin: 2rem auto;
`;
const SLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  align-items: center;
  border: 2px solid #f27121;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  color: white;
  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-self: center;
  align-items: center;
  border: 2px solid #f27121;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  margin-top: 0;

  h4 {
    color: white;
    font-size: 0.8rem;
  }
  svg {
    color: white;
    font-size: 1.5rem;
  }
  &:hover {
    background: linear-gradient(to right, #f27121, #e94057);
  }
  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }
    h4 {
      color: white;
    }
  }
`;
export default Category;
