import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

export const loader = async () => {
  const token = localStorage.getItem("token");
  let categories = null;
  let user = null;
  try {
    const { data } = await axios("/api/v1/categories");
    categories = data.categories;
    if (token) {
      const resp = await axios("/api/v1/users/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      user = resp.data.user;
    }
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return error;
  }
  return { categories, user };
};
const HomeLayout = () => {
  const { categories, user } = useLoaderData();
  return (
    <>
      <Navbar user={user} />
      <section className="section">
        <Outlet context={{ categories }} />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
