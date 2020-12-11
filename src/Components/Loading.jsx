import ReactLoading from "react-loading";

function Loading() {
  return (
    <ReactLoading
      className="loading"
      type={"bubbles"}
      color={"#fb8122"}
      height={300}
      width={200}
    />
  );
}
export default Loading;
