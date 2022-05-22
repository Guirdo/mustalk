import { Heart, StarOutline } from "iconoir-react";

function LikeBtn() {
    return (
        <div className="post-action post-action--like">
            <span>
                <StarOutline strokeWidth={2}/>
            </span>
            <span
                className="post-action__text"
            >
                Like
            </span>
        </div>
    );
}

export default LikeBtn;