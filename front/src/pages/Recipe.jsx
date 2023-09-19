import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchLayout from "../layouts/SearchLayout";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };
    fetchDetails();
  }, [params.name]);

  return (
    <div>
      <SearchLayout />

      <DetailWrapper>
        <div>
          <h2>{details.title}</h2>
          <img src={details.image} alt="" />
        </div>
        <Info>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </div>
  );
}

const DetailWrapper = styled.section`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
    border: 2px solid black;
  }
  img {
    width: 100%;
  }

  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  @media (max-width: 600px) {
    display: grid;
    grid-template-rows: repeat(300px);
    justify-content: center;
    justify-items: center;
    row-gap: 3rem;
    margin: 0rem auto;
    width: 100%;

    img {
      width: 100%;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin: 1rem auto;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
  margin-bottom: 1rem;
  text-align: justify;
  @media (max-width: 600px) {
    margin: 0 auto;
    padding: 1rem;
  }
`;

export default Recipe;
