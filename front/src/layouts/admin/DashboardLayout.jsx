import {
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
  Navigate,
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
  const { categories, user } = useOutletContext();
  if (!user) {
    return <Navigate to="/" />;
  }
  const recipes = data.recipes;

  return (
    <>
      <Outlet context={{ recipes, categories }} />
    </>
  );
};

export default DashboardLayout;
