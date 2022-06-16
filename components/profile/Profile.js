import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Photo from "./Photo";

function Profile({ profile = {} }) {
    const { id,username, biography,website,avatar_url} = profile
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();

    return (
        <div className="profile">
            <Photo
                src={avatar_url}
                className="profile__photo"
                height={120}
                width={120}
            />
            <h1 className="profile__name">{username}</h1>
            <p className="profile__biography">{biography}</p>
            <a
                href={website}
                className="profile__website"
                target="_blank"
                rel="noopener noreferrer"
            >
                {website}
            </a>

            {
                user?.id === id  && (
                    <button 
                        className="btn btn--secondary btn--small profile__btn-edit"
                        onClick={()=> push('/profile/edit')}
                    >
                        Edit
                    </button>
                )
            }
        </div>
    );
}

export default Profile;