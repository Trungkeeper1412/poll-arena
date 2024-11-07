import { FaUserCircle } from "react-icons/fa";

const PollAuthor = ({ author, timestamp }) => (
  <div className="d-flex flex-row">
    <div className="card-user">
      {author?.avatarURL ? (
        <img
          src={author.avatarURL}
          alt={author.name}
          className="rounded-circle avatar"
        />
      ) : (
        <FaUserCircle className="avatar" />
      )}
      <div className="author d-flex flex-column align-items-center">
        <strong>Created by: {author ? author.name : "Unknown User"}</strong>
        <span className="timestamp">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  </div>
);
export default PollAuthor;
