import { Link, Form } from "react-router-dom";
import FormRow from "../components/FormRow.jsx";

export const action = async ({ request }) => {};

const Login = () => {
  return (
    <Form method="POST" className="form">
      <h4>Connexion</h4>
      <FormRow type="email" name="email" />
      <FormRow type="password" name="password" labelText="mot de passe" />
      <button type="submit" className="btn btn-block">
        Se connecter
      </button>
      <p style={{ textAlign: "center", marginTop: "1em" }}>
        Vous n&apos;êtes pas membre ?{" "}
        <Link to="/register">S&apos;inscrire</Link>
      </p>
    </Form>
  );
};
export default Login;
