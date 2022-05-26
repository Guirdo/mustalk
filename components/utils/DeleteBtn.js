import { Check, Trash } from "iconoir-react";
import { useRouter } from "next/router";
import { useState } from "react";
import cx from 'classnames'
import { supabase } from "../../utils/supabaseClient";

function DeleteBtn({ author, postId }) {
    const [isClicked, setIsClicked] = useState(false)
    const { push } = useRouter()

    const handleClick = async () => {
        if (!isClicked) {
            setIsClicked(true)

            setTimeout(() => {
                setIsClicked(false)
            }, 2500)
        } else {
            try {
                await supabase
                    .from('likes')
                    .delete()
                    .match({ post_id: author })
                await supabase
                    .from('post')
                    .delete()
                    .match({ id: postId })

                push(window.location.pathname)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div
            className={cx('post-action', 'post-action--delete', { 'post-action--active': isClicked })}
            onClick={handleClick}
        >

            {
                !isClicked ? (
                    <>
                        <span>
                            <Trash strokeWidth={2} />
                        </span>
                        <span className="post-action__text">Delete</span>
                    </>
                ) : (
                    <>
                        <span>
                            <Check strokeWidth={2} />
                        </span>
                        <span className="post-action__text">Sure?</span>
                    </>
                )
            }
        </div>
    );
}

export default DeleteBtn;