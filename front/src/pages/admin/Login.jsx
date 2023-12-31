import { Link, Form, redirect } from "react-router-dom";
import FormRow from "../../components/FormRow.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const resp = await axios.post("/api/v1/auth/login", data);
    localStorage.setItem("token", resp.data.token);
    toast.success("Successful Connection ");
    return redirect("/admin");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Form method="POST" className="form">
      <h4>Connection</h4>
      <FormRow type="email" name="email" />
      <FormRow type="password" name="password" labelText="mot de passe" />
      <button type="submit" className="btn btn-block">
        Login
      </button>
      <p style={{ textAlign: "center", marginTop: "1em" }}>
        You don't have a account <Link to="/register">Register</Link>
      </p>
    </Form>
  );
};
export default Login;
