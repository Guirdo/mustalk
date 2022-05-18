import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { useForm } from "../../hooks/useForm";
import { supabase } from "../../utils/supabaseClient";

function EditProfilePage() {

    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();

    if (!user) {
        push('/')
    }

    const [formValues, handleInputChange] = useForm({
        username: user?.username || "",
        biography: user?.biography || "",
        website: user?.website || ""
    });

    const { username, biography, website } = formValues;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await supabase
                .from('profiles').update({
                    username,
                    biography,
                    website
                })
                .match({ id: user.id })

            push(`/profile/${username}`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout
            title="Edit Profile"
        >
            <div className="edit-profile">
                <h1 className="edit-profile__title">Edit Profile</h1>

                <figure className="edit-profile__photo">
                    <Image
                        src="/icons/user.png"
                        alt="profile"
                        width={100}
                        height={100}
                    />
                </figure>

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
                        rows={3}
                        value={biography}
                        name="biography"
                        onChange={handleInputChange}
                    ></textarea>

                    <input
                        className="edit-profile__input"
                        type="url"
                        placeholder="Website"
                        value={website}
                        name="website"
                        onChange={handleInputChange}
                    />

                    <button
                        className="btn btn--primary btn--block"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default EditProfilePage;