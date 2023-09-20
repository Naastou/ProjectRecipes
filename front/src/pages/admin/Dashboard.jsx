import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Recipes from "../../components/admin/Recipes.jsx";
import Pagination from "../../components/admin/Pagination.jsx";

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
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Dashboard;
