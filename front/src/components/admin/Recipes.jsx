// import SingleRecipe from "./SingleRecipe";

// const Recipes = ({ recipes }) => {
//   return (
//     <div className="recipes">
//       {recipes.map((item) => {
//         return <SingleRecipe key={item.recipes_id} recipe={item} />;
//       })}
//     </div>
//   );
// };

// export default Recipes;

import { useTable } from "react-table";
import { Form, Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

const Recipes = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th>Actions</th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.recipes_id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>
                  {cell.column.id === "image" ? (
                    <img
                      src={cell.value}
                      alt={`Image for ${row.original.title}`}
                      style={{ width: "60px", height: "50px" }}
                    />
                  ) : (
                    cell.render("Cell")
                  )}
                </td>
              ))}
              <td>
                <Link
                  to={`/admin/recipes/edit/${row.original.recipes_id}`}
                  className="edit-icon"
                >
                  <BiEdit />
                </Link>

                <Form
                  method="POST"
                  action={`/admin/recipes/delete/${row.original.recipes_id}`}
                >
                  <button type="submit" className="remove-icon">
                    <RiDeleteBin2Line />
                  </button>
                </Form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Recipes;