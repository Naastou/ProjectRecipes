import { Form, Link, redirect } from "react-router-dom";
import FormRow from "../../components/FormRow.jsx";
import axios from "axios";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const resp = await axios.post("/api/v1/auth/register", data);
    localStorage.setItem("token", resp.data.token);
    toast.success("Successful Register");
    return redirect("/admin");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Form method="POST" className="form">
      <h4>Register</h4>
      <FormRow type="text" name="name" labelText="nom" />
      <FormRow type="email" name="email" />
      <FormRow type="password" name="password" labelText="mot de passe" />
      <button className="btn btn-block">Register</button>
      <p style={{ textAlign: "center", marginTop: "1em" }}>
        Already a member? <Link to="/login">Login</Link>
      </p>
    </Form>
  );
};
export default Register;
