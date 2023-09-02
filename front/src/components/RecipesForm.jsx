import { useEffect } from "react";
import { Form, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

function RecipesForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    document.querySelector("[name='name']").value = "";
    document.querySelector("[name='image']").value = "";
    document.querySelector("[name='ingredients']").value = "";
    document.querySelector("[name='instructions']").value = "";
  });
  return (
    <Form>
      <h4> Add Recipes</h4>
      <div className="form-control">
        <label htmlFor="name" className="visually-hidden">
          Recipe name
        </label>
        <input type="text" name="name" id="name" className="form-input" />
        <label htmlFor="image" className="visually-hidden">
          Image
        </label>
        <input type="text" name="image" id="image" className="form-input" />
        <label htmlFor="ingredients" className="visually-hidden">
          Ingredients
        </label>
        <input
          type="text"
          name="ingredients"
          id="ingredients"
          className="form-input"
        />
        <label htmlFor="intructions" className="visually-hidden">
          Instructions
        </label>
        <input
          type="text"
          name="instructions"
          id="instructions"
          className="form-input"
        />

        <button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Add..." : "Added"}
        </button>
      </div>
    </Form>
  );
}
export default RecipesForm;
