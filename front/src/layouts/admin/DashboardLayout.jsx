import {
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";

import axios from "axios";

export const loader = async () => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios("/api/v1/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data };
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { data } = useLoaderData();
  const { categories } = useOutletContext();

  const recipes = data.recipes;

  return (
    <>
      <Outlet context={{ recipes, categories }} />
    </>
  );
};

export default DashboardLayout;
