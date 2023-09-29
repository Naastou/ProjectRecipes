import {
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
  Navigate,
} from "react-router-dom";

import axios from "axios";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const token = localStorage.getItem("token");

  try {
    const { data } = await axios(
      "/api/v1/recipes",
      { params },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { recipes, currentPage, numOfPages } = useLoaderData();
  const { categories, user } = useOutletContext();
  if (!user) {
    return <Navigate to="/" />;
  }

  return <Outlet context={{ recipes, categories, currentPage, numOfPages }} />;
};

export default DashboardLayout;
