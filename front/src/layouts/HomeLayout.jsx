import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const offset = params.page * 10 || 0;

  const token = localStorage.getItem("token");
  let user = null;

  let data = { recipes: [], results: [], user, currentPage: 1, numOfPages: 1 };

  try {
    if (token) {
      const resp = await axios("/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data = { ...data, user: resp.data.user };
    }
    const {
      data: { recipes, currentPage, numOfPages },
    } = await axios(`/api/v1/recipes`, { params });
    data = { ...data, currentPage, numOfPages, recipes };
    const {
      data: { categories },
    } = await axios("/api/v1/categories");
    data = { ...data, categories };
    const {
      data: { results },
    } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        process.env.REACT_APP_API_KEY
      }${params.category ? `&cuisine=${params.category}` : ""}&query=${
        params.search ?? ""
      }&offset=${offset}`
    );

    data = { ...data, results };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return data;
  }
  return data;
};
const HomeLayout = () => {
  const { categories, user, recipes, results, currentPage, numOfPages } =
    useLoaderData();

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    revalidator.revalidate();
    toast.success("Logout...");
    navigate("/");
  }, [navigate, revalidator]);

  return (
    <>
      <Navbar user={user} logout={logout} />
      <section className="section">
        <Outlet
          context={{
            categories,
            user,
            recipes,
            results,
            currentPage,
            numOfPages,
          }}
        />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
