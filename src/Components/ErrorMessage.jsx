import { Link } from "@reach/router";
function ErrorMessage({ errMessage }) {
  return (
    <div className="error-message">
      <p>{errMessage}</p>
      <h4>
        Return to <Link to="/">homepage</Link>
      </h4>
    </div>
  );
}
export default ErrorMessage;
