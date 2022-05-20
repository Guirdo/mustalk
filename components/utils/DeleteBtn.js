import { useRouter } from "next/router";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

function DeleteBtn({ id }) {
    const [isClicked, setIsClicked] = useState(false)
    const { push } = useRouter()

    const handleClick = async() => {
        if (!isClicked) {
            setIsClicked(true)

            setTimeout(() => {
                setIsClicked(false)
            }, 2500)
        }else{
            const { data,error } = await supabase
                .from('post')
                .delete()
                .match({ id })

            push(window.location.pathname)
        }
    }

    return (
        <div
            className="post-action"
            onClick={handleClick}
        >
            {
                !isClicked ? (
                    <span className="post-action__text">Delete</span>
                ) : (
                    <span className="post-action__text">Sure?</span>
                )
            }
        </div>
    );
}

export default DeleteBtn;