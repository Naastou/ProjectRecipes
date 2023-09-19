import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Recipes from "../../components/admin/Recipes.jsx";

const columns = [
  {
    Header: "Category",
    accessor: "name",
  },

  {
    Header: "Title",
    accessor: "title",
  },
  {
    Header: "Image",
    accessor: "image",
  },
];

const Dashboard = () => {
  const { recipes } = useOutletContext();
  return (
    <section className="section_center">
      <div>
        <h1 className="recipes-table">Recipes table</h1>
        <Recipes columns={columns} data={recipes} />
      </div>
      <div className="add-recipe">
        <button className="btn ">
          <Link to="/admin/recipes/add" className="add-btn">
            Add Recipe
          </Link>
        </button>
      </div>
    </section>
  );
};

export default Dashboard;
