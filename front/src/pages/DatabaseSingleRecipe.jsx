import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SearchLayout from "../layouts/SearchLayout";
import he from "he";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(`/api/v1/recipes/${params.name}`);
      const detailData = await data.json();
      console.log(detailData.recipe);
      setDetails(detailData.recipe);
    };
    fetchDetails();
  }, [params.name]);

  return (
    <div>
      <SearchLayout />

      <DetailWrapper>
        <div>
          <h2>{details.title}</h2>
          <img
            className="image"
            src={details.image && he.decode(details.image)}
            alt=""
          />
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
   .image {
      width: 500px;
      height: 300px;
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
    .image {
      width: 350px;
      height: 300px;
    }
  
;
   
    
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
