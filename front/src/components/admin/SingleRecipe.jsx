import { Form, Link } from "react-router-dom";

const SingleRecipe = ({ recipe }) => {
  return (
    <article className="single-recipe">
      <Link
        to={`/admin/recipes/edit/${recipe.recipes_id}`}
        className="btn edit-btn"
      >
        Edit
      </Link>

      <label
        htmlFor="completed"
        style={{
          textTransform: "capitalize",
        }}
      >
        {recipe.name}
      </label>
      <label
        htmlFor="completed"
        style={{
          textTransform: "capitalize",
        }}
      >
        {recipe.title}
      </label>
      <Form method="POST" action={`/admin/recipes/delete/${recipe.recipes_id}`}>
        <button type="submit" className="btn remove-btn">
          Delete
        </button>
      </Form>
    </article>
  );
};
export default SingleRecipe;
