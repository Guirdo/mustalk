import { StarOutline } from "iconoir-react";
import { supabase } from "../../utils/supabaseClient";

function LikeBtn({ postId, userId }) {

    const handleLike = async () => {
        try {
            const {_,error} = await supabase
                .from('likes')
                .insert([
                    {
                        post_id: postId,
                        user_id: userId,
                    }
                ])
                .then((res) => {
                    console.log(res)
                })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div
            className="post-action post-action--like"
            onClick={handleLike}
        >
            <span>
                <StarOutline strokeWidth={2} />
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