import { StarOutline } from "iconoir-react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import cx from "classnames";

function LikeBtn({ postId, userId }) {

    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const handleLike = async (e) => {
        try {
            const { _, error } = await supabase
                .from('likes')
                .insert([
                    {
                        post_id: postId,
                        user_id: userId,
                    }
                ])

            if (error) {
                await supabase
                    .from('likes')
                    .delete()
                    .match({
                        post_id: postId,
                        user_id: userId,
                    })
                    .then(() => setIsLiked(false))
            }else{
                setIsLiked(true)
            }

        } catch (e) {
            //console.log(e)
        }
    }

    useEffect(() => {
        async function getLikes() {
            const { data, error } = await supabase
                .from('likes')
                .select('*', { count: "exact" })
                .match({
                    post_id: postId,
                })

            setLikeCount(data.length)
        }

        async function getUserLike() {
            const { data } = await supabase
                .from('likes')
                .select('*')
                .match({
                    post_id: postId,
                    user_id: userId,
                })

            if (data?.length > 0) {
                setIsLiked(true)
            }
        }

        getLikes()
        getUserLike()
    }, [isLiked, likeCount, postId, userId])


    return (
        <div
            className="post-action post-action--like"
            onClick={handleLike}
        >
            <span>
                {
                    isLiked ? (
                        <StarOutline fill="#FFAE03" />
                    ) : (
                        <StarOutline strokeWidth={2} />
                    )
                }
            </span>
            <span
                className={cx("post-action__text", { "post-action__text--active": likeCount > 0 })}
            >
                {
                    likeCount > 0 ? (
                        <>{likeCount}</>
                    ) : (
                        "Like"
                    )
                }
            </span>
        </div>
    );
}

export default LikeBtn;