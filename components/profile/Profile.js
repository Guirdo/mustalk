import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Profile({ profile }) {
    const { id,username, biography,website} = JSON.parse(profile);
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();

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
                        className="btn btn--primary profile__btn-edit"
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