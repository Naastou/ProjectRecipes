import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <main className="error-page">
      <div>
        <h1>Oups !</h1>
        <p>We can't find the page you're looking for</p>
        <Link to="/">Return to home page</Link>
      </div>
    </main>
  );
};
export default ErrorPage;
