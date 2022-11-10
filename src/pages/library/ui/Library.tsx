import "./Library.css";
import * as compositions from "~/data/compositions";
import { Link } from "react-router-dom";

function Library() {
  return (
    <main className="library">
      <ul>
        {Object.values(compositions).map(({ id, name }) => (
          <li key={id}>
            <Link to={`/dojo/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Library;
