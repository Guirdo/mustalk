import Image from "next/image";
import { useSelector } from "react-redux";

function Profile({ profile }) {
    const { id,username, biography } = JSON.parse(profile);
    const { user } = useSelector(state => state.auth);

    return (
        <div className="profile">
            <figure className="profile__photo">
                <Image
                    src="/icons/user.png"
                    alt="profile"
                    width={100}
                    height={100}
                />
            </figure>
            <h1 className="profile__name">{username}</h1>
            <p className="profile__biography">{biography}</p>

            {
                user?.id === id  && (
                    <button className="btn btn--primary profile__btn-edit">
                        Edit
                    </button>
                )
            }
        </div>
    );
}

export default Profile;