import classes from "./comment-list.module.css";
import { CommentData } from "types/types";
interface Props {
  addComments: CommentData[];
}
function CommentList({ addComments }: Props) {
  return (
    <ul className={classes.comments}>
      {addComments?.map((comment: CommentData) => (
        <li key={comment._id?.toString()}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
