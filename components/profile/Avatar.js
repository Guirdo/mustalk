import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

function Avatar({ userId,url, uploading, setUploading}) {
    const [avatarUrl, setAvatarUrl] = useState(null)

    useEffect(() => {
        if (url) setAvatarUrl(`https://soemnqnroxxnmbxbehex.supabase.co/storage/v1/object/public/avatars/${url}`)
    }, [url])

    async function uploadAvatar(event) {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            if(url){
                await supabase.storage
                .from('avatars')
                .remove([url])
                .then(() => console.log('Done'))
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${moment().format('MMDDYY_HHmmss')}.${fileExt}`
            const filePath = `${userId}/${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            await supabase
                .from('profiles')
                .update({
                    avatar_url: filePath
                })
                .match({ id: userId })
                .then(()=> alert('Your avatar has been updated'))


            setAvatarUrl(`https://soemnqnroxxnmbxbehex.supabase.co/storage/v1/object/public/avatars/${filePath}`)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="edit-profile__avatar">
            <Image
                src={avatarUrl || '/icons/user.png'}
                alt="Avatar"
                height={150}
                width={150}
            />
            <div >
                <input
                    className="edit-profile__input-photo"
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}

export default Avatar;