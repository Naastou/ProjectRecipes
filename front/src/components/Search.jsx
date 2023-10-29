import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { search } = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(search);
    searchParams.set("search", input);

    navigate(`/cuisine?${searchParams.toString()}`);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  div {
    width: 100%;
    max-width: 620px;
    margin: 2rem auto;
    position: relative;

    input {
      border: 2px solid #f27121;
      background: linear-gradient(35deg, #494949, #313131);
      font-size: 1.5rem;
      color: white;
      padding: 1rem 3rem;
      border-radius: 1rem;
      outline: none;
      width: 100%;
    }
    svg {
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(100%, -50%);
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
    }
  }
`;
export default Search;
