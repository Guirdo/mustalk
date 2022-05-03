import Image from "next/image";
import LikeBtn from "../utils/LikeBtn";
import SaveBtn from "../utils/SaveBtn";

function Post() {
    return (
        <article className="post">
            <div>
                <Image
                    src="/icons/user.png"
                    height={40}
                    width={40}
                    alt="profile"
                />
            </div>
            <div>
                <div>
                    <span className="nickname">Seb Méndez {' '}</span>
                    <span className="username">@seb_mendez</span>
                    <span>{' - '}</span>
                    <span>1h</span>
                </div>
                <div className="content">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam, quidem.
                    </p>
                </div>
                <div className="music-card">
                    <Image 
                        src="https://picsum.photos/300/200"
                        height={200}
                        width={300}
                        alt="music"
                    />
                </div>
                <div className="actions">
                    <LikeBtn />
                    <SaveBtn />
                </div>
            </div>
        </article>
    );
}

export default Post;