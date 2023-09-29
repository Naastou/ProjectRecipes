import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import HomeLayout from "./layouts/HomeLayout";
import About from "./pages/About";
import Cuisine from "./pages/Cuisine";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import RecipesForm from "./pages/admin/RecipesForm";
import Recipe from "./pages/Recipe";
import Searched from "./pages/Searched";
import DatabaseSingleRecipe from "./pages/DatabaseSingleRecipe";
import ErrorPage from "./pages/ErrorPage";
import { action as loginAction } from "./pages/admin/Login";
import { action as registerAction } from "./pages/admin/Register";
import { action as deleteRecipeAction } from "./pages/admin/DeleteRecipe";
import EditRecipeForm, {
  action as editRecipeAction,
} from "./pages/admin/EditRecipe";
import { action as addRecipeAction } from "./pages/admin/RecipesForm";
import Dashboard from "./pages/admin/Dashboard";
import { loader as homeLayoutLoader } from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/admin/DashboardLayout.jsx";
import { loader as dashboardLayoutLoader } from "./layouts/admin/DashboardLayout.jsx";
import { loader as editRecipeLoader } from "./pages/admin/EditRecipe";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    loader: homeLayoutLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "cuisine", element: <Cuisine /> },
      { path: "recipe/:name", element: <Recipe /> },
      { path: "databaseSingleRecipe/:name", element: <DatabaseSingleRecipe /> },
      // { path: "searched/:search", element: <Searched /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login />, action: loginAction },

      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "admin",
        element: <DashboardLayout />,
        loader: dashboardLayoutLoader,
        children: [
          {
            index: true,
            element: <Dashboard />,
            action: addRecipeAction,
          },
          {
            path: "recipes/add",
            element: <RecipesForm />,
            action: addRecipeAction,
          },
          {
            path: "recipes/delete/:id",
            action: deleteRecipeAction,
          },
          {
            path: "recipes/edit/:id",
            element: <EditRecipeForm />,
            action: editRecipeAction,
            loader: editRecipeLoader,
          },
        ],
      },

      { path: "errorpage", element: <ErrorPage /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
