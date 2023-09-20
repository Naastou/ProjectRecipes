import styled from "styled-components";
import { Link, useOutletContext } from "react-router-dom";

import SearchLayout from "../layouts/SearchLayout";

function Cuisine() {
  const { recipes, results } = useOutletContext();
  return (
    <div>
      <SearchLayout />
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {results.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })}
        {recipes.map((item) => {
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
