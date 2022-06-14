import { Pocket, SaveFloppyDisk } from "iconoir-react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

function SaveBtn({ postId, userId }) {

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        try {
            const { _, error } = await supabase
                .from('bookmarks')
                .insert([
                    {
                        post_id: postId,
                        user_id: userId,
                    }
                ])

            if (error) {
                await supabase
                    .from('bookmarks')
                    .delete()
                    .match({
                        post_id: postId,
                        user_id: userId,
                    })
                    .then(() => setIsSaved(false))
            }else{
                setIsSaved(true)
            }
        }catch(e){
            //console.log(e)
        }
    }

    useEffect(() => {
        async function getUserSave() {
            const { data } = await supabase
                .from('bookmarks')
                .select('*', { count: "exact" })
                .match({
                    post_id: postId,
                    user_id: userId,
                })
            
            if (data?.length > 0) {
                setIsSaved(true)
            }
        }

        getUserSave()
    }, [postId, userId])

    return (
        <div
            className="post-action post-action--save"
            onClick={handleSave}
        >
            <span>
                {
                    isSaved ? (
                        <Pocket strokeWidth={2}/>
                    ) : (
                        <SaveFloppyDisk strokeWidth={2}/>
                    )
                }
            </span>
            <span
                className="post-action__text"
            >
                {
                    isSaved ? (
                        "Saved"
                    ) : (
                        "Save"
                    )
                }
            </span>
        </div>
    );
}

export default SaveBtn;