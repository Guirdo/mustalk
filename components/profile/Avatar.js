import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

function Avatar({ url, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

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
                .remove([`/${url}`])
                .then(() => console.log('Done'))
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()*100000000000000000}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            onUpload(filePath)
        } catch (error) {
            alert(error.message)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            <Image
                src={avatarUrl || '/icons/user.png'}
                alt="Avatar"
                height={100}
                width={100}
            />
            <div >
                <label className="button primary block" htmlFor="single">
                    {uploading ? 'Uploading ...' : 'Upload'}
                </label>
                <input
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