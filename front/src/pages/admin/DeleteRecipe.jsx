import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`/api/v1/recipes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.success("Recipe deleted");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return redirect("/admin/dashboard");
};
