import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  const token = localStorage.getItem("token");
  let user = null;
  let data = null;
  try {
    const {
      data: { results },
    } = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        process.env.REACT_APP_API_KEY
      }${params.category ? `&cuisine=${params.category}` : ""}&query=${
        params.search ?? ""
      }`
    );
    console.log(results);
    const {
      data: { recipes },
    } = await axios(`/api/v1/recipes`, { params });

    const {
      data: { categories },
    } = await axios("/api/v1/categories");

    if (token) {
      const resp = await axios("/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user = resp.data.user;
    }
    data = { results, recipes, categories, user };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
  return data;
};
const HomeLayout = () => {
  const { categories, user, recipes, results } = useLoaderData();

  return (
    <>
      <Navbar user={user} />
      <section className="section">
        <Outlet context={{ categories, user, recipes, results }} />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
