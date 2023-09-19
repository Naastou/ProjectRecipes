import axios from "axios";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const token = localStorage.getItem("token");

  try {
    await axios.post("/api/v1/recipes", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Recipe added");
    return redirect("/admin");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function RecipesForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { categories } = useOutletContext();
  console.log(categories);
  return (
    <Form method="POST" className="form">
      <h4> Add Recipe </h4>
      <div className="form-control">
        <p className="form-label">Select category</p>
        <select name="category_id">
          <option value="5">Italian</option>
          <option value="4">American</option>
          <option value="3">Thaï</option>
          <option value="2">Japanese</option>
          <option value="1">African</option>
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
        ></textarea>
      </div>
      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "Add..." : "Added"}
      </button>
    </Form>
  );
}
export default RecipesForm;
