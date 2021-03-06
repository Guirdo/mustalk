import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validator from 'validator'
import Layout from "../../components/Layout";
import Avatar from "../../components/profile/Avatar";
import { useForm } from "../../hooks/useForm";
import { supabase } from "../../utils/supabaseClient";

function EditProfilePage() {
    const [count] = useState(0)
    const [uploading, setUploading] = useState(false)
    const { user } = useSelector(state => state.auth);
    const { push, back } = useRouter();

    useEffect(() => {
        if (!user) {
            push('/')
        }
    },[])

    const [formValues, handleInputChange] = useForm({
        username: user?.username || "",
        biography: user?.biography || "",
        website: user?.website || ""
    });

    const { username, biography, website } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isFormValid()) {
                await supabase
                    .from('profiles').update({
                        username,
                        biography,
                        website,
                    })
                    .match({ id: user.id })

                push(`/profile/${username}`)
            } else {
                alert("Please fill all the fields")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const isFormValid = () => {
        if (validator.isEmpty(username)) {
            return false
        } else if (!validator.isURL(website) && !validator.isEmpty(website)) {
            return false
        }

        return true
    }

    return (
        <Layout
            title="Edit Profile"
        >
            <div className="edit-profile">
                <h1 className="edit-profile__title">Edit Profile</h1>

                <Avatar
                    userId={user?.id}
                    url={user?.avatar_url}
                    uploading={uploading}
                    setUploading={setUploading}
                />

                <form
                    className="edit-profile__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="edit-profile__input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        name="username"
                        onChange={handleInputChange}
                    />

                    <textarea
                        className="edit-profile__textarea"
                        placeholder="Biography"
                        rows={4}
                        value={biography}
                        name="biography"
                        onChange={handleInputChange}
                        maxLength={280}

                    ></textarea>

                    <div className="edit-profile__count">
                        <span>{count}/280</span>
                    </div>

                    <input
                        className="edit-profile__input"
                        type="url"
                        placeholder="Website"
                        value={website}
                        name="website"
                        onChange={handleInputChange}
                    />

                    <div className="edit-profile__buttons">
                        <button
                            className="btn btn--warning btn--block"
                            onClick={back}
                            disabled={uploading}
                        >
                            Go back
                        </button>
                        <button
                            className="btn btn--primary btn--block"
                            type="submit"
                            disabled={uploading}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default EditProfilePage;