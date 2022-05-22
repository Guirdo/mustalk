import { Check, Trash } from "iconoir-react";
import { useRouter } from "next/router";
import { useState } from "react";
import cx from 'classnames'
import { supabase } from "../../utils/supabaseClient";

function DeleteBtn({ id }) {
    const [isClicked, setIsClicked] = useState(false)
    const { push } = useRouter()

    const handleClick = async () => {
        if (!isClicked) {
            setIsClicked(true)

            setTimeout(() => {
                setIsClicked(false)
            }, 2500)
        } else {
            const { data, error } = await supabase
                .from('post')
                .delete()
                .match({ id })

            push(window.location.pathname)
        }
    }

    return (
        <div
            className={cx('post-action','post-action--delete', {'post-action--active': isClicked})}
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
                            <Check strokeWidth={2}/>
                        </span>
                        <span className="post-action__text">Sure?</span>
                    </>
                )
            }
        </div>
    );
}

export default DeleteBtn;