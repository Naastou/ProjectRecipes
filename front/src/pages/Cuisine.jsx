import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchLayout from "../layouts/SearchLayout";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  const [databaseRecipes, setDatabaseRecipes] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );

    let { results } = await data.json();
    const response = await fetch(`/api/v1/recipes?category=${name}`);
    const { recipes } = await response.json();

    setCuisine(results);
    setDatabaseRecipes(recipes);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  console.log(cuisine);
  console.log(databaseRecipes);

  return (
    <div>
      <SearchLayout />
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cuisine.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
        {databaseRecipes.map((item) => {
          return (
            <Card key={item.recipes_id}>
              <Link to={"/databaseSingleRecipe/" + item.recipes_id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  justify-items: center;
  justify-content: center;
`;
const Card = styled.div`
  width: 350px;
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
    color: red;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
