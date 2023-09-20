import axios from "axios";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(`/api/v1/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return data.recipe;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return redirect("/admin");
  }
};
export const action = async ({ params, request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { id } = params;
  const token = localStorage.getItem("token");

  try {
    await axios.put(`/api/v1/recipes/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Updated recipe");

    return redirect("/admin");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function EditRecipeForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const recipe = useLoaderData();
  const { categories } = useOutletContext();
  console.log(categories);
  console.log(recipe);
  return (
    <Form method="POST" className="form">
      <h4> Edit Recipe </h4>
      <div className="form-control">
        <p className="form-label">Select category</p>
        <select name="Category">
          <option value="Italian">Italian</option>
          <option value="American">American</option>
          <option value="Thaï">Thaï</option>
          <option value="Japanese">Japanese</option>
          <option value="Afriacn">African</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-input"
          placeholder="Enter the name of the recipe"
          defaultValue={recipe.title}
        />
      </div>
      <div className="form-control">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="form-input"
          placeholder="Enter your image link"
          defaultValue={recipe.image}
        />
      </div>
      <div className="form-control">
        <label htmlFor="ingredients" className="form-label">
          Ingredients
        </label>
        <textarea
          name="ingredients"
          cols="30"
          rows="10"
          className="textarea"
          placeholder="Enter the list of your ingredients"
          defaultValue={recipe.ingredients}
        ></textarea>
      </div>
      <div className="form-control">
        <label htmlFor="intructions" className="form-label2">
          Instructions
        </label>
        <textarea
          name="instructions"
          cols="30"
          rows="10"
          className="textarea"
          placeholder="Enter your instructions"
          defaultValue={recipe.instructions}
        ></textarea>
      </div>
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Add..." : "Save"}
      </button>
    </Form>
  );
}
export default EditRecipeForm;
