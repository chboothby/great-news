import { GrLike, GrDislike } from "react-icons/gr";
import { FiHeart } from "react-icons/fi";

function Voting() {
  return (
    <section className="votingBar">
      <button>
        <FiHeart />
      </button>
      <button>
        <GrLike />
      </button>
      <button>
        <GrDislike />
      </button>
    </section>
  );
}

export default Voting;
