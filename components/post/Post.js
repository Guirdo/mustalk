import moment from "moment";
import Image from "next/image";
import LikeBtn from "../utils/LikeBtn";
import SaveBtn from "../utils/SaveBtn";

function Post({ post,username }) {

    const { id,author, description, songlink, created_at } = post

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
                    <span className="nickname">{ username } {' '}</span>
                    <span>{' - '}</span>
                    <span>{moment(created_at).format('MMMM/DD/YY hh:mm')}</span>
                </div>
                <div className="content">
                    <p>
                        {description}
                    </p>
                </div>
                <div className="music-card">
                    <Image 
                        src="https://picsum.photos/300/200"
                        height={200}
                        width={300}
                        alt="music"
                    />
                    <p>{songlink}</p>
                </div>
                <div className="post__actions">
                    <LikeBtn />
                    <SaveBtn />
                </div>
            </div>
        </article>
    );
}

export default Post;